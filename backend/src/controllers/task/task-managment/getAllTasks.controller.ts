import { Request, Response } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { Task, TaskStatus } from "../../../models";

export const getAllTasks = async (req: Request, res: Response) => {
	try {
		const tasks = await Task.find({})
			.populate("statusId", "name color")
			.populate("priorityId", "name")
			.populate("creatorId", "name lastName email")
			.populate("assignedToIds", "name lastName")
			.lean();

		const allStatuses = await TaskStatus.find().lean();

		const transformedData = tasks.map((task) => {
			const { statusId, priorityId, creatorId, ...rest } = task;
			return {
				...rest,
				status: statusId,
				priority: priorityId,
				creator: creatorId,
			};
		});

		const groupedData = transformedData.reduce(
			(acc, task) => {
				//@ts-ignore
				const statusName = task.status?.name?.trim() || "Бэклог";
				//@ts-ignore
				const statusColor = task.status?.color ?? "#666666";
				//@ts-ignore
				const statusId = task.status?._id;

				const { status, ...taskWithoutStatus } = task;

				if (!acc[statusName]) {
					acc[statusName] = {
						count: 0,
						tasks: [],
						meta: {
							statusId: statusId?.toString(),
							color: statusColor,
						},
					};
				}

				acc[statusName].count++;
				acc[statusName].tasks.push(taskWithoutStatus);
				return acc;
			},
			{} as Record<
				string,
				{
					count: number;
					tasks: Array<
						Omit<(typeof transformedData)[number], "status">
					>;
					meta: {
						statusId?: string;
						color?: string;
					};
				}
			>
		);

		allStatuses.forEach((status) => {
			const statusName = status.name.trim();
			if (!groupedData[statusName]) {
				groupedData[statusName] = {
					count: 0,
					tasks: [],
					meta: {
						statusId: status._id.toString(),
						color: status.color ?? "#666666",
					},
				};
			}
		});

		const result = Object.entries(groupedData).map(([status, group]) => ({
			status,
			count: group.count,
			tasks: group.tasks,
			meta: group.meta,
		}));

		const dataResult = result.filter((group) => group.status !== "Бэклог");
		const backlogResult = result.find(
			(group) => group.status === "Бэклог"
		) || {
			status: "Бэклог",
			count: 0,
			tasks: [],
			meta: {},
		};

		res.status(200).send({
			message: "Задачи сгруппированы по статусам",
			data: dataResult,
			backlogData: backlogResult,
		});
		return;
	} catch (error) {
		handleError(error, errorPath("getAllTasks.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка при получении задач",
		});
		return;
	}
};
