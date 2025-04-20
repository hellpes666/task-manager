import { useDrawerStore } from '../../store/useDrawerStore';
import { Loader } from 'lucide-react';

export const TaskDrawer = () => {
    const { isOpen, taskDescription, isTaskDataLoading } = useDrawerStore();

    if (!isOpen) return null;

    return (
        <div className="text-base-300 fixed top-0 right-0 z-50 h-screen min-w-[50%] bg-white p-5">
            {isTaskDataLoading ? (
                <div className="flex h-full w-full items-center justify-center">
                    <Loader className="animate-spin" size={24} />
                </div>
            ) : (
                <div className="space-y-4 p-4">
                    <h2 className="badge p-5 text-xl font-semibold">
                        {taskDescription?.title}
                    </h2>
                    <p>
                        <strong>Описание:</strong>{' '}
                        {taskDescription?.description}
                    </p>
                    <p>
                        <strong>Приоритет:</strong>{' '}
                        {taskDescription?.priorityId.name ?? 'Не указан'}
                    </p>
                    <p>
                        <strong>Создатель:</strong>{' '}
                        {taskDescription?.creatorId.name +
                            ' ' +
                            taskDescription?.creatorId.lastName}
                    </p>
                    <p>
                        <strong>Начало:</strong>{' '}
                        {taskDescription?.createdAt?.toString().split('T')[0] ??
                            'Не указано'}
                    </p>
                    <p>
                        <strong>Срок:</strong>{' '}
                        {taskDescription?.deadline?.toString().split('T')[0] ??
                            'Не указано'}
                    </p>
                </div>
            )}
        </div>
    );
};
