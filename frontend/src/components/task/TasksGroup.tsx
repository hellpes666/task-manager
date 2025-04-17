import React from 'react';
import { Title } from '../../ui';

import { ITasksData } from '../../entity/Task.entity';
import { ActiveTask } from '.';
import { twMerge } from 'tailwind-merge';

export const TasksGroup: React.FC<ITasksData> = (props) => {
    return (
        <div
            className="bg-base-content h-[90%] max-h-[90%] min-w-100 rounded-2xl border-4 px-2 py-3"
            style={{ borderColor: props.meta.color || 'var(--accent-color)' }}
        >
            <Title
                title={props.status ?? 'Задачи'}
                reveal={false}
                className="text-base-300 font-medium"
            />
            <div className="mt-1 w-full rounded-full border-[1px] border-[#666]/20" />
            <div className="mt-5 flex max-h-[90%] flex-col items-center justify-center gap-5 overflow-y-auto">
                {props.tasks.map((props) => (
                    <ActiveTask {...props} key={props._id} />
                ))}
            </div>
            <div
                className={twMerge(
                    'bg-base-300/60 fixed top-0 right-0 z-10 block min-h-[100vh] min-w-[100vw] overflow-hidden'
                )}
            ></div>
        </div>
    );
};
