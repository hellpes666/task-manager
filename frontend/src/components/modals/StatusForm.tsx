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
            <FormInput
                label="Название статуса"
                required
                {...register('statusName')}
            />

            <FormSelectWithColor
                selectLabel="Уровень статуса"
                colorLabel="Цвет статуса"
                selectProps={{
                    ...register('statusName'),
                    children: (
                        <>
                            <option value="">Выберите уровень</option>
                            <option value="Высокий">Высокий</option>
                            <option value="Средний">Средний</option>
                            <option value="Низкий">Низкий</option>
                        </>
                    ),
                }}
                colorProps={register('statusColor')}
            />
        </ModalLayout>
    );
};
