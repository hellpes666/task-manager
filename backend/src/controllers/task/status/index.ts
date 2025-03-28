import { createTaskStatus } from "./createTaskStatus.controller";
import { deleteTaskStatuses } from "./deleteAllStatuses.controller";
import { deleteTaskStatus } from "./deleteTaskStatus.controller";
import { getAllTaskStatuses } from "./getAllTaskStatuses.controller";
import { patchTaskStatus } from "./patchTaskStatus.controller";

export {
	getAllTaskStatuses,
	createTaskStatus,
	patchTaskStatus,
	deleteTaskStatus,
	deleteTaskStatuses,
};
