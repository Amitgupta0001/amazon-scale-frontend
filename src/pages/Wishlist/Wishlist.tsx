import "./Wishlist.css";
import { Link } from "react-router-dom";

function Wishlist() {
	return (
		<main className="page-state page-state--wishlist">
			<section className="page-state__panel" aria-labelledby="wishlist-page-title">
				<p className="page-state__eyebrow">Wishlist</p>
				<h1 id="wishlist-page-title" className="page-state__title">
					Your Wishlist
				</h1>
				<p className="page-state__subtitle">
					Wishlist content will be introduced later. For now, this page confirms the route and keeps the UI consistent with the rest of the app.
				</p>

				<div className="page-state__badge-row" aria-label="Page status">
					<span className="page-state__badge">Placeholder</span>
					<span className="page-state__badge">Accessible</span>
					<span className="page-state__badge">Phase 4 Ready</span>
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

export default Wishlist;
