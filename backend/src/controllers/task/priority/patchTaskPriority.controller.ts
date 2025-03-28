import { Response, Request } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { TaskPriority } from "../../../models";

type PatchTaskPriorityRequestBody = Request<
	{ id: string },
	{},
	{ name?: string; color?: string }
>;
export const patchTaskPriority = async (
	req: PatchTaskPriorityRequestBody,
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

		const updatedTaskPriority = await TaskPriority.findByIdAndUpdate(
			id,
			{
				...(name && { name }),
				...(color && { color }),
			},
			{ new: true }
		);

		if (!updatedTaskPriority) {
			res.status(404).send({
				message: "Приоритетность задачи не найдена.",
			});
			return;
		}

		res.status(200).send({
			message: "Приоритетность задачи успешно изменена.",
			data: updatedTaskPriority,
		});
	} catch (error) {
		handleError(error, errorPath("patchTaskPriority.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
