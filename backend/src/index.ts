import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./lib";
import { authRouter } from "./routes/auth.route";
import cookieParser from "cookie-parser";
import { taskRouter } from "./routes/task.route";
import cors from "cors";
dotenv.config();

const app = express();
// const server = createServer(app);
// const io = new Server(server);

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

app.listen(PORT, () => {
	console.log(`server running at http://localhost:${PORT}`);
	connectDb();
});
