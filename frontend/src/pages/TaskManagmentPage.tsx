import { Hand } from 'lucide-react';
import { Title } from '../ui';

const TaskItem = () => {
    return (
        <div className="bg-base-content mx-auto flex max-w-45 min-w-45 flex-col items-start gap-1 rounded-2xl p-2">
            <div className="flex w-full items-center gap-2">
                <div className="size-6 rounded-full border-2 border-dashed border-emerald-400 bg-emerald-100" />
                <h3 className="text-accent-content max-w-[120px] truncate font-bold">
                    Task1231231
                </h3>
                {/* <Grab /> */}
            </div>
            <div className="w-full rounded-full border-[1px] border-[#666]/20" />
            <Hand color="#666" size={18} className="mx-auto" />
        </div>
    );
};

const BacklogSection = () => {
    return (
        <section className="hidden max-h-25 flex-wrap items-center justify-between gap-y-3 overflow-y-auto px-5 group-hover:flex">
            {[
                1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3,
                4, 5, 6, 4, 5, 6,
            ].map(() => (
                <TaskItem />
            ))}
        </section>
    );
};

const Backlog = () => {
    return (
        <footer className="group bg-secondary fixed bottom-0 left-1/2 h-48 max-h-16 w-[70%] -translate-x-1/2 transform overflow-hidden rounded-t-xl px-4 py-2 text-center transition-all duration-300 ease-in-out hover:max-h-48 hover:w-full md:px-16 lg:px-32">
            <Title
                title="Backlog"
                reveal={false}
                className="text-secondary-content mb-5 font-bold uppercase"
            />
            <BacklogSection />
        </footer>
    );
};

const TaskGroup = () => {
    return <div className=""></div>;
};

const TasksSection = () => {
    return <div className=""></div>;
};

export const TaskManagmentPage = () => {
    return (
        <div className="flex h-full w-full flex-col overflow-y-hidden">
            <Title
                title="Tasks"
                reveal={false}
                className="text-accent font-bold uppercase"
            />

            <div className="flex-1">12</div>
            <Backlog />
        </div>
    );
};
