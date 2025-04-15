import { FieldError } from "react-hook-form";

export const FormInput = ({
    label,
    required,
    error,
    ...props
}: {
    label: string;
    required?: boolean;
    error?: FieldError | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="form-control flex w-full flex-col">
        <label className="label">
            <span className="label-text">
                {label}
                {required && <span className="text-warning ml-1">*</span>}
            </span>
        </label>
        <input
            className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
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
);
