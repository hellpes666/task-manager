import { Response, Request } from "express";
import { handleError } from "../../lib";
import { errorPath } from "../errorPath";
import { IUser } from "../../models/User.model";

export interface ICustomRequest extends Request {
	user?: IUser;
}

export const checkAuth = (req: ICustomRequest, res: Response) => {
	try {
		res.status(200).json(req.user);
	} catch (error) {
		handleError(error, errorPath("checkAuth.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
