// components/Task/TaskDetails.tsx
import React from 'react';
import { Loader } from 'lucide-react';
import { ITaskDescription } from '../../store/useDrawerStore';

interface TaskDetailsProps {
    data: ITaskDescription | null;
    isLoading: boolean;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({
    data,
    isLoading,
}) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    if (!data) {
        return <div className="p-4 text-center">Нет данных по задаче</div>;
    }

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-xl font-semibold">{data.title}</h2>
            <p>
                <strong>Описание:</strong> {data.description}
            </p>
            <p>
                <strong>Статус:</strong> {data.statusId.name}
            </p>
            <p>
                <strong>Приоритет:</strong>{' '}
                {data.priorityId?.name ?? 'Не указан'}
            </p>
            <p>
                <strong>Создатель:</strong> {data.creatorId.name}{' '}
                {data.creatorId.lastName}
            </p>
            <p>
                <strong>Начало:</strong>{' '}
                {new Date(data.startedDate).toLocaleDateString()}
            </p>
            <p>
                <strong>Срок:</strong>{' '}
                {new Date(data.deadline).toLocaleDateString()}
            </p>
        </div>
    );
};
