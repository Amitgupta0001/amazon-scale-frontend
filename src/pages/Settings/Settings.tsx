import "./Settings.css";
import { Link } from "react-router-dom";

function Settings() {
	return (
		<main className="page-state page-state--settings">
			<section className="page-state__panel" aria-labelledby="settings-page-title">
				<p className="page-state__eyebrow">Settings</p>
				<h1 id="settings-page-title" className="page-state__title">
					Account Settings
				</h1>
				<p className="page-state__subtitle">
					Settings are reserved for a later phase. This placeholder confirms routing and keeps the application structure production-safe.
				</p>

				<div className="page-state__badge-row" aria-label="Page status">
					<span className="page-state__badge">Coming Soon</span>
					<span className="page-state__badge">Accessible</span>
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

export default Settings;
