import express, { Router } from "express";
import { protectAccess } from "../middlewares/protectAccess.middleware";
import {
	createTaskPriority,
	deleteTaskPriority,
	getAllTaskPriorities,
} from "../controllers/task/priority";

export const taskRouter: Router = express.Router();
const taskPrioritiesEndPoint = "/task-priorities";

taskRouter.get(taskPrioritiesEndPoint, protectAccess, getAllTaskPriorities);

taskRouter.post(taskPrioritiesEndPoint, protectAccess, createTaskPriority);

taskRouter.delete(
	taskPrioritiesEndPoint + "/:id",
	protectAccess,
	deleteTaskPriority
);
