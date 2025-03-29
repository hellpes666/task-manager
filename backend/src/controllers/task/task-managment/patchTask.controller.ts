import { Request, Response } from "express";
import { handleError } from "../../../lib";
import { errorPath } from "../../errorPath";
import { ICustomRequest } from "../../auth/checkAuth.controller";
import { CreateTaskRequestBody } from "./createTask.controller";

type RequiredUserData = Required<ICustomRequest>;

type PatchTaskRequest = RequiredUserData &
	Request<{ id: string }, {}, Partial<CreateTaskRequestBody>>;

export const patchTask = (req: PatchTaskRequest, res: Response) => {
	try {
		const { id: taskId } = req.params;
		const { _id: currentEditor } = req.user;
		const {c} = req.body

		if (editData.crea)

	} catch (error) {
		handleError(error, errorPath("patchTask.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибика сервера. Попробуйте снова.",
		});
	}
};
