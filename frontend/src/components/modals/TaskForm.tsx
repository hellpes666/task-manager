import { useForm } from 'react-hook-form';
import { ModalLayout } from './ui/ModalLayout';
import { FormInput, FormSelector } from './ui';
import { useTaskStore } from '../../store/useTaskStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { ITask } from '../../entity/Task.entity';

// const resolver: Resolver<ITask> = async (values) => {
//     const errors: Record<string, { type: string; message: string }> = {};

//     if (!values.title?.trim()) {
//         errors.taskName = {
//             type: 'required',
//             message: 'Название задачи обязательно',
//         };
//     }

//     if (!values.startedDate) {
//         errors.startedDate = {
//             type: 'required',
//             message: 'Дата начала обязательна',
//         };
//     }

//     if (
//         values.deadline &&
//         values.startedDate &&
//         values.deadline < values.startedDate
//     ) {
//         errors.deadline = {
//             type: 'invalidDate',
//             message: 'Дедлайн не может быть раньше даты начала',
//         };
//     }

//     return {
//         values: Object.keys(errors).length === 0 ? values : {},
//         errors,
//     };
// };

export const TaskForm = ({ toggleModal }: { toggleModal: () => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{
        title: string;
        statusId: string;
        priorityId: string;
    }>();

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
            onSubmit={handleSubmit((data) => {
                createNewTask(data);
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
                    {/* <DateRangePicker
                        startName="startedDate"
                        endName="deadline"
                        labels={{ start: 'Дата начала', end: 'Дедлайн' }}
                        {...register('startedDate')}
                    /> */}

                    <div className="flex items-center gap-5">
                        <FormSelector
                            label="Статус"
                            {...register('statusId')}
                            error={errors.statusId}
                            id="country-select"
                        >
                            {statuses?.map((item) => (
                                <option value={item._id} key={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </FormSelector>
                        <FormSelector
                            label="Приоритет"
                            {...register('priorityId')}
                            error={errors.priorityId}
                            id="country-select"
                        >
                            {priorities?.map((item) => (
                                <option value={item._id} key={item._id}>
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
