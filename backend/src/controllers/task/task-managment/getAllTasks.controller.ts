import { Request, Response } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { Task } from "../../../models";

export const getAllTasks = async (req: Request, res: Response) => {
	try {
		const data = await Task.find({});

		res.status(200).send({
			message: "Все текущие задачи",
			data,
		});
	} catch (error) {
		handleError(error, errorPath("getAllTasks.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
