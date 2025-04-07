import React from 'react';
import { Title } from '../../ui';

export interface ITasksGroup {
    groupName: string;
    borderColor: string;
}

export const TasksGroup: React.FC<ITasksGroup> = ({
    groupName,
    borderColor,
}) => {
    return (
        <div
            className="bg-base-content h-[90%] min-w-100 rounded-2xl border-4 px-6 py-3"
            style={{ borderColor: borderColor || 'var(--accent-color)' }}
        >
            <Title
                title={groupName ?? 'Задачи'}
                reveal={false}
                className="text-base-300 font-medium"
            />
            <div className="mt-1 w-full rounded-full border-[1px] border-[#666]/20" />
        </div>
    );
};
