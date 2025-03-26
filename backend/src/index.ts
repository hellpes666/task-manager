import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./lib";
import { authRouter } from "./routes/auth.route";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
	connectDb();
});
