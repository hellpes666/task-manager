import { Resolver, useForm } from 'react-hook-form';
import { BacklogUI, TaskUI } from '../components';
import { useOpenModal } from '../hooks';
import { Title } from '../ui';

type FormValues = {
    taskName: string;
    statusName: string;
    statusColor: string;
    startedDate: Date;
    deadline: Date;
    priority: string;
    priorityColor: string;
    // creator + assigned to
};

const resolver: Resolver<FormValues> = async (values) => {
    const errors: Record<string, { type: string; message: string }> = {};

    if (!values.taskName?.trim()) {
        errors.taskName = {
            type: 'required',
            message: 'Название задачи обязательно',
        };
    }

    if (!values.startedDate) {
        errors.startedDate = {
            type: 'required',
            message: 'Дата начала обязательна',
        };
    }

    if (
        values.deadline &&
        values.startedDate &&
        values.deadline < values.startedDate
    ) {
        errors.deadline = {
            type: 'invalidDate',
            message: 'Дедлайн не может быть раньше даты начала',
        };
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    };
};

export const TaskManagmentPage = () => {
    const { isOpenModal, toggleModal } = useOpenModal();
    const {
        taskName,
        statusName,
        statusColor,
        startedDate,
        deadline,
        priority,
        priorityColor,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver });
    const onSubmit = handleSubmit((data) => console.log(data));
    return (
        <div className="flex h-full w-full flex-col overflow-y-hidden">
            <div className="flex w-full items-center justify-between">
                <Title
                    title="Tasks"
                    reveal={false}
                    className="text-accent font-bold uppercase"
                />
                <button className="btn btn-accent" onClick={toggleModal}>
                    Add new Task
                </button>
            </div>

            <div className="flex-1">
                <TaskUI.TasksSection />
            </div>
            <BacklogUI.Backlog />

            {isOpenModal && (
                <div className="modal modal-open sm:modal-middle">
                    <div className="modal-box max-h-[90vh] overflow-y-auto">
                        <div className="modal-header mb-4 flex items-center justify-between">
                            <Title
                                title="Добавить задачу"
                                reveal={false}
                                className="text-xl font-bold"
                            />
                            <button
                                className="btn btn-circle btn-sm"
                                onClick={toggleModal}
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={onSubmit} className="space-y-4">
                            {/* Название задачи */}
                            <div className="form-control flex flex-col">
                                <label className="label">
                                    <span className="label-text">
                                        Название задачи
                                        <span className="text-warning ml-1">
                                            *
                                        </span>
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    // {...register('taskName')}
                                    className={`input input-bordered w-full ${errors.taskName ? 'input-error' : ''}`}
                                    placeholder="Введите название"
                                />
                                {errors.taskName && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">
                                            {errors.taskName.message}
                                        </span>
                                    </label>
                                )}
                            </div>

                            {/* Статус задачи */}
                            <div className="grid grid-cols-2 items-center gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Статус
                                        </span>
                                    </label>
                                    <select
                                        // {...register('statusName')}
                                        className="select select-bordered"
                                    >
                                        <option value="">
                                            Выберите статус
                                        </option>
                                        <option value="В работе">
                                            В работе
                                        </option>
                                        <option value="На паузе">
                                            На паузе
                                        </option>
                                        <option value="Завершено">
                                            Завершено
                                        </option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Цвет статуса
                                        </span>
                                    </label>
                                    <input
                                        type="color"
                                        // {...register('statusColor')}
                                        className="h-12 w-full cursor-pointer rounded-xl"
                                    />
                                </div>
                            </div>

                            {/* Даты */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Дата начала*
                                        </span>
                                    </label>
                                    <input
                                        type="date"
                                        // {...register('startedDate')}
                                        className={`input input-bordered ${errors.startedDate ? 'input-error' : ''}`}
                                    />
                                    {errors.startedDate && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.startedDate.message}
                                            </span>
                                        </label>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Дедлайн
                                        </span>
                                    </label>
                                    <input
                                        type="date"
                                        // {...register('deadline')}
                                        className={`input input-bordered ${errors.deadline ? 'input-error' : ''}`}
                                    />
                                    {errors.deadline && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.deadline.message}
                                            </span>
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Приоритет */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Приоритет*
                                        </span>
                                    </label>
                                    <select
                                        // {...register('priority')}
                                        className={`select select-bordered ${errors.priority ? 'select-error' : ''}`}
                                    >
                                        <option value="">
                                            Выберите приоритет
                                        </option>
                                        <option value="Высокий">Высокий</option>
                                        <option value="Средний">Средний</option>
                                        <option value="Низкий">Низкий</option>
                                    </select>
                                    {errors.priority && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.priority.message}
                                            </span>
                                        </label>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Цвет приоритета
                                        </span>
                                    </label>
                                    <input
                                        type="color"
                                        // {...register('priorityColor')}
                                        className="h-12 w-full cursor-pointer rounded-xl"
                                    />
                                </div>
                            </div>

                            {/* Кнопки */}
                            <div className="modal-action flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="btn btn-ghost"
                                    onClick={toggleModal}
                                >
                                    Отмена
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Создать задачу
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
