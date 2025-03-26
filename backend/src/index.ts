import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./lib";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
	res.status(202).send({ message: "great " });
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
	connectDb();
});
