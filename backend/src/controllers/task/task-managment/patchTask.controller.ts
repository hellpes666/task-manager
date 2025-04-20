import { Request, Response } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { ICustomRequest } from "../../auth/checkAuth.controller";
import { CreateTaskRequestBody } from "./createTask.controller";
import mongoose from "mongoose";
import { Task } from "../../../models";

type RequiredUserData = Required<ICustomRequest>;

export const patchTask = async (req: Request, res: Response) => {
	try {
		const { id: taskId } = req.params;
		const updateData = req.body;

		if (!mongoose.Types.ObjectId.isValid(taskId)) {
			res.status(400).json({ message: "Некорректный ID задачи" });
			return;
		}

		const task = await Task.findById(taskId);

		if (!task) {
			res.status(404).json({ message: "Задача не найдена" });
			return;
		}

		if (updateData.title !== undefined) task.title = updateData.title;
		if (updateData.description !== undefined)
			task.description = updateData.description;
		if (updateData.deadline !== undefined)
			task.deadline = updateData.deadline;
		if (updateData.priorityId !== undefined)
			task.priorityId = updateData.priorityId;
		if (updateData.statusId !== undefined)
			task.statusId = updateData.statusId;
		if (updateData.assignedToIds !== undefined)
			task.assignedToIds = updateData.assignedToIds;

		await task.save();

		res.status(200).json({
			message: "Задача успешно обновлена",
			data: task,
		});
	} catch (error) {
		handleError(error, errorPath("patchTask.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка сервера. Попробуйте снова.",
		});
	}
};
