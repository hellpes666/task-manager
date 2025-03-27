import { Response, Request } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { TaskPriority } from "../../../models";

export const getAllTaskPriorities = async (
	req: Request,
	res: Response
) => {
	try {
		const priorities = await TaskPriority.find({});

		res.status(200).send({ data: priorities });
	} catch (error) {
		handleError(error, errorPath("getAllTaskPriorities.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
