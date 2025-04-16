import { Resolver, useForm } from 'react-hook-form';
import { ModalLayout } from './ui/ModalLayout';
import { DateRangePicker, FormInput, FormSelector } from './ui';
import { useTaskStore } from '../../store/useTaskStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { ITask } from '../../entity/Task.entity';

const resolver: Resolver<ITask> = async (values) => {
    const errors: Record<string, { type: string; message: string }> = {};

    if (!values.title?.trim()) {
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

export const TaskForm = ({ toggleModal }: { toggleModal: () => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ITask>({
        resolver,
    });

    const {
        statuses,
        priorities,
        getAllPriorities,
        getAllStatuses,
        isLoadingAllPriorities,
        isLoadingAllStatuses,
        isCreatingNewTask,
        createNewTask,
    } = useTaskStore();

    useEffect(() => {
        getAllPriorities();
        getAllStatuses();
    }, [getAllPriorities, getAllStatuses]);

    return (
        <ModalLayout
            title="Добавить задачу"
            toggleModal={toggleModal}
            onSubmit={handleSubmit(async (data) => {
                console.log('Form data:', data);
                // await createNewTask(data);
                toggleModal();
            })}
        >
            {isLoadingAllStatuses ||
            isLoadingAllPriorities ||
            isCreatingNewTask ? (
                <div className="flex h-full items-center justify-center">
                    <Loader className="size-10 animate-spin" />
                </div>
            ) : (
                <>
                    <FormInput
                        label="Название задачи"
                        required
                        error={errors.title}
                        {...register('title')}
                    />
                    <DateRangePicker
                        startName="startedDate"
                        endName="deadline"
                        labels={{ start: 'Дата начала', end: 'Дедлайн' }}
                    />

                    <div className="flex items-center gap-5">
                        <FormSelector
                            label="Статус"
                            {...register('status.name', { required: true })}
                            error={errors.status?.name}
                            id="country-select"
                        >
                            {statuses?.map((item) => (
                                <option value={item.name} key={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </FormSelector>
                        <FormSelector
                            label="Приоритет"
                            {...register('priority', { required: true })}
                            error={errors.priority?.name}
                            id="country-select"
                        >
                            {priorities?.map((item) => (
                                <option value={item.name} key={item._id}>
                                    {' '}
                                    {item.name}
                                </option>
                            ))}
                        </FormSelector>
                    </div>
                </>
            )}
        </ModalLayout>
    );
};
