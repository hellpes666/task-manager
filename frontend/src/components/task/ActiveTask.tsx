import React from 'react';
import { Task } from '../../entity/Task.entity';
import { useDrawerStore } from '../../store/useDrawerStore';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export const ActiveTask: React.FC<Task & { isDragging?: boolean }> = ({
    isDragging,
    ...props
}) => {
    const { openDrawer } = useDrawerStore();

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props._id,
        data: {
            ...props,
        },
    });

    return (
        <div
            className={`bg-base-100 shadow-base-100/60 mx-auto flex w-full cursor-grab items-center gap-1 rounded-2xl p-3 shadow-xl transition-transform`}
            onClick={() => {
                if (!isDragging) {
                    openDrawer(props._id);
                }
            }}
            {...attributes}
            {...listeners}
            ref={setNodeRef}
            style={{
                transform: CSS.Translate.toString(transform),
                opacity: isDragging ? 0.3 : 1,
                transition: 'opacity 0.2s ease',
                willChange: 'transform',
            }}
        >
            <div className="flex w-full flex-col items-center gap-3">
                <div className="flex w-full items-center justify-between">
                    <div className="flex w-full items-center gap-2">
                        <div
                            className="size-6 rounded-full border-2 border-dashed"
                            // style={{
                            //     borderColor: priorityColor || '#0a0a0a',
                            //     borderColor: '#0a0a0a',
                            // }}
                        />
                        <h3 className="text-primary-content truncate font-bold">
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
                {props.startedDate && props.deadline && (
                    <div className="text-secondary font-bold">
                        <span className="text-white">С</span>{' '}
                        {props.startedDate.toString().split('T')[0]}{' '}
                        <span className="text-white">по</span>{' '}
                        {props.deadline.toString().split('T')[0]}
                    </div>
                )}
            </div>
        </div>
    );
};
