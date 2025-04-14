export interface ITask {
	_id:  string
    title: string;
    statusId: string;
    startedDate: Date;
    deadline: Date;
    priorityId: string;
    description: string;
    creatorId: string;
    assignedToIds: Array<string>; // user
}

export interface ITaskPriority {
	_id: string
    name: string;
    color: string;
}

export interface ITaskStatus {
	_id: string
    name: string;
    color: string;
}
