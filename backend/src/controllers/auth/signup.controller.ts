import { z } from "zod";
import { Request, Response } from "express";
import { generateJWToken, handleError } from "../../lib";
import { errorPath } from "../errorPath";
import { User } from "../../models";
import bcrypt from "bcryptjs";

export const signup = async (req: Request, res: Response): Promise<void> => {
	try {
		const { name, lastName, email, password } = SignupRequestBody.parse(
			req.body
		);

		const user = await User.exists({
			email: email,
		});

		if (user) {
			res.status(400).json({
				message: "Пользователь уже зарегистрирован.",
			});
			return;
		}

		const salt = await bcrypt.genSalt(15);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await User.create({
			name,
			lastName,
			email,
			password: hashedPassword,
		});

		generateJWToken(newUser._id.toString(), res);

		res.status(201).send({
			message: "Пользователь успешно создан",
			name,
			lastName,
			email,
		});
		return;
	} catch (error) {
		handleError(error, errorPath("signup.controller.ts"));
		res.status(500).json({
			message: "Произошла ошибка. Попробуйте снова",
		});
	}
};

const SignupRequestBody = z.object({
	name: z
		.string()
		.min(2, "Минимальная длина имени 2 символа")
		.max(256, "Максимальная длина имени 256 символов"),
	lastName: z
		.string()
		.min(2, "Минимальная длина фамилии 2 символа")
		.max(256, "Максимальная длина фамилии 256 символов"),
	email: z.string().email("Некорректно введён email"),
	password: z
		.string()
		.min(8, "Пароль должен содержать не менее 8 символов.")
		.regex(
			/^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
			"Пароль должен содержать минимум одну строчную и одну заглавную букву, одну цифру и один специальный символ."
		),
});
