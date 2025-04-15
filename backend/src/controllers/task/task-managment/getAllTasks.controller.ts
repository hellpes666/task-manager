import { Request, Response } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { Task } from "../../../models";

export const getAllTasks = async (req: Request, res: Response) => {
	try {
		const data = await Task.find({})
			.populate("statusId", "name color")
			.populate("priorityId", "name")
			.populate("creatorId", "name lastName email")
			.lean();

		const transformedData = data.map((task) => {
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
				const { status, ...taskWithoutStatus } = task;

				if (!acc[statusName]) {
					acc[statusName] = {
						count: 0,
						tasks: [],
						meta: {
							//@ts-ignore
							statusId: task.status?._id,
							//@ts-ignore
							color: task.status?.color,
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
	} catch (error) {
		handleError(error, errorPath("getAllTasks.controller.ts"));
	}
};
