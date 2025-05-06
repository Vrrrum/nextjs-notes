import {InputHTMLAttributes} from "react";

type FormFieldProps = {
    label: string;
    id: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FormField({
                                      label,
                                      id,
                                      type = "text",
                                      placeholder = "",
                                      required = false,
                                      error,
                                      ...rest
                                  }: FormFieldProps) {
    return (
        <label htmlFor={id} className="flex flex-col text-sm font-medium gap-1">
            {label}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                required={required}
                className={`input`}
                {...rest}
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
        </label>
    );
}
