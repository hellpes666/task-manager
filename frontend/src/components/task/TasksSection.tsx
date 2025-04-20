import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    KeyboardSensor,
    MouseSensor,
    PointerSensor,
    rectIntersection,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { useTaskStore } from '../../store/useTaskStore';
import { Title } from '../../ui';
import { TasksGroup } from './TasksGroup';
import { ActiveTask } from './activeTask';
import { useState } from 'react';
import { ITasksData, Task } from '../../entity/Task.entity';
import { Loader } from 'lucide-react';

export const TasksSection = () => {
    const { activeTasks, updateTaskData, isLoadingAllTasks } = useTaskStore();
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveTaskId(null);
        if (!over) return;

        const taskId = active.id as string; // task ID
        const newColumnId = over.id; // column ID - statusID

        updateTaskData({ taskId, columnId: newColumnId.toString() });
    };

    function findTaskById(id: string, groups: ITasksData[]): Task | null {
        for (const group of groups) {
            const found = group.tasks.find((task) => task._id === id);
            if (found) return found;
        }
        return null;
    }

    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 50,
        },
    });
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 100,
        },
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });
    const keyboardSensor = useSensor(KeyboardSensor);

    const sensors = useSensors(
        mouseSensor,
        touchSensor,
        keyboardSensor,
        pointerSensor
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={rectIntersection}
            onDragEnd={handleDragEnd}
            onDragStart={(e) => setActiveTaskId(e.active.id as string)}
        >
            <section className="bg-base-300 mt-10 flex h-[70vh] w-full items-center gap-16 overflow-x-auto scroll-smooth rounded-xl px-15 pb-5">
                {isLoadingAllTasks ? (
                    <div className="mx-auto">
                        <Loader className="size-10 animate-spin" />
                    </div>
                ) : activeTasks && activeTasks.length > 0 ? (
                    activeTasks.map((props, i) => (
                            <TasksGroup
                                {...props}
                                key={props.meta.statusId}
                                activeTaskId={activeTaskId}
								currentIndex={i}
                            />
                    ))
                ) : (
                    <Title
                        title="There is no active columns"
                        reveal={false}
                        className="w-full text-center"
                    />
                )}
                {}
            </section>
            <DragOverlay>
                {activeTaskId ? (
                    <ActiveTask
                        {...(findTaskById(activeTaskId, activeTasks!) as Task)}
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};
