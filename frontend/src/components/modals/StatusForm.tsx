import { useForm } from 'react-hook-form';
import { ModalLayout, FormSelectWithColor, FormInput } from './ui';

type StatusFormValues = {
    statusName: string;
    statusColor: string;
};

export const StatusForm = ({ toggleModal }: { toggleModal: () => void }) => {
    const { register, handleSubmit } = useForm<StatusFormValues>();

    return (
        <ModalLayout
            title="Добавить статус"
            toggleModal={toggleModal}
            onSubmit={handleSubmit((data) => console.log(data))}
        >
            <div className="flex items-center gap-5">
                <FormInput
                    label="Название статуса"
                    required
                    {...register('statusName')}
                />

                <FormSelectWithColor
                    colorLabel="Цвет статуса"
                    colorProps={register('statusColor')}
                />
            </div>
        </ModalLayout>
    );
};
