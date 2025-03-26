import { Request, Response } from "express";
import { handleError } from "../../lib";
import { errorPath } from "../errorPath";

export const logout = async (req: Request, res: Response) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({
			message: "Вы успешно вышли из акаунта. Будем ждать вас снова!",
		});
	} catch (error) {
		handleError(error, errorPath("logout.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
