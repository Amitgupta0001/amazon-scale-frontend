import "./Login.css";

import AuthCard from "../../components/auth/AuthCard";
import LoginForm from "../../components/auth/LoginForm";

function Login() {
    return (
        <section className="login-page">
            <AuthCard
                title="Sign In"
                subtitle="Sign in to continue to AmazonScale"
            >
                <LoginForm />
            </AuthCard>
        </section>
    );
}

export default Login;