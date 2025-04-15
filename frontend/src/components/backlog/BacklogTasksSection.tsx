import { useTaskStore } from '../../store/useTaskStore';
import { TaskUI } from './..';

export const BacklogTasksSection = () => {
    const { backlog } = useTaskStore();
    return (
        <section className="hidden max-h-40 flex-wrap items-center justify-between gap-y-3 overflow-y-auto px-5 group-hover:flex">
            {backlog?.tasks.map((item) => (
                <TaskUI.TaskItem {...item} key={item._id} />
            ))}
        </section>
    );
};
