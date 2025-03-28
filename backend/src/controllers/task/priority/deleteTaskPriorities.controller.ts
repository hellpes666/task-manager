import { Response, Request } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { TaskPriority } from "../../../models";

export const deleteTaskPriorities = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		await TaskPriority.deleteMany({});

		res.status(200).send({
			message: "Приоритетности задач успешно удалены.",
		});
		return;
	} catch (error) {
		handleError(error, errorPath("deleteTaskPriorities.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
