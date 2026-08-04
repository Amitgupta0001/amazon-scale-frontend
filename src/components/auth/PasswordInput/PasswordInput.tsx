import "./PasswordInput.css";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = {
    id: string;
    label: string;
    value: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    autoComplete?: "current-password" | "new-password" | "off";
    onChange: (value: string) => void;
};

function PasswordInput({
    id,
    label,
    value,
    name,
    placeholder = "Enter your password",
    required = false,
    error,
    autoComplete = "current-password",
    onChange,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="password-input">

            <label
                htmlFor={id}
                className="password-input__label"
            >
                {label}

                {required && (
                    <span className="password-input__required">
                        *
                    </span>
                )}
            </label>

            <div className="password-input__wrapper">

                <input
                    id={id}
                    name={name ?? id}
                    type={showPassword ? "text" : "password"}
                    className={`password-input__field ${
                        error ? "password-input__field--error" : ""
                    }`}
                    value={value}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required={required}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    aria-invalid={!!error}
                    aria-describedby={
                        error ? `${id}-error` : undefined
                    }
                />

                <button
                    type="button"
                    className="password-input__toggle"
                    aria-label={
                        showPassword
                            ? "Hide password"
                            : "Show password"
                    }
                    onClick={() =>
                        setShowPassword((previous) => !previous)
                    }
                >
                    {showPassword ? (
                        <EyeOff size={20} />
                    ) : (
                        <Eye size={20} />
                    )}
                </button>

            </div>

            {error && (
                <p
                    id={`${id}-error`}
                    className="password-input__error"
                >
                    {error}
                </p>
            )}

        </div>
    );
}

export default PasswordInput;