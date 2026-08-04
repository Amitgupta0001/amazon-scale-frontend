import "./ResetPassword.css";

import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import AuthCard from "../../components/auth/AuthCard";
import PasswordInput from "../../components/auth/PasswordInput";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors = {
            password: "",
            confirmPassword: "",
        };

        if (!password.trim() || !confirmPassword.trim()) {
            validationErrors.password = "New password is required.";
            validationErrors.confirmPassword = "Confirm your password.";
            setErrors(validationErrors);
            return;
        }

        if (password.length < 8) {
            validationErrors.password = "Password must be at least 8 characters.";
            setErrors(validationErrors);
            return;
        }

        if (password !== confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match.";
            setErrors(validationErrors);
            return;
        }

        setErrors(validationErrors);
    };

    return (
        <section className="reset-password-page">
            <AuthCard
                title="Reset Password"
                subtitle="Create a new password for your AmazonScale account"
            >
                <form
                    className="reset-password-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <PasswordInput
                        id="reset-password"
                        name="password"
                        label="New Password"
                        value={password}
                        required
                        error={errors.password}
                        autoComplete="new-password"
                        onChange={setPassword}
                    />

                    <PasswordInput
                        id="reset-confirm-password"
                        name="confirmPassword"
                        label="Confirm Password"
                        value={confirmPassword}
                        required
                        error={errors.confirmPassword}
                        autoComplete="new-password"
                        onChange={setConfirmPassword}
                    />

                    {(errors.password || errors.confirmPassword) && (
                        <p className="reset-password-form__error" role="alert">
                            {errors.password || errors.confirmPassword}
                        </p>
                    )}

                    <button type="submit" className="reset-password-form__submit">
                        Update Password
                    </button>

                    <Link to="/login" className="reset-password-form__link">
                        Back to Sign In
                    </Link>
                </form>
            </AuthCard>
        </section>
    );
}

export default ResetPassword;