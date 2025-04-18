import { Response } from "express";
import mongoose from "mongoose";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { Task, TaskPriority, TaskStatus, User } from "../../../models";
import { ICustomRequest } from "../../auth/checkAuth.controller";

export type CreateTaskRequestBody = {
	title: string;
	statusId?: string; // optional
	startedDate?: Date;
	deadline?: Date;
	priorityId?: string; // optional
	description?: string;
	creatorId: string;
	assignedToIds: Array<string>;
	daysLeft?: string;
};

export const createTask = async (req: ICustomRequest, res: Response) => {
	try {
		const taskData: CreateTaskRequestBody = req.body;
		const currentUser = req.user;

		if (!taskData?.title) {
			res.status(400).send({
				message: "Название задачи обязательно.",
			});
		}

		if (
			taskData.statusId &&
			!mongoose.Types.ObjectId.isValid(taskData.statusId)
		) {
			res.status(400).json({ message: "Невалидный ID статуса." });
		}

		if (
			taskData.priorityId &&
			!mongoose.Types.ObjectId.isValid(taskData.priorityId)
		) {
			res.status(400).json({ message: "Невалидный ID приоритета." });
		}

		if (
			taskData.assignedToIds &&
			(!Array.isArray(taskData.assignedToIds) ||
				!taskData.assignedToIds.every((id) =>
					mongoose.Types.ObjectId.isValid(id)
				))
		) {
			res.status(400).json({
				message: "Список назначенных пользователей невалиден.",
			});
			return;
		}

		if (taskData.startedDate && taskData.deadline) {
			const started = new Date(taskData.startedDate);
			const deadline = new Date(taskData.deadline);
			if (started > deadline) {
				res.status(400).json({
					message:
						"Дата начала не может быть позже срока выполнения.",
				});
			}
		}

		let currentPriority = null;
		if (taskData.priorityId) {
			currentPriority = await TaskPriority.findById(taskData.priorityId);
			if (!currentPriority) {
				res.status(400).json({ message: "Приоритет не найден." });
			}
		}

		const newTask = await Task.create({
			title: taskData.title,
			statusId: taskData.statusId,
			startedDate: taskData.startedDate,
			deadline: taskData.deadline,
			priorityId: taskData.priorityId,
			description: taskData.description,
			creatorId: currentUser?._id,
			assignedToIds: taskData.assignedToIds,
		});

		const status =
			(await TaskStatus.findById(newTask.statusId))?.name || "Бэклог";

		res.status(200).send({
			message: "Задача успешно создана.",
			data: {
				title: newTask.title,
				status,
				startedDate: newTask.startedDate,
				deadline: newTask.deadline,
				priority: currentPriority?.name || null,
				description: newTask.description,
				creator: `${currentUser?.name} ${currentUser?.lastName}`,
				assignedToIds: newTask.assignedToIds,
			},
		});
	} catch (error) {
		handleError(error, errorPath("createTask.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова.",
		});
	} finally {
		return;
	}
};
