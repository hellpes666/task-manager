import { Response } from "express";
import { handleError } from "./handleError";
import jwt from "jsonwebtoken";

export const generateJWToken = (userId: string, res: Response) => {
	const JWT_SECRET = process.env.JWT_SECRET;

	if (!JWT_SECRET) {
		handleError("Отсутсвует JWT_SECRET в .env", "/lib/generateJWToken.ts");
	}

	const token = jwt.sign({ userId }, JWT_SECRET, {
		expiresIn: "1d",
	});

	res.cookie("jwt", token, {
		maxAge: 24 * 60 * 60 * 1000, // 24h
		httpOnly: true,
		sameSite: "strict",
	});
	console.log(token);

	return token;
};
