import React from 'react';
import { Title } from '../../ui';

import { ITasksData } from '../../entity/Task.entity';
import { ActiveTask } from '.';
import { useDroppable } from '@dnd-kit/core';
import { motion } from 'framer-motion';

export const TasksGroup: React.FC<
    ITasksData & { activeTaskId: string | null; currentIndex: number }
> = (props) => {
    const { setNodeRef } = useDroppable({
        id: props.meta.statusId,
    });

    return (
        <motion.div
            className="bg-base-content h-[90%] max-h-[90%] min-w-100 rounded-2xl border-4 px-2 py-3"
            style={{
                borderColor: props.meta.color || 'var(--accent-color)',
            }}
            ref={setNodeRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                ease: 'easeOut',
                delay: (props.currentIndex + 1) * 0.15,
            }}
        >
            <Title
                title={props.status ?? 'Задачи'}
                reveal={false}
                className="text-base-300 font-medium"
            />
            <div className="mt-1 w-full rounded-full border-[1px] border-[#666]/20" />
            <div className="mt-5 flex max-h-[90%] flex-col items-center justify-center gap-5">
                {props.tasks && props.tasks.length > 0 ? (
                    props.tasks.map((task, i) => (
                        <ActiveTask
                            {...task}
                            key={task._id}
                            isDragging={props.activeTaskId === task._id}
							currentIndex={i}
                        />
                    ))
                ) : (
                    <Title
                        title={'No task'}
                        className="text-primary text-center font-bold"
                        reveal={false}
                    />
                )}
            </div>
        </motion.div>
    );
};
