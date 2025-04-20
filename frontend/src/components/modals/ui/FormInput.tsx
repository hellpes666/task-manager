import { motion } from 'framer-motion';

export const FormInput = ({
    label,
    placeholder,
    name,
    register,
    errors,
    required,
    validation = {},
    type = 'text',
    icon,
}: {
    label: string;
    placeholder: string;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any;
    required?: boolean;
    validation?: object;
    type?: string;
    icon: string;
}) => {
    const error = errors[name];

    return (
        <motion.div
            className="form-control"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ willChange: 'opacity, transform' }}
        >
            <label className="label gap-2">
                <span className="label-text flex items-center gap-2 text-lg">
                    {icon && <span>{icon}</span>}
                    {label}
                    {required && <span className="text-error">*</span>}
                </span>
            </label>

            <motion.input
                type={type}
                {...register(name, {
                    required: required && 'Обязательное поле',
                    ...validation,
                })}
                className={`input input-bordered input-lg w-full ${
                    error ? 'input-error' : 'ring-primary'
                }`}
                placeholder={placeholder}
                whileFocus={{ scale: 1.01 }}
                style={{ willChange: 'transform' }}
            />

            {error && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                    style={{ willChange: 'opacity, height' }}
                >
                    <span className="text-error mt-1 flex items-center gap-1 text-sm">
                        ⚠️ {error.message}
                    </span>
                </motion.div>
            )}
        </motion.div>
    );
};
