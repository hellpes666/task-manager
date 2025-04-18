import React from 'react';
import { Title } from '../../ui';

import { ITasksData } from '../../entity/Task.entity';
import { ActiveTask } from '.';
import { useDrawerStore } from '../../store/useDrawerStore';
import { Drawer } from '../Drawer/Drawer';
import { TaskDetails } from '../Drawer/TaskDetails';

export const TasksGroup: React.FC<ITasksData> = (props) => {
    const { isOpen, closeDrawer, taskDescription, isTaskDataLoading } =
        useDrawerStore();
    return (
        <>
            <div
                className="bg-base-content h-[90%] max-h-[90%] min-w-100 rounded-2xl border-4 px-2 py-3"
                style={{
                    borderColor: props.meta.color || 'var(--accent-color)',
                }}
            >
                <Title
                    title={props.status ?? 'Задачи'}
                    reveal={false}
                    className="text-base-300 font-medium"
                />
                <div className="mt-1 w-full rounded-full border-[1px] border-[#666]/20" />
                <div className="mt-5 flex max-h-[90%] flex-col items-center justify-center gap-5 overflow-y-auto">
                    {props.tasks ? (
                        props.tasks.map((props) => (
                            <ActiveTask {...props} key={props._id} />
                        ))
                    ) : (
                        <>
                            <Title
                                title={'Пока что нет назначенных задач'}
                                className="text-base-300 text-xl"
                                reveal={false}
                            />
                        </>
                    )}
                </div>
            </div>

            <Drawer isOpen={isOpen} onClose={closeDrawer}>
                <TaskDetails
                    data={taskDescription}
                    isLoading={isTaskDataLoading}
                />
            </Drawer>
        </>
    );
};
