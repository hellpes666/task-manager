import { useForm } from 'react-hook-form';
import { FormInput, ModalLayout } from './ui';
import { useTaskStore } from '../../store/useTaskStore';
import { ITaskPriority } from '../../entity/Task.entity';
import { Loader } from 'lucide-react';

export const PriorityForm = ({ toggleModal }: { toggleModal: () => void }) => {
    const { register, handleSubmit } = useForm<ITaskPriority>();

    const { createNewPriority, isCreatingNewPriority } = useTaskStore();

    return (
        <ModalLayout
            title="Добавить приоритет"
            toggleModal={toggleModal}
            onSubmit={handleSubmit((data) => {
                createNewPriority(data);
                toggleModal();
            })}
        >
            {isCreatingNewPriority ? (
                <div className="flex h-full items-center justify-center">
                    <Loader className="size-10 animate-spin" />
                </div>
            ) : (
                <div className="flex items-center gap-5">
                    <FormInput
                        label="Название приоритета"
                        required
                        {...register('name')}
                    />

                    {/* <FormSelectWithColor
                    colorLabel="Цвет приоритета"
                    colorProps={register('priorityColor')}
                /> */}
                </div>
            )}
        </ModalLayout>
    );
};
