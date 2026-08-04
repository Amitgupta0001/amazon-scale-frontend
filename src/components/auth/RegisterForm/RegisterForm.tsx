import "./RegisterForm.css";

import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import PasswordInput from "../PasswordInput";

type RegisterFormErrors = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: string;
};

type PasswordStrength = {
    label: string;
    width: string;
    tone: "weak" | "fair" | "strong" | "excellent";
};

function getPasswordStrength(password: string): PasswordStrength {
    const score = [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[a-z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password),
    ].filter(Boolean).length;

    if (score <= 1) {
        return {
            label: "Weak",
            width: "20%",
            tone: "weak",
        };
    }

    if (score === 2 || score === 3) {
        return {
            label: "Fair",
            width: "50%",
            tone: "fair",
        };
    }

    if (score === 4) {
        return {
            label: "Strong",
            width: "75%",
            tone: "strong",
        };
    }

    return {
        label: "Excellent",
        width: "100%",
        tone: "excellent",
    };
}

function RegisterForm() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState<RegisterFormErrors>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);

    const validate = () => {
        const validationErrors: RegisterFormErrors = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: "",
        };

        let isValid = true;

        if (!firstName.trim()) {
            validationErrors.firstName = "First name is required.";
            isValid = false;
        }

        if (!lastName.trim()) {
            validationErrors.lastName = "Last name is required.";
            isValid = false;
        }

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

        if (!confirmPassword.trim()) {
            validationErrors.confirmPassword = "Please confirm your password.";
            isValid = false;
        } else if (password !== confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match.";
            isValid = false;
        }

        if (!termsAccepted) {
            validationErrors.terms = "You must accept the Terms & Conditions.";
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
            navigate("/login", { replace: true });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            className="register-form"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="register-form__grid">
                <div className="register-form__field">
                    <label htmlFor="register-first-name" className="register-form__label">
                        First Name
                    </label>

                    <input
                        id="register-first-name"
                        name="firstName"
                        type="text"
                        className={`register-form__input ${
                            errors.firstName ? "register-form__input--error" : ""
                        }`}
                        value={firstName}
                        autoComplete="given-name"
                        required
                        onChange={(event) => setFirstName(event.target.value)}
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? "register-first-name-error" : undefined}
                        placeholder="Enter your first name"
                    />

                    {errors.firstName && (
                        <p id="register-first-name-error" className="register-form__error" role="alert">
                            {errors.firstName}
                        </p>
                    )}
                </div>

                <div className="register-form__field">
                    <label htmlFor="register-last-name" className="register-form__label">
                        Last Name
                    </label>

                    <input
                        id="register-last-name"
                        name="lastName"
                        type="text"
                        className={`register-form__input ${
                            errors.lastName ? "register-form__input--error" : ""
                        }`}
                        value={lastName}
                        autoComplete="family-name"
                        required
                        onChange={(event) => setLastName(event.target.value)}
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? "register-last-name-error" : undefined}
                        placeholder="Enter your last name"
                    />

                    {errors.lastName && (
                        <p id="register-last-name-error" className="register-form__error" role="alert">
                            {errors.lastName}
                        </p>
                    )}
                </div>
            </div>

            <div className="register-form__field">
                <label htmlFor="register-email" className="register-form__label">
                    Email
                </label>

                <input
                    id="register-email"
                    name="email"
                    type="email"
                    className={`register-form__input ${
                        errors.email ? "register-form__input--error" : ""
                    }`}
                    value={email}
                    autoComplete="email"
                    required
                    onChange={(event) => setEmail(event.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "register-email-error" : undefined}
                    placeholder="Enter your email"
                />

                {errors.email && (
                    <p id="register-email-error" className="register-form__error" role="alert">
                        {errors.email}
                    </p>
                )}
            </div>

            <PasswordInput
                id="register-password"
                name="password"
                label="Password"
                value={password}
                required
                error={errors.password}
                autoComplete="new-password"
                onChange={setPassword}
            />

            <div className="register-form__strength" aria-live="polite">
                <div className="register-form__strength-row">
                    <span className="register-form__strength-label">Password strength</span>
                    <span className={`register-form__strength-value register-form__strength-value--${passwordStrength.tone}`}>
                        {passwordStrength.label}
                    </span>
                </div>

                <div className="register-form__strength-track" aria-hidden="true">
                    <div
                        className={`register-form__strength-bar register-form__strength-bar--${passwordStrength.tone}`}
                        style={{ width: passwordStrength.width }}
                    />
                </div>
            </div>

            <PasswordInput
                id="register-confirm-password"
                name="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                required
                error={errors.confirmPassword}
                autoComplete="new-password"
                onChange={setConfirmPassword}
            />

            <label className="register-form__terms">
                <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(event) => setTermsAccepted(event.target.checked)}
                    aria-describedby={errors.terms ? "register-terms-error" : undefined}
                />

                <span>
                    I agree to the Terms & Conditions.
                </span>
            </label>

            {errors.terms && (
                <p id="register-terms-error" className="register-form__error" role="alert">
                    {errors.terms}
                </p>
            )}

            <button
                type="submit"
                className="register-form__submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            <p className="register-form__divider">
                Already have an account?
            </p>

            <Link
                to="/login"
                className="register-form__login"
            >
                Sign In
            </Link>
        </form>
    );
}

export default RegisterForm;