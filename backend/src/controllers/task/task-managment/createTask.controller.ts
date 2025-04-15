import { Response } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { Task, TaskPriority, TaskStatus, User } from "../../../models";
import { ICustomRequest } from "../../auth/checkAuth.controller";

export type CreateTaskRequestBody = {
	title: string;
	statusId: string;
	startedDate: Date;
	deadline: Date;
	priorityId: string;
	description: string;
	creatorId: string;
	// assignedToIds: Array<string>;
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

			// const invalidUsers = (
			// 	await Promise.all(
			// 		taskData.assignedToIds.map((id) => User.exists({ _id: id }))
			// 	)
			// ).some((exists) => !exists);

			// if (invalidUsers) {
			// 	res.status(400).json({
			// 		message:
			// 			"Один или несколько назначенных пользователей не найдены",
			// 	});
			// 	return;
			// }

			// const assignedEmployes = await Promise.all(
			// 	taskData.assignedToIds.map(async (userId) => {
			// 		const user = await User.findById(userId);
			// 		return user
			// 			? `${user.name} ${user.lastName}`
			// 			: "Неизвестный пользователь";
			// 	})
			// );

			await Task.create({
				title: taskData.title,
				statusId: taskData.statusId,
				startedDate: taskData.startedDate,
				deadline: taskData.deadline,
				priorityId: taskData.priorityId,
				description: taskData.description,
				creatorId: currentUser?._id,
				// assignedToEmployes: taskData.assignedToIds,
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
					// assignedToIds: taskData.assignedToIds,
					// assignedEmployes,
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
