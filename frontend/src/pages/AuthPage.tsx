import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Title } from '../ui';
import { IUserData } from '../entity/User.entity';
import { useAuthStore } from '../store/useAuthStore';
import { FormInput } from '../components/modals/ui';

export const AuthPage = () => {
    const { pathname } = useLocation();
    const isLogin = pathname.includes('/login');

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
            <AnimatePresence mode="wait">
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-base-100 w-full max-w-md space-y-6 rounded-2xl p-8 shadow-xl"
                    style={{ willChange: 'opacity, transform' }}
                >
                    <motion.div
                        className="space-y-2 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{ willChange: 'opacity' }}
                    >
                        <Title
                            title={isLogin ? 'Вход' : 'Регистрация'}
                            reveal={true}
                            className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent"
                        />
                        <p className="text-base-content/80">
                            {isLogin
                                ? 'Нет аккаунта?'
                                : 'Уже зарегистрированы?'}{' '}
                            <Link to={isLogin ? '/register' : '/login'}>
                                <motion.span
                                    className="link link-primary"
                                    whileHover={{ color: '#6d28d9' }} // Secondary color
                                    transition={{ duration: 0.3 }}
                                >
                                    {isLogin ? 'Создать аккаунт' : 'Войти'}
                                </motion.span>
                            </Link>
                        </p>
                    </motion.div>

                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{ willChange: 'opacity' }}
                    >
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
                    </motion.div>

                    <motion.button
                        type="submit"
                        className="btn btn-primary w-full gap-2"
                        disabled={isLogin ? isLoggingIn : isSigningUp}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        style={{ willChange: 'transform' }}
                    >
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        <span className="text-xl">{isLogin ? '🚀' : '✨'}</span>
                    </motion.button>
                </motion.form>
            </AnimatePresence>
        </div>
    );
};
