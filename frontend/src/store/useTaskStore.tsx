import { create } from 'zustand';
import {
    ITask,
    ITaskPriority,
    ITasksData,
    ITasksResponse,
    ITaskStatus,
} from '../entity/Task.entity';
import { axiosInstance, catchBlock } from '../lib';

const TASK_BASE_URL = '/tasks';
const TASK_PRIORITIES = TASK_BASE_URL + '/task-priorities';
const TASK_STATUSES = TASK_BASE_URL + '/task-statuses';

interface ITaskState {
    activeTasks: ITasksData[] | null;
    backlog: ITasksData | null;

    statuses: Array<ITaskStatus> | null;
    priorities: Array<ITaskPriority> | null;

    isLoadingAllTasks: boolean;
    isCreatingNewTask: boolean;

    isLoadingAllStatuses: boolean;
    isCreatingNewStatus: boolean;

    isLoadingAllPriorities: boolean;
    isCreatingNewPriority: boolean;

    getAllTasks: () => void;
    createNewTask: (data: ITask) => void;
    deleteTask: (taskId: Pick<ITask, '_id'>) => void;

    getAllStatuses: () => void;
    createNewStatus: (data: ITaskStatus) => void;
    deleteStatus: (statusId: Pick<ITaskStatus, '_id'>) => void;

    getAllPriorities: () => void;
    createNewPriority: (data: ITaskPriority) => void;
    deletePriority: (priorityId: Pick<ITaskPriority, '_id'>) => void;
}

export const useTaskStore = create<ITaskState>((set) => ({
    statuses: null,
    priorities: null,
    activeTasks: null,
    backlog: null,
    isLoadingAllTasks: false,
    isCreatingNewTask: false,

    isLoadingAllStatuses: false,
    isCreatingNewStatus: false,

    isLoadingAllPriorities: false,
    isCreatingNewPriority: false,

    getAllTasks: async () => {
        set({ isLoadingAllTasks: true });

        try {
            const res: ITasksResponse = await axiosInstance.get(TASK_BASE_URL);
            set({ activeTasks: res.data.data, backlog: res.data.backlogData });
        } catch (error) {
            catchBlock(error, 'getAllTasks');
        } finally {
            set({ isLoadingAllTasks: false });
        }
    },
    createNewTask: (data) => {},
    deleteTask: (statusId) => {},

    getAllStatuses: async () => {
        set({ isLoadingAllStatuses: true });

        try {
            const res: { data: { data: Array<ITaskStatus> } } =
                await axiosInstance.get(TASK_STATUSES);
            set({ statuses: res.data.data });
            console.log(res.data);
        } catch (error) {
            catchBlock(error, 'getAllStatuses');
        } finally {
            set({ isLoadingAllStatuses: false });
        }
    },
    createNewStatus: (data) => {},
    deleteStatus: (statusId) => {},

    getAllPriorities: async () => {
        set({ isLoadingAllPriorities: true });

        try {
            const res: { data: { data: Array<ITaskPriority> } } =
                await axiosInstance.get(TASK_PRIORITIES);
            set({ priorities: res.data.data });
        } catch (error) {
            catchBlock(error, 'getAllStatuses');
        } finally {
            set({ isLoadingAllPriorities: false });
        }
    },
    createNewPriority: (data) => {},
    deletePriority: (priorityId) => {},
}));
