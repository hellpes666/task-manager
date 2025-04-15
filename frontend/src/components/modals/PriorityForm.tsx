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
      <FormInput
        label="Название приоритета"
        required
        {...register('priorityName')}
      />

      <FormSelectWithColor
        selectLabel="Уровень приоритета"
        colorLabel="Цвет приоритета"
        selectProps={{
          ...register('priorityName'),
          children: (
            <>
              <option value="">Выберите уровень</option>
              <option value="Высокий">Высокий</option>
              <option value="Средний">Средний</option>
              <option value="Низкий">Низкий</option>
            </>
          )
        }}
        colorProps={register('priorityColor')}
      />
    </ModalLayout>
  );
};
