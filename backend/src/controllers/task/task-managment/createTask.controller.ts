import { Response, Request } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";

export const createTask = (req: Request, res: Response) => {
	try {
		


	} catch (error) {
		handleError(error, errorPath("createTask.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
