import { Response, Request } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { TaskStatus } from "../../../models";

type PatchTaskStatusRequestBody = Request<
	{ id: string },
	{},
	{ name?: string; color?: string }
>;
export const patchTaskStatus = async (
	req: PatchTaskStatusRequestBody,
	res: Response
): Promise<void> => {
	try {
		const { id } = req.params;
		const { name, color } = req.body;

		if (!id) {
			res.status(400).send({ message: "Не передан id статуса." });
			return;
		}

		if (color && !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/i.test(color)) {
			res.status(400).send({ message: "Некорректный формат цвета." });
			return;
		}

		const updatedTaskStatus = await TaskStatus.findByIdAndUpdate(
			id,
			{
				...(name && { name }),
				...(color && { color }),
			},
			{ new: true }
		);

		if (!updatedTaskStatus) {
			res.status(404).send({ message: "Статус задачи не найден." });
			return;
		}

		res.status(200).send({
			message: "Статус задачи успешно изменён.",
			data: updatedTaskStatus,
		});
	} catch (error) {
		handleError(error, errorPath("patchTaskStatus.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
