import { Response, Request } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { Task, TaskPriority, TaskStatus, User } from "../../../models";
import { ICustomRequest } from "../../auth/checkAuth.controller";

type CreateTaskRequestBody = {
	title: string;
	statusId: string;
	startedDate: Date;
	deadline: Date;
	priorityId: string;
	description: string;
	creatorId: string;
	assignedToIds: Array<string>;
	daysLeft: string;
};
export const createTask = async (req: ICustomRequest, res: Response) => {
	try {
		const taskData: CreateTaskRequestBody = req.body;
		const currentUser = req.user;
		if (!taskData) {
			res.status(400).send({
				message: "Введены не все данные или Данные некорректны.",
			});
		} else {
			const currentStatus = await TaskStatus.findById({
				_id: taskData.statusId,
			});

			const currentPriority = await TaskPriority.findById({
				_id: taskData.priorityId,
			});

			let assignedEmployes: string[] = [];

			for (let userId of taskData.assignedToIds) {
				const assignedUser = await User.findById({
					_id: userId,
				});

				assignedEmployes.push(
					assignedUser!.name + " " + assignedUser!.lastName
				);
			}

			const deadline = new Date(taskData.deadline);
			const startedDate = new Date(taskData.startedDate);
			const millisecondsInADay = 1000 * 60 * 60 * 24;
			const currentDay = new Date(Date.now());

			console.log(deadline, startedDate, currentDay);

			//@ts-ignore
			const diffTimeToDeadline = Math.abs(deadline - currentDay);
			const diffDaysToDeadline = Math.floor(
				diffTimeToDeadline / millisecondsInADay
			);

			//@ts-ignore
			const diffTimeFromStart = Math.abs(currentDay - startedDate);
			const diffDaysFromStart = Math.floor(
				diffTimeFromStart / millisecondsInADay
			);

			console.log(`Дней до дедлайна: ${diffDaysToDeadline}`);
			console.log(`Дней с начала задачи: ${diffDaysFromStart}`);

			//TODO переделать модели: Task, Priority, Status - в последние добавить цвет
			await Task.create({
				title: taskData.title,
				status: currentStatus,
				startedDate: taskData.startedDate,
				deadline: taskData.deadline,
				priority: currentPriority,
				description: taskData.description,
				creator: currentUser?.name + " " + currentUser?.lastName,
				assignedToEmployes: assignedEmployes,
				daysLeftToDeadline: diffDaysToDeadline,
				daysSpentFromStart: diffDaysFromStart,
			});

			res.status(200).send({
				message: "Создана задача",
				data: {
					title: taskData.title,
					status: currentStatus,
					startedDate: taskData.startedDate,
					deadline: taskData.deadline,
					priority: currentPriority,
					description: taskData.description,
					creator: currentUser?.name + " " + currentUser?.lastName,
					assignedToEmployes: assignedEmployes,
					daysLeftToDeadline: diffDaysToDeadline,
					daysSpentFromStart: diffDaysFromStart,
				},
			});
		}
	} catch (error) {
		handleError(error, errorPath("createTask.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
