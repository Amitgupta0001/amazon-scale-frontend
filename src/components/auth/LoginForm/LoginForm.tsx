import "./LoginForm.css";

import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import useLocalStorage from "../../../hooks/useLocalStorage";
import PasswordInput from "../PasswordInput";

type LoginFormErrors = {
    email: string;
    password: string;
};

function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useLocalStorage<boolean>(
        "auth.rememberMe",
        false
    );
    const [errors, setErrors] = useState<LoginFormErrors>({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const validationErrors: LoginFormErrors = {
            email: "",
            password: "",
        };

        let isValid = true;

        if (!email.trim()) {
            validationErrors.email = "Email is required.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationErrors.email = "Enter a valid email address.";
            isValid = false;
        }

        if (!password.trim()) {
            validationErrors.password = "Password is required.";
            isValid = false;
        } else if (password.length < 8) {
            validationErrors.password = "Password must be at least 8 characters.";
            isValid = false;
        }

        setErrors(validationErrors);

        return isValid;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await login({
                email,
                password,
            });

            navigate("/", { replace: true });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            className="login-form"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="login-form__field">
                <label
                    htmlFor="login-email"
                    className="login-form__label"
                >
                    Email
                </label>

                <input
                    id="login-email"
                    name="email"
                    type="email"
                    className={`login-form__input ${
                        errors.email ? "login-form__input--error" : ""
                    }`}
                    value={email}
                    autoComplete="email"
                    required
                    onChange={(event) => setEmail(event.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "login-email-error" : undefined}
                    placeholder="Enter your email"
                />

                {errors.email && (
                    <p
                        id="login-email-error"
                        className="login-form__error"
                        role="alert"
                    >
                        {errors.email}
                    </p>
                )}
            </div>

            <PasswordInput
                id="login-password"
                name="password"
                label="Password"
                value={password}
                required
                error={errors.password}
                autoComplete="current-password"
                onChange={setPassword}
            />

            <div className="login-form__utilities">
                <label className="login-form__remember">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(event) => setRememberMe(event.target.checked)}
                    />

                    Remember Me
                </label>

                <Link
                    to="/forgot-password"
                    className="login-form__forgot"
                >
                    Forgot Password?
                </Link>
            </div>

            <button
                type="submit"
                className="login-form__submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Signing In..." : "Sign In"}
            </button>

            <p className="login-form__divider">
                New to AmazonScale?
            </p>

            <Link
                to="/register"
                className="login-form__register"
            >
                Create your AmazonScale account
            </Link>
        </form>
    );
}

export default LoginForm;