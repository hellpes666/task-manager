import { UserRound } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'framer-motion';

export const ProfilePage = () => {
    const { authUser, logout } = useAuthStore();

    const fadeInUp = (delay = 0) => ({
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: {
            delay,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    });

    return (
        <motion.div
            className="from-primary/10 via-secondary/5 to-accent/5 min-h-[90vh] rounded-3xl bg-gradient-to-br px-4 py-4"
            {...fadeInUp(0)}
            style={{ willChange: 'opacity, transform' }}
        >
            <motion.div
                className="mx-auto max-w-2xl"
                {...fadeInUp(0.1)}
                style={{ willChange: 'opacity, transform' }}
            >
                <motion.div
                    className="bg-base-100 rounded-2xl shadow-xl"
                    transition={{ type: 'spring', stiffness: 70 }}
                    style={{ willChange: 'transform, box-shadow' }}
                >
                    <motion.div
                        className="from-primary to-secondary relative h-32 rounded-t-2xl bg-gradient-to-r"
                        {...fadeInUp(0.2)}
                        style={{ willChange: 'opacity, transform' }}
                    >
                        <motion.div
                            className="absolute -bottom-16 left-1/2 -translate-x-1/2"
                            {...fadeInUp(0.4)}
                            style={{ willChange: 'opacity, transform' }}
                        >
                            <motion.div
                                className="ring-primary/20 ring-offset-base-100 rounded-full ring-4 ring-offset-4"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring' }}
                                style={{ willChange: 'transform' }}
                            >
                                <UserRound
                                    className="text-primary bg-base-100 rounded-full p-3"
                                    size={100}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="space-y-6 px-6 pt-20 pb-8"
                        style={{ willChange: 'opacity, transform' }}
                    >
                        <motion.h1
                            className="mb-8 text-center text-3xl font-bold select-all"
                            {...fadeInUp(0.5)}
                            style={{ willChange: 'opacity, transform' }}
                        >
                            {authUser?.name} {authUser?.lastName}
                            <motion.div
                                className="bg-primary mx-auto mt-2 h-1 w-20 rounded-full"
                                layoutId="underline"
                                style={{ willChange: 'opacity, transform' }}
                            />
                        </motion.h1>

                        <div className="space-y-4">
                            <motion.div
                                className="bg-base-200 hover:bg-base-300 flex items-center gap-4 rounded-lg p-4"
                                {...fadeInUp(0.6)}
                                style={{ willChange: 'opacity, transform' }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-primary h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                <div>
                                    <p className="text-sm opacity-75">
                                        Полное имя
                                    </p>
                                    <p className="font-medium select-all">
                                        {authUser?.name} {authUser?.lastName}
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="bg-base-200 hover:bg-base-300 flex items-center gap-4 rounded-lg p-4"
                                {...fadeInUp(0.7)}
                                style={{ willChange: 'opacity, transform' }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-secondary h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <div>
                                    <p className="text-sm opacity-75">
                                        Электронная почта
                                    </p>
                                    <p className="font-medium break-all select-all">
                                        {authUser?.email}
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div className="mt-8 grid grid-cols-2 gap-4">
                            <motion.div
                                className="stats bg-base-200 shadow"
                                {...fadeInUp(0.8)}
                                style={{ willChange: 'opacity, transform' }}
                            >
                                <div className="stat">
                                    <div className="stat-title">Активность</div>
                                    <div className="stat-value text-primary">
                                        89%
                                    </div>
                                    <div className="stat-desc">
                                        За последний месяц
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                className="stats bg-base-200 shadow"
                                {...fadeInUp(0.9)}
                                style={{ willChange: 'opacity, transform' }}
                            >
                                <div className="stat">
                                    <div className="stat-title">Проекты</div>
                                    <div className="stat-value text-secondary">
                                        12
                                    </div>
                                    <div className="stat-desc">
                                        Активные задачи
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="flex justify-center"
                            {...fadeInUp(1)}
                            style={{ willChange: 'opacity, transform' }}
                        >
                            <motion.button
                                className="btn btn-secondary mx-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={logout}
                                style={{ willChange: 'transform' }}
                            >
                                Выйти
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
