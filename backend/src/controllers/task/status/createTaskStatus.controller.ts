import { Response, Request } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { TaskStatus } from "../../../models";

type CreateTaskStatusRequestBody = Request<{}, {}, { name: string }>;
export const createTaskStatus = async (
	req: CreateTaskStatusRequestBody,
	res: Response
) => {
	try {
		const { name } = req.body;
		if (!name || name.length <= 2) {
			res.status(400).send({ message: "Некорректные данные." });
		} else {
			await TaskStatus.create({
				name,
			});

			res.status(200).send({ message: "Статус задачи успешно создан." });
		}
	} catch (error) {
		handleError(error, errorPath("createTaskStatus.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
