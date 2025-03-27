import express, { Router } from "express";
import { protectAccess } from "../middlewares/protectAccess.middleware";
import {
	createTaskPriority,
	deleteTaskPriority,
	getAllTaskPriorities,
} from "../controllers/task/priority";
import {
	createTaskStatus,
	deleteTaskStatus,
	getAllTaskStatuses,
} from "../controllers/task/status";

export const taskRouter: Router = express.Router();
const TASK_PRIORITIES_END_POINT = "/task-priorities";
const TASK_STATUSES_END_POINT = "/task-statuses";

taskRouter.get(TASK_PRIORITIES_END_POINT, protectAccess, getAllTaskPriorities);

taskRouter.post(TASK_PRIORITIES_END_POINT, protectAccess, createTaskPriority);

taskRouter.delete(
	TASK_PRIORITIES_END_POINT + "/:id",
	protectAccess,
	deleteTaskPriority
);

taskRouter.get(TASK_STATUSES_END_POINT, protectAccess, getAllTaskStatuses);

taskRouter.post(TASK_STATUSES_END_POINT, protectAccess, createTaskStatus);

taskRouter.delete(
	TASK_STATUSES_END_POINT + "/:id",
	protectAccess,
	deleteTaskStatus
);
