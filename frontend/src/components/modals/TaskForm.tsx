import { useForm } from 'react-hook-form';
import { ModalLayout } from './ui/ModalLayout';
import { FormInput, FormSelectWithColor } from './ui';

type TaskFormValues = {
    taskName: string;
    statusName: string;
    statusColor: string;
    startedDate: Date;
    deadline: Date;
    priority: string;
    priorityColor: string;
};

export const TaskForm = ({ toggleModal }: { toggleModal: () => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TaskFormValues>({
        // Ваш resolver для задач
    });

    return (
        <ModalLayout
            title="Добавить задачу"
            toggleModal={toggleModal}
            onSubmit={handleSubmit((data) => console.log(data))}
        >
            <FormInput
                label="Название задачи"
                required
                error={errors.taskName}
                {...register('taskName')}
            />

            <FormSelectWithColor
                selectLabel="Статус"
                colorLabel="Цвет статуса"
                selectProps={{
                    ...register('statusName'),
                    children: (
                        <>
                            <option value="">Выберите статус</option>
                            <option value="В работе">В работе</option>
                            <option value="На паузе">На паузе</option>
                            <option value="Завершено">Завершено</option>
                        </>
                    ),
                }}
                colorProps={register('statusColor')}
            />

            {/* Аналогично для остальных полей */}
        </ModalLayout>
    );
};
