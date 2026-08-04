import "./AuthCard.css";

import { useId, type ReactNode } from "react";

type AuthCardProps = {
    title: string;
    subtitle?: string;
    children: ReactNode;
};

function AuthCard({
    title,
    subtitle,
    children,
}: AuthCardProps) {
    const titleId = useId();

    return (
        <section
            className="auth-card"
            aria-labelledby={titleId}
            aria-describedby={subtitle ? `${titleId}-subtitle` : undefined}
        >
            <header className="auth-card__header">
                <h1
                    id={titleId}
                    className="auth-card__title"
                >
                    {title}
                </h1>

                {subtitle && (
                    <p
                        className="auth-card__subtitle"
                        id={`${titleId}-subtitle`}
                    >
                        {subtitle}
                    </p>
                )}
            </header>

            <div className="auth-card__body">
                {children}
            </div>
        </section>
    );
}

export default AuthCard;