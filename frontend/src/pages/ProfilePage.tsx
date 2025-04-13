import { UserRound } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const ProfilePage = () => {
    const { authUser, logout } = useAuthStore();
    return (
        <div className="from-primary/10 via-secondary/5 to-accent/5 min-h-[90vh] rounded-3xl bg-gradient-to-br px-4 py-4">
            <div className="mx-auto max-w-2xl animate-[fadeInUp_1.3s_cubic-bezier(0.22,1,0.36,1)_both]">
                <div className="bg-base-100 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
                    <div className="from-primary to-secondary relative h-32 rounded-t-2xl bg-gradient-to-r">
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                            <div className="ring-primary/20 ring-offset-base-100 rounded-full ring-4 ring-offset-4 transition-transform duration-300 hover:scale-105">
                                <UserRound
                                    className="text-primary bg-base-100 rounded-full p-3"
                                    size={100}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Контент профиля */}
                    <div className="space-y-6 px-6 pt-20 pb-8">
                        <h1 className="mb-8 text-center text-3xl font-bold">
                            {authUser?.name} {authUser?.lastName}
                            <div className="bg-primary mx-auto mt-2 h-1 w-20 rounded-full" />
                        </h1>

                        {/* Карточка с информацией */}
                        <div className="space-y-4">
                            <div className="bg-base-200 hover:bg-base-300 flex items-center gap-4 rounded-lg p-4 transition-colors">
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
                                    <p className="font-medium">
                                        {authUser?.name} {authUser?.lastName}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-base-200 hover:bg-base-300 flex items-center gap-4 rounded-lg p-4 transition-colors">
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
                                    <p className="font-medium break-all">
                                        {authUser?.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Статистика */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="stats bg-base-200 shadow">
                                <div className="stat">
                                    <div className="stat-title">Активность</div>
                                    <div className="stat-value text-primary">
                                        89%
                                    </div>
                                    <div className="stat-desc">
                                        За последний месяц
                                    </div>
                                </div>
                            </div>
                            <div className="stats bg-base-200 shadow">
                                <div className="stat">
                                    <div className="stat-title">Проекты</div>
                                    <div className="stat-value text-secondary">
                                        12
                                    </div>
                                    <div className="stat-desc">
                                        Активные задачи
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="btn btn-secondary mx-2"
                                onClick={logout}
                            >
                                Выйти
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
