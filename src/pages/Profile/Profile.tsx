import "./Profile.css";
import { Link } from "react-router-dom";

function Profile() {
	return (
		<main className="page-state page-state--profile">
			<section className="page-state__panel" aria-labelledby="profile-page-title">
				<p className="page-state__eyebrow">Profile</p>
				<h1 id="profile-page-title" className="page-state__title">
					Profile Overview
				</h1>
				<p className="page-state__subtitle">
					User profile management will be introduced later. This page remains a polished, responsive placeholder for the current release.
				</p>

				<div className="page-state__badge-row" aria-label="Page status">
					<span className="page-state__badge">Placeholder</span>
					<span className="page-state__badge">Semantic HTML</span>
					<span className="page-state__badge">Ready for Phase 5</span>
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

export default Profile;
