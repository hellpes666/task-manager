import { Response, Request } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { TaskPriority } from "../../../models";


export const deleteTaskPriority = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(400).send({ message: "Некорректные данные." });
		} else {
			await TaskPriority.findByIdAndDelete({
				_id: id,
			});

			res.status(200).send({
				message: "Приоритетность задачи успешно удалена.",
			});
		}
	} catch (error) {
		handleError(error, errorPath("deleteTaskPriority.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
