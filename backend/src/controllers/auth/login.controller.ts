import bcrypt from "bcryptjs";
import { Response, Request } from "express";
import { generateJWToken, handleError } from "../../lib";
import { errorPath } from "../errorPath";
import { User } from "../../models";

type LoginRequestBody = { email: string; password: string };
export const login = async (
	req: Request<{}, {}, LoginRequestBody>,
	res: Response
) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({
			email: email,
		});
		if (!user) {
			res.status(401).json({ message: "Пользователь не найден." });
		} else {
			const PasswordFromUserIsEqualToDb = await bcrypt.compare(
				password,
				user.password
			);
			if (!PasswordFromUserIsEqualToDb) {
				res.status(401).json({ message: "Неверные учетные данные." });
			} else {
				generateJWToken(user._id.toString(), res);

				res.status(200).json({
					message: "Авторизация успешна!",
					_id: user._id,
					firstName: user.name,
					lastName: user.lastName,
					email: user.email,
				});
			}
		}
	} catch (error) {
		handleError(error, errorPath("login.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};
