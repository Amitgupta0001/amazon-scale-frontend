import "./ForgotPassword.css";

import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import AuthCard from "../../components/auth/AuthCard";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Enter a valid email address.");
            return;
        }

        setError("");
    };

    return (
        <section className="forgot-password-page">
            <AuthCard
                title="Forgot Password"
                subtitle="We will prepare the recovery flow for backend integration later"
            >
                <form
                    className="forgot-password-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="forgot-password-form__field">
                        <label
                            htmlFor="forgot-password-email"
                            className="forgot-password-form__label"
                        >
                            Email
                        </label>

                        <input
                            id="forgot-password-email"
                            name="email"
                            type="email"
                            className={`forgot-password-form__input ${
                                error ? "forgot-password-form__input--error" : ""
                            }`}
                            value={email}
                            autoComplete="email"
                            required
                            onChange={(event) => setEmail(event.target.value)}
                            aria-invalid={!!error}
                            aria-describedby={error ? "forgot-password-email-error" : undefined}
                            placeholder="Enter your email"
                        />

                        {error && (
                            <p id="forgot-password-email-error" className="forgot-password-form__error" role="alert">
                                {error}
                            </p>
                        )}
                    </div>

                    <button type="submit" className="forgot-password-form__submit">
                        Continue
                    </button>

                    <Link to="/login" className="forgot-password-form__link">
                        Back to Sign In
                    </Link>
                </form>
            </AuthCard>
        </section>
    );
}

export default ForgotPassword;