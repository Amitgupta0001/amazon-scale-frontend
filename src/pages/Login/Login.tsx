import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
	return (
		<main className="page-state page-state--auth">
			<section className="page-state__panel" aria-labelledby="login-page-title">
				<p className="page-state__eyebrow">Authentication</p>
				<h1 id="login-page-title" className="page-state__title">
					Sign In
				</h1>
				<p className="page-state__subtitle">
					Authentication is intentionally out of scope for Phase 4. This placeholder keeps the route ready for the next milestone.
				</p>

				<div className="page-state__badge-row" aria-label="Page status">
					<span className="page-state__badge">Coming Soon</span>
					<span className="page-state__badge">No Auth Logic</span>
					<span className="page-state__badge">Accessible</span>
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

export default Login;
