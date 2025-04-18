import { Request, Response } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { Task } from "../../../models";

export const getTask = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const task = await Task.findById({ _id: id })
			.populate("statusId", "name color")
			.populate("priorityId", "name")
			.populate("creatorId", "name lastName email")
			.lean();

		if (task === null) {
			throw new Error("Такой задачи нет");
		}

		res.status(200).send({
			message: "Задача успешно получена",
			data: task,
		});
	} catch (error) {
		handleError(error, errorPath("getTask.controller.ts"));
	}
};
