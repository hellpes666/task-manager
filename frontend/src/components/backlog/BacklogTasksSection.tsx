import { TaskUI } from './..';
import { TASKS } from './data';

export const BacklogTasksSection = () => {
    return (
        <section className="hidden max-h-40 flex-wrap items-center justify-between gap-y-3 overflow-y-auto px-5 group-hover:flex">
            {TASKS.map((props) => (
                <TaskUI.TaskItem {...props} />
            ))}
        </section>
    );
};
