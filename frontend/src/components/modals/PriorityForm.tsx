import { useForm } from 'react-hook-form';
import { FormInput, FormSelectWithColor, ModalLayout } from './ui';

type PriorityFormValues = {
    priorityName: string;
    priorityColor: string;
};

export const PriorityForm = ({ toggleModal }: { toggleModal: () => void }) => {
    const { register, handleSubmit } = useForm<PriorityFormValues>();

	

    return (
        <ModalLayout
            title="Добавить приоритет"
            toggleModal={toggleModal}
            onSubmit={handleSubmit((data) => console.log(data))}
        >
            <div className="flex items-center gap-5">
                <FormInput
                    label="Название приоритета"
                    required
                    {...register('priorityName')}
                />

                {/* <FormSelectWithColor
                    colorLabel="Цвет приоритета"
                    colorProps={register('priorityColor')}
                /> */}
            </div>
        </ModalLayout>
    );
};
