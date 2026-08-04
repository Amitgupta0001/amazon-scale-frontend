import "./AuthLayout.css";

import { Outlet } from "react-router-dom";

import Logo from "../../components/navigation/Logo";

function AuthLayout() {
    return (
        <div className="auth-layout">

            <div className="auth-layout__brand">
                <Logo />
            </div>

            <main className="auth-layout__content">
                <Outlet />
            </main>

            <footer className="auth-layout__footer">
                <p>
                    © {new Date().getFullYear()} AmazonScale.
                    All Rights Reserved.
                </p>
            </footer>

        </div>
    );
}

export default AuthLayout;