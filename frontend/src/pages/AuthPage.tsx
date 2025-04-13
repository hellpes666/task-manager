import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Title } from '../ui';
import { IUserData } from '../entity/User.entity';
import { useAuthStore } from '../store/useAuthStore';

export const AuthPage = () => {
    const { pathname } = useLocation();
    const isLogin = pathname.includes('/login');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserData>();

    const { isSigningUp, isLoggingIn, signup, login } = useAuthStore();

    const onSubmit = (data: IUserData) => {
        isLogin ? login(data) : signup(data);
    };

    return (
        <div className="from-primary to-secondary flex max-h-[90%] min-h-[90vh] items-center justify-center rounded-3xl bg-gradient-to-br p-4">
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="bg-base-100 w-full max-w-md space-y-6 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
            >
                <div className="space-y-2 text-center">
                    <Title
                        title={isLogin ? 'Вход' : 'Регистрация'}
                        reveal={true}
                        className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent"
                    />
                    <p className="text-base-content/80">
                        {isLogin ? 'Нет аккаунта?' : 'Уже зарегистрированы?'}{' '}
                        <Link
                            type="button"
                            to={isLogin ? '/register' : '/login'}
                        >
                            <span className="link link-primary hover:link-secondary transition-colors">
                                {isLogin ? 'Создать аккаунт' : 'Войти'}
                            </span>
                        </Link>
                    </p>
                </div>

                <div className="space-y-4">
                    {!isLogin && (
                        <div className="flex gap-4">
                            <FormInput
                                label="Имя"
                                placeholder="Ваше имя"
                                name="name"
                                register={register}
                                errors={errors}
                                required
                                icon="👤"
                            />
                            <FormInput
                                label="Фамилия"
                                placeholder="Ваша фамилия"
                                name="lastName"
                                register={register}
                                errors={errors}
                                required
                                icon="📛"
                            />
                        </div>
                    )}

                    <FormInput
                        label="Email"
                        placeholder="example@domain.com"
                        name="email"
                        register={register}
                        errors={errors}
                        required
                        icon="✉️"
                        validation={{
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Некорректный email',
                            },
                        }}
                    />

                    <FormInput
                        label="Пароль"
                        placeholder="••••••••"
                        name="password"
                        type="password"
                        register={register}
                        errors={errors}
                        required
                        icon="🔒"
                        validation={{
                            minLength: {
                                value: 6,
                                message: 'Минимум 6 символов',
                            },
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full gap-2 transition-transform hover:scale-[1.02] hover:shadow-lg"
                    disabled={isLogin ? isLoggingIn : isSigningUp}
                >
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    <span className="text-xl">{isLogin ? '🚀' : '✨'}</span>
                </button>
            </motion.form>
        </div>
    );
};

// Улучшенный FormInput с анимацией и иконками
const FormInput = ({
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <label className="label gap-2">
                <span className="label-text flex items-center gap-2 text-lg">
                    {icon && <span>{icon}</span>}
                    {label}
                    {required && <span className="text-error">*</span>}
                </span>
            </label>

            <input
                type={type}
                {...register(name, {
                    required: required && 'Обязательное поле',
                    ...validation,
                })}
                className={`input input-bordered input-lg w-full ${error ? 'input-error' : 'ring-primary focus:ring-2'} transition-all duration-200`}
                placeholder={placeholder}
            />

            {error && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="overflow-hidden"
                >
                    <span className="text-error mt-1 flex items-center gap-1 text-sm">
                        ⚠️ {error.message}
                    </span>
                </motion.div>
            )}
        </motion.div>
    );
};
