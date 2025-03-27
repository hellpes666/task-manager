import { Response, Request } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { TaskStatus } from "../../../models";

export const getAllTaskStatuses = async (req: Request, res: Response) => {
	try {
		const statuses = await TaskStatus.find({});

		res.status(200).send({ data: statuses });
	} catch (error) {
		handleError(error, errorPath("getAllTaskStatuses.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
