import React from 'react';
import { Title } from '../../ui';
import { TaskItem } from './TaskItem';
import { ITaskItem } from './Task.model';

export interface ITasksGroup {
    groupName: string;
    tasks: ITaskItem[];
    borderColor: string;
}

export const TasksGroup: React.FC<ITasksGroup> = ({
    groupName,
    tasks,
    borderColor,
}) => {
    return (
        <div
            className="bg-base-content h-[90%] max-h-[90%] min-w-100 rounded-2xl border-4 px-2 py-3"
            style={{ borderColor: borderColor || 'var(--accent-color)' }}
        >
            <Title
                title={groupName ?? 'Задачи'}
                reveal={false}
                className="text-base-300 font-medium"
            />
            <div className="mt-1 w-full rounded-full border-[1px] border-[#666]/20" />
            <div className="mt-5 flex max-h-[90%] flex-wrap items-center justify-center overflow-y-auto">
                {tasks.map((props) => (
                    <TaskItem {...props} />
                ))}
            </div>
        </div>
    );
};
