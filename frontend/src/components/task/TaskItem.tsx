import { Hand } from 'lucide-react';
import React from 'react';
import { ITaskItem } from './Task.model';
import { getRGBA } from '../../lib';

// Открытие бокового меню, для детального просмотра задачи
export const TaskItem: React.FC<ITaskItem> = ({ id, title, priorityColor }) => {
    const backgroundColor = priorityColor
        ? getRGBA(priorityColor, 0.3)
        : 'rgba(0, 0, 0, 0.3)';

    return (
        <div
            className="bg-base-content mx-auto flex max-w-45 min-w-45 flex-col items-start gap-1 rounded-2xl p-2"
            id={id}
        >
            <div className="flex w-full items-center gap-2">
                <div
                    className="size-6 rounded-full border-2 border-dashed"
                    style={{
                        borderColor: priorityColor || '#0a0a0a',
                        backgroundColor: backgroundColor,
                    }}
                />
                <h3 className="text-accent-content max-w-[120px] truncate font-bold">
                    {title}
                </h3>
                {/* <Grab /> */}
            </div>
            <div className="w-full rounded-full border-[1px] border-[#666]/20" />
            <Hand color="#666" size={18} className="mx-auto" />
        </div>
    );
};
