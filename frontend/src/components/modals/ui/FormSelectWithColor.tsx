export const FormSelectWithColor = ({
    colorProps,
    colorLabel,
}: {
    colorProps: React.InputHTMLAttributes<HTMLInputElement>;
    colorLabel: string;
}) => (
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">{colorLabel}</span>
        </label>
        <input
            type="color"
            className="h-12 w-full cursor-pointer rounded-xl"
            {...colorProps}
        />
    </div>
);
