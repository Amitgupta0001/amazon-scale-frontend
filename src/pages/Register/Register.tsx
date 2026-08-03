import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
	return (
		<main className="page-state page-state--auth">
			<section className="page-state__panel" aria-labelledby="register-page-title">
				<p className="page-state__eyebrow">Authentication</p>
				<h1 id="register-page-title" className="page-state__title">
					Create Account
				</h1>
				<p className="page-state__subtitle">
					Registration is not part of Phase 4. This professional placeholder keeps the route accessible without introducing auth behavior.
				</p>

				<div className="page-state__badge-row" aria-label="Page status">
					<span className="page-state__badge">Coming Soon</span>
					<span className="page-state__badge">No Auth Logic</span>
					<span className="page-state__badge">Responsive</span>
				</div>

				<div className="page-state__actions">
					<Link to="/" className="page-state__button page-state__button--primary">
						Return Home
					</Link>
				</div>
			</section>
		</main>
	);
}

export default Register;
