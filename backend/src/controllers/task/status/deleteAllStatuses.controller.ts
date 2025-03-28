import { Response, Request } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { TaskStatus } from "../../../models";

export const deleteTaskStatuses = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		await TaskStatus.deleteMany();

		res.status(200).send({
			message: "Приоритетности задачи успешно удалены.",
		});

		return;
	} catch (error) {
		handleError(error, errorPath("deleteTaskStatuses.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
