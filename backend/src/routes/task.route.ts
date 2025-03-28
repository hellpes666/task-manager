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
	deleteTaskStatuses,
	getAllTaskStatuses,
	patchTaskStatus,
} from "../controllers/task/status";
import {
	TASK_PRIORITIES_END_POINT,
	TASK_STATUSES_END_POINT,
	TASK_MANAGMENT_END_POINT,
} from "./constants";
import { createTask, getAllTasks } from "../controllers/task/task-managment";

export const taskRouter: Router = express.Router();

taskRouter.get(TASK_PRIORITIES_END_POINT, protectAccess, getAllTaskPriorities);
taskRouter.post(TASK_PRIORITIES_END_POINT, protectAccess, createTaskPriority);
taskRouter.delete(
	TASK_PRIORITIES_END_POINT + "/:id",
	protectAccess,
	deleteTaskPriority
);

taskRouter.get(TASK_STATUSES_END_POINT, protectAccess, getAllTaskStatuses);
taskRouter.post(TASK_STATUSES_END_POINT, protectAccess, createTaskStatus);
taskRouter.patch(
	TASK_STATUSES_END_POINT + "/:id",
	protectAccess,
	patchTaskStatus
);
taskRouter.delete(
	TASK_STATUSES_END_POINT + "/:id",
	protectAccess,
	deleteTaskStatus
);
taskRouter.delete(TASK_STATUSES_END_POINT, protectAccess, deleteTaskStatuses);

taskRouter.post(TASK_MANAGMENT_END_POINT, protectAccess, createTask);
taskRouter.get(TASK_MANAGMENT_END_POINT, protectAccess, getAllTasks);
