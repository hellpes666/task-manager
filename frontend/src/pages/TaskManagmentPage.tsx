import { BacklogUI, TaskUI } from '../components';
import { Title } from '../ui';

export const TaskManagmentPage = () => {
    return (
        <div className="flex h-full w-full flex-col overflow-y-hidden">
            <Title
                title="Tasks"
                reveal={false}
                className="text-accent font-bold uppercase"
            />

            <div className="flex-1">
                <TaskUI.TasksSection />
            </div>
            <BacklogUI.Backlog />
        </div>
    );
};
