export const FormSelectWithColor = ({
    selectProps,
    colorProps,
    selectLabel,
    colorLabel,
}: {
    selectProps: React.SelectHTMLAttributes<HTMLSelectElement>;
    colorProps: React.InputHTMLAttributes<HTMLInputElement>;
    selectLabel: string;
    colorLabel: string;
}) => (
    <div className="grid grid-cols-2 items-center gap-4">
        <div className="form-control">
            <label className="label">
                <span className="label-text">{selectLabel}</span>
            </label>
            <select
                className={`select select-bordered ${selectProps.className || ''}`}
                {...selectProps}
            />
        </div>

        <div className="form-control">
            <label className="label">
                <span className="label-text">{colorLabel}</span>
            </label>
            <input
                type="color"
                className="h-12 w-full cursor-pointer rounded-xl"
                {...colorProps}
            />
        </div>
    </div>
);
