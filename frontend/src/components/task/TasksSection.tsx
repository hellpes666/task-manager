import { useTaskStore } from '../../store/useTaskStore';
import { Title } from '../../ui';
import { TasksGroup } from './TasksGroup';

export const TasksSection = () => {
    const { activeTasks } = useTaskStore();
    return (
        <section className="bg-base-300 mt-10 flex h-[70vh] w-full items-center gap-16 overflow-x-auto scroll-smooth rounded-xl px-15 pb-5">
            {activeTasks ? (
                activeTasks.map((props) => (
                    <TasksGroup {...props} key={props.status} />
                ))
            ) : (
                <Title
                    title="There is no active columns"
                    reveal={false}
                    className="w-full text-center"
                />
            )}
        </section>
    );
};
