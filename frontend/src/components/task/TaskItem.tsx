import React from 'react';

// import { getRGBA } from '../../lib';
import { Task } from '../../entity/Task.entity';

// Открытие бокового меню, для детального просмотра задачи
export const TaskItem: React.FC<Task> = (props) => {
    // const backgroundColor = priorityColor
    //     ? getRGBA(priorityColor, 0.3)
    //     : 'rgba(0, 0, 0, 0.3)';

    return (
        <div
            className="bg-base-100 mx-auto flex max-w-40 min-w-40 cursor-grab items-center gap-1 rounded-2xl p-3"
            draggable
        >
            <div className="flex w-full items-center gap-2">
                <div
                    className="size-6 rounded-full border-2 border-dashed"
                    style={{
                        // borderColor: priorityColor || '#0a0a0a',
                        borderColor: '#0a0a0a',
                    }}
                />
                <h3 className="text-primary-content max-w-[80px] truncate font-bold">
                    {props.title}
                </h3>
            </div>
            <svg
                className="size-6"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                id="fi_3793594"
                fill="#666"
            >
                <circle cx="8" cy="4" r="2"></circle>
                <circle cx="8" cy="12" r="2"></circle>
                <circle cx="8" cy="20" r="2"></circle>
                <circle cx="16" cy="4" r="2"></circle>
                <circle cx="16" cy="12" r="2"></circle>
                <circle cx="16" cy="20" r="2"></circle>
            </svg>
        </div>
    );
};
