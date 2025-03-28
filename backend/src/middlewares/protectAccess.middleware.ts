import { NextFunction, Request, Response } from "express";
import { handleError } from "../lib";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models";
import { ICustomRequest } from "../controllers/auth/checkAuth.controller";

export const protectAccess = async (
	req: ICustomRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			res.status(401).json({
				message: "Вы не авторизованы. No Token Provided.",
			});
			return;
		} else {
			const decoded = jwt.verify(
				token,
				process.env.JWT_SECRET
			) as JwtPayload & { userId: string };

			if (!decoded || !decoded.userId) {
				res.status(401).json({
					message: "Unauthorized - Invalid Token",
				});
				return;
			}

			const user = await User.findById(decoded.userId).select(
				"-password"
			);

			if (!user) {
				res.status(401).json({ message: "Пользователь не найден" });
				return;
			}

			//@ts-ignore
			req.user = user;
			next();
		}
	} catch (error) {
		handleError(error, "/middlewares/protectAccess.middleware.ts");
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
