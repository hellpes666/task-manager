import { Request, Response } from "express";
import { handleError } from "../../lib";
import { errorPath } from "../errorPath";
import { User } from "../../models";

export const getAllUsers = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const users = await User.find({});
		res.status(200).send({ users });
		return;
	} catch (error) {
		handleError(error, errorPath("users.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
