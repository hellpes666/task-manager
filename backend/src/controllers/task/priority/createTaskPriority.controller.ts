import { Response, Request } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { TaskPriority } from "../../../models";

type CreateTaskPriorityRequestBody = Request<{}, {}, { name: string }>;
export const createTaskPriority = async (
	req: CreateTaskPriorityRequestBody,
	res: Response
): Promise<void> => {
	try {
		const { name } = req.body;
		if (!name || name.length <= 2) {
			res.status(400).send({ message: "Некорректные данные." });
			return;
		} else {
			await TaskPriority.create({
				name,
			});

			res.status(200).send({
				message: "Приоритетность задачи успешно создан.",
			});
			return;
		}
	} catch (error) {
		handleError(error, errorPath("createTaskPriority.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
