import React from 'react';
import { Task } from '../../entity/Task.entity';
import { useDrawerStore } from '../../store/useDrawerStore';
import { Loader } from 'lucide-react';

export const ActiveTask: React.FC<Task> = (props) => {
    const {
        isOpen,
        openDrawer,
        taskDescription,
        isTaskDataLoading,
    } = useDrawerStore();
    return (
        <>
            <div
                className="bg-base-100 mx-auto flex w-full cursor-grab items-center gap-1 rounded-2xl p-3"
                onClick={() => openDrawer(props._id)}
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
            {/* Task Description */}
            {isOpen && (
                <div className="text-base-300 fixed top-0 right-0 z-5 h-screen min-w-[50%] bg-white p-5">
                    {isTaskDataLoading ? (
                        <div className="h-full w-full">
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
                                {taskDescription?.priorityId.name ??
                                    'Не указан'}
                            </p>
                            <p>
                                <strong>Создатель:</strong>{' '}
                                {taskDescription?.creatorId.name +
                                    ' ' +
                                    taskDescription?.creatorId.lastName}{' '}
                                {props.creator.email}
                            </p>
                            <p>
                                <strong>Начало:</strong>{' '}
                                {taskDescription?.createdAt
                                    .toString()
                                    .split('T')[0] ?? 'Не указано'}
                            </p>
                            <p>
                                <strong>Срок:</strong>{' '}
                                {(taskDescription?.deadline &&
                                    taskDescription?.createdAt
                                        .toString()
                                        .split('T')[0]) ??
                                    'Не указано'}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
