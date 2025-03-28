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

			//TODO переделать модели: Priority, Status - в последние добавить цвет
			await Task.create({
				title: taskData.title,
				statusId: taskData.statusId,
				startedDate: taskData.startedDate,
				deadline: taskData.deadline,
				priorityId: taskData.priorityId,
				description: taskData.description,
				creatorId: currentUser?._id,
				assignedToEmployes: assignedEmployes,
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
