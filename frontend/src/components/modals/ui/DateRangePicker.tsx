import { useFormContext } from 'react-hook-form';

type DateRangePickerProps = {
    startName: string;
    endName: string;
    labels?: {
        start?: string;
        end?: string;
    };
    required?: boolean;
};

export const DateRangePicker = ({
    startName,
    endName,
    labels = { start: 'С', end: 'По' },
    required = false,
}: DateRangePickerProps) => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext();
    const startDate = watch(startName);

    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Начальная дата */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">
                        {labels.start}
                        {required && (
                            <span className="text-warning ml-1">*</span>
                        )}
                    </span>
                </label>
                <input
                    type="date"
                    {...register(startName, {
                        required: required && 'Обязательное поле',
                        // onChange: () => trigger(endName),
                    })}
                    className={`input input-bordered ${errors[startName] ? 'input-error' : ''}`}
                    max={watch(endName)} // Ограничение по конечной дате
                />
                {errors[startName] && (
                    <label className="label">
                        <span className="label-text-alt text-error">
                            {errors[startName]?.message as string}
                        </span>
                    </label>
                )}
            </div>

            {/* Конечная дата */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">
                        {labels.end}
                        {required && (
                            <span className="text-warning ml-1">*</span>
                        )}
                    </span>
                </label>
                <input
                    type="date"
                    {...register(endName, {
                        required: required && 'Обязательное поле',
                        validate: (value) =>
                            !startDate ||
                            value >= startDate ||
                            'Дата окончания не может быть раньше начала',
                    })}
                    className={`input input-bordered ${errors[endName] ? 'input-error' : ''}`}
                    min={startDate} // Динамическое ограничение
                />
                {errors[endName] && (
                    <label className="label">
                        <span className="label-text-alt text-error">
                            {errors[endName]?.message as string}
                        </span>
                    </label>
                )}
            </div>
        </div>
    );
};
