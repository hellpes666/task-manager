import { create } from 'zustand';
import { axiosInstance, catchBlock } from '../lib';
import { ITaskPriority, ITaskStatus, IUser } from '../entity/Task.entity';

export interface ITaskDescription {
    _id: string;
    title: string;
    statusId: ITaskStatus;
    startedDate: Date;
    deadline: Date;
    priorityId: ITaskPriority;
    description: string;
    creatorId: IUser;
    assignedToIds: IUser[];
    createdAt: Date;
}

interface IDrawerState {
    isOpen: boolean;
    taskDescription: ITaskDescription | null;
    isTaskDataLoading: boolean;

    openDrawer: (taskId: string) => void;
    closeDrawer: () => void;
}

export const useDrawerStore = create<IDrawerState>((set, get) => ({
    isOpen: false,
    taskDescription: null,
    isTaskDataLoading: false,

    openDrawer: async (taskId) => {
        set({ isOpen: true, isTaskDataLoading: true });

        try {
            const res: { data: { data: ITaskDescription } } =
                await axiosInstance.get(`/tasks/${taskId}`);
            set({ taskDescription: res.data.data });
        } catch (error) {
            catchBlock(error, 'openDrawer.ts');
        } finally {
            set({ isTaskDataLoading: false });
        }
    },

    closeDrawer: () => {
        set({
            isOpen: false,
            taskDescription: null,
        });
    },
}));
