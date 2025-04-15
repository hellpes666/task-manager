import { Resolver, useForm } from 'react-hook-form';
import { ModalLayout } from './ui/ModalLayout';
import { DateRangePicker, FormInput, FormSelector } from './ui';
import { useTaskStore } from '../../store/useTaskStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

type TaskFormValues = {
    taskName: string;
    statusName: string;
    statusColor: string;
    startedDate: Date;
    deadline: Date;
    priority: string;
    priorityColor: string;
};
const resolver: Resolver<TaskFormValues> = async (values) => {
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

export const TaskForm = ({ toggleModal }: { toggleModal: () => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TaskFormValues>({
        resolver,
    });

    const {
        statuses,
        priorities,
        getAllPriorities,
        getAllStatuses,
        isLoadingAllPriorities,
        isLoadingAllStatuses,
    } = useTaskStore();

    useEffect(() => {
        getAllPriorities();
        getAllStatuses();
    }, [getAllPriorities, getAllStatuses]);

    return (
        <ModalLayout
            title="Добавить задачу"
            toggleModal={toggleModal}
            onSubmit={handleSubmit((data) => console.log(data))}
        >
            {isLoadingAllStatuses || isLoadingAllPriorities ? (
                <div className="flex h-full items-center justify-center">
                    <Loader className="size-10 animate-spin" />
                </div>
            ) : (
                <>
                    <FormInput
                        label="Название задачи"
                        required
                        error={errors.taskName}
                        {...register('taskName')}
                    />
                    <DateRangePicker
                        startName="startedDate"
                        endName="deadline"
                        labels={{ start: 'Дата начала', end: 'Дедлайн' }}
                        required
                    />

                    <div className="flex items-center gap-5">
                        <FormSelector
                            label="Статус"
                            {...register('statusName', { required: true })}
                            error={errors.statusName}
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
                            error={errors.statusName}
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
