import { useEffect } from 'react';
import { BacklogUI, TaskUI } from '../components';
import { TaskForm, PriorityForm, StatusForm } from '../components/modals';

import { useOpenModal } from '../hooks';
import { useTaskStore } from '../store/useTaskStore';
import { Title } from '../ui';
import { Loader } from 'lucide-react';

export const TaskManagmentPage = () => {
    const { isOpenModal: isOpenTaskModel, toggleModal: toggleTaskModel } =
        useOpenModal();
    const {
        isOpenModal: isOpenPriorityModel,
        toggleModal: togglePriorityModel,
    } = useOpenModal();
    const { isOpenModal: isOpenStatusModel, toggleModal: toggleStatusModel } =
        useOpenModal();

    const { getAllTasks, isLoadingAllTasks } = useTaskStore();

    useEffect(() => {
        getAllTasks();
    }, [getAllTasks]);

    if (isLoadingAllTasks) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex h-full w-full flex-col overflow-y-hidden">
            <div className="flex w-full items-center justify-between">
                <Title
                    title="Tasks"
                    reveal={false}
                    className="text-accent font-bold uppercase"
                />
                <div className="flex items-center gap-5">
                    <button
                        className="btn btn-accent"
                        onClick={toggleStatusModel}
                    >
                        Add new Status
                    </button>
                    <button
                        className="btn btn-accent"
                        onClick={togglePriorityModel}
                    >
                        Add new Priority
                    </button>
                    <button
                        className="btn btn-accent"
                        onClick={toggleTaskModel}
                    >
                        Add new Task
                    </button>
                </div>
            </div>

            <div className="flex-1">
                <TaskUI.TasksSection />
            </div>
            <BacklogUI.Backlog />

            {isOpenTaskModel && <TaskForm toggleModal={toggleTaskModel} />}
            {isOpenPriorityModel && (
                <PriorityForm toggleModal={togglePriorityModel} />
            )}
            {isOpenStatusModel && (
                <StatusForm toggleModal={toggleStatusModel} />
            )}
        </div>
    );
};
