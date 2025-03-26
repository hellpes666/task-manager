import mongoose from "mongoose";
import { handleError } from "./handleError";

export const connectDb = async () => {
	const MONGODB_URI = process.env.MONGODB_URI;

	if (!MONGODB_URI) {
		handleError("Отсутсвует MONGODB_URI в .env", "/lib/connectDb");
	}

	try {
		const conn = await mongoose.connect(MONGODB_URI);
		console.log("Подключение к БД успеншо: ", conn.connection.host);
	} catch (error) {
		handleError(error, "/lib/connectDb");
	}
};
