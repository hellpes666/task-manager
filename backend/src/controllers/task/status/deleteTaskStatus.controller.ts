import { Response, Request } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { TaskStatus } from "../../../models";

type DeleteTaskStatusRequestBody = Request<{ id: string }, {}, {}>;

export const deleteTaskStatus = async (
	req: DeleteTaskStatusRequestBody,
	res: Response
): Promise<void> => {
	try {
		const { id } = req.params;

		if (!id) {
			res.status(400).send({ message: "Некорректные данные." });
			return;
		} else {
			await TaskStatus.findByIdAndDelete({
				_id: id,
			});

			res.status(200).send({
				message: "Приоритетность задачи успешно удалена.",
			});

			return;
		}
	} catch (error) {
		handleError(error, errorPath("deleteTaskStatus.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
