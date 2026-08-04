import "./Register.css";

import AuthCard from "../../components/auth/AuthCard";
import RegisterForm from "../../components/auth/RegisterForm";

function Register() {
	return (
		<section className="register-page">
			<AuthCard
				title="Create Account"
				subtitle="Open an AmazonScale account to continue"
			>
				<RegisterForm />
			</AuthCard>
		</section>
	);
}

export default Register;
