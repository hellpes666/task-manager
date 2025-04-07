import { TasksGroup } from './TasksGroup';
import { TASKS_GROUP } from './groupData';

export const TasksSection = () => {
    return (
        <section className="bg-base-300 mt-10 flex h-[70vh] w-full items-center gap-16 overflow-x-auto scroll-smooth rounded-xl px-15 pb-5">
            {TASKS_GROUP.map((props) => (
                <TasksGroup {...props} />
            ))}
        </section>
    );
};
