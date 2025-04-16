import { Response, Request } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { TaskStatus } from "../../../models";

type CreateTaskStatusRequestBody = Request<
	{},
	{},
	{ name: string; color?: string }
>;
export const createTaskStatus = async (
	req: CreateTaskStatusRequestBody,
	res: Response
): Promise<void> => {
	try {
		const { name, color } = req.body;

		if (!name || name.length <= 2) {
			res.status(400).send({ message: "Некорректные данные." });
			return;
		} else {
			await TaskStatus.create({
				name,
				color,
			});

			res.status(200).send({
				message: "Статус задачи успешно создан.",
				data: {
					name,
					color,
				},
			});
			return;
		}
	} catch (error: any) {
		if (error.code === 11000 && error.keyPattern?.name) {
			res.status(422).json({
				message: "Статус с таким названием уже существует.",
			});
			return;
		}
		handleError(error, errorPath("createTaskStatus.controller.ts"));

		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
