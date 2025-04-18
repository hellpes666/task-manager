export interface IUser {
    _id: string;
    name: string;
    lastName: string;
    email: string;
}

export interface ITask {
    _id: string;
    title: string;
    status: { _id: string; name: string };
    startedDate: Date;
    deadline: Date;
    priority: { _id: string; name: string };
    description: string;
    creator: IUser;
    assignedToIds: Array<IUser>;
}

export type Task = Omit<ITask, 'status'>;

export interface ITasksData {
    status: string;
    count: number;
    tasks: Array<Task>;
    meta: { statusId: string; color: string };
}

export interface ITasksResponse {
    message: string;
    data: {
        data: Array<ITasksData>;
        backlogData: ITasksData;
    };
}

export interface ITaskPriority {
    _id: string;
    name: string;
}

export interface ITaskStatus {
    _id: string;
    name: string;
    color: string;
}
