import React, { useState } from 'react';
import { Title } from '../ui';

export const AuthPage = () => {
    const [errors, setErrors] = useState([]);
    return (
        <div className="hero bg-base-200 min-h-[90vh] rounded-xl py-12">
            <form className="hero-content bg-base-content flex h-full max-h-[50%] w-full max-w-md flex-col items-center space-y-4 rounded-lg">
                <Title
                    title="Signup"
                    reveal={false}
                    className="text-secondary"
                />
                <div className="flex w-full flex-1 flex-col items-center justify-center gap-y-5">
                    <div className="flex w-full items-center justify-between">
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text text-base-200 font-medium">
                                    Ваше имя
                                    <span className="text-secondary ml-1">
                                        *
                                    </span>
                                </span>
                            </label>
                            <input
                                type="text"
                                // {...register('taskName')}
                                className={`input input-bordered w-full ${errors ? 'input-error' : ''}`}
                                placeholder="Имя"
                            />
                            {errors && (
                                <label className="label">
                                    <span className="label-text-alt text-error">
                                        {errors}
                                    </span>
                                </label>
                            )}
                        </div>
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text text-base-200 font-medium">
                                    Ваша фамилия
                                    <span className="text-secondary ml-1">
                                        *
                                    </span>
                                </span>
                            </label>
                            <input
                                type="text"
                                // {...register('taskName')}
                                className={`input input-bordered w-full ${errors ? 'input-error' : ''}`}
                                placeholder="Фамилия"
                            />
                            {errors && (
                                <label className="label">
                                    <span className="label-text-alt text-error">
                                        {errors}
                                    </span>
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="form-control flex w-full flex-col">
                        <label className="label">
                            <span className="label-text text-base-200 mx-auto font-medium">
                                Ваш email
                                <span className="text-secondary ml-1">*</span>
                            </span>
                        </label>
                        <input
                            type="text"
                            // {...register('taskName')}
                            className={`input input-bordered w-full ${errors ? 'input-error' : ''}`}
                            placeholder="example@domain.com"
                        />
                        {errors && (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    {errors}
                                </span>
                            </label>
                        )}
                    </div>
                </div>
                <button className="btn btn-secondary">
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};
