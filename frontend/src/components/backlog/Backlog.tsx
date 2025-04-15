import { useTaskStore } from '../../store/useTaskStore';
import { Title } from './../../ui';
import { BacklogTasksSection } from './BacklogTasksSection';

export const Backlog = () => {
    const { backlog } = useTaskStore();
    return (
        <footer className="group bg-secondary fixed bottom-0 left-1/2 h-64 max-h-16 w-[70%] -translate-x-1/2 transform overflow-hidden rounded-t-xl px-4 py-2 text-center transition-all duration-300 ease-in-out hover:max-h-64 hover:w-full md:px-16 lg:px-32">
            <Title
                title="Backlog"
                reveal={false}
                className="text-secondary-content mb-5 font-bold uppercase"
            />
            {backlog?.tasks.length === 0 ? (
                <Title
                    title="There is no one task"
                    className="bg-warning text-warning-content flex h-full items-center justify-center rounded-3xl"
                    reveal={false}
                />
            ) : (
                <BacklogTasksSection />
            )}
        </footer>
    );
};
