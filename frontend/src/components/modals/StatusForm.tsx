import { useForm } from 'react-hook-form';
import { ModalLayout, FormSelectWithColor, FormInput } from './ui';
import { useTaskStore } from '../../store/useTaskStore';
import { Loader } from 'lucide-react';
import { ITaskStatus } from '../../entity/Task.entity';

export const StatusForm = ({ toggleModal }: { toggleModal: () => void }) => {
    const { register, handleSubmit } = useForm<ITaskStatus>();
    const { createNewStatus, isCreatingNewStatus } = useTaskStore();

    return (
        <ModalLayout
            title="Добавить статус"
            toggleModal={toggleModal}
            onSubmit={handleSubmit((data) => {
                createNewStatus(data);
                toggleModal();
            })}
        >
            {isCreatingNewStatus ? (
                <div className="flex h-full items-center justify-center">
                    <Loader className="size-10 animate-spin" />
                </div>
            ) : (
                <div className="flex items-center gap-5">
                    <FormInput
                        label="Название статуса"
                        required
                        {...register('name')}
                    />

                    <FormSelectWithColor
                        colorLabel="Цвет статуса"
                        colorProps={register('color')}
                    />
                </div>
            )}
        </ModalLayout>
    );
};
