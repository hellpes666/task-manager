import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

export const FormSelector = forwardRef<HTMLSelectElement, Props>(
    ({ label, required, error, id, className, ...props }, ref) => (
        <div className="form-control flex w-full flex-col">
            <label className="label" htmlFor={id}>
                <span className="label-text">
                    {label}
                    {required && <span className="text-warning ml-1">*</span>}
                </span>
            </label>
            <select
                id={id}
                ref={ref}
                className={`input input-bordered w-full ${
                    error ? 'input-error' : ''
                } ${className || ''}`}
                required={required}
                {...props}
            />
            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">
                        {error.message}
                    </span>
                </label>
            )}
        </div>
    )
);

type Props = {
    label: string;
    required?: boolean;
    error?: FieldError;
} & React.InputHTMLAttributes<HTMLSelectElement>;
