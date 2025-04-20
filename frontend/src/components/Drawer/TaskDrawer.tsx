import { useDrawerStore } from '../../store/useDrawerStore';
import { Loader, X } from 'lucide-react';

export const TaskDrawer = () => {
    const { isOpen, taskDescription, isTaskDataLoading, closeDrawer } =
        useDrawerStore();

    if (!isOpen) return null;

    return (
        <div className="text-base-300 fixed top-0 right-0 z-50 h-screen w-full max-w-[500px] overflow-y-auto bg-white p-6 shadow-xl">
            {isTaskDataLoading ? (
                <div className="flex h-full w-full items-center justify-center">
                    <Loader className="animate-spin" size={32} />
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-primary text-2xl font-bold">
                            {taskDescription?.title}
                        </h2>
                        <X onClick={closeDrawer} className="cursor-pointer" />
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-500">
                                    Приоритет
                                </span>
                                <span className="badge badge-info mt-1 text-white">
                                    {taskDescription?.priorityId.name ??
                                        'Не указан'}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-500">
                                    Создатель
                                </span>
                                <span className="mt-1 font-semibold text-gray-800">
                                    {taskDescription?.creatorId.name}{' '}
                                    {taskDescription?.creatorId.lastName}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-500">
                                    Дата создания
                                </span>
                                <span className="mt-1">
                                    {taskDescription?.createdAt
                                        ?.toString()
                                        .split('T')[0] ?? 'Не указано'}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-500">
                                    Дедлайн
                                </span>
                                <span className="mt-1">
                                    {taskDescription?.deadline
                                        ?.toString()
                                        .split('T')[0] ?? 'Не указано'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-600">
                            Описание
                        </h3>
                        <textarea
                            className="textarea w-full font-medium text-white"
                            placeholder={'No description'}
                        >
                            {taskDescription?.description}
                        </textarea>
                    </div>
                </div>
            )}
        </div>
    );
};
