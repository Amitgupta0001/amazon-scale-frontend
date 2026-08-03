import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
	return (
		<main className="page-state page-state--not-found">
			<section className="page-state__panel" aria-labelledby="not-found-page-title">
				<p className="page-state__eyebrow">404</p>
				<h1 id="not-found-page-title" className="page-state__title">
					Page Not Found
				</h1>
				<p className="page-state__subtitle">
					The page you are looking for does not exist. Use the button below to return to the homepage.
				</p>

				<div className="page-state__actions">
					<Link to="/" className="page-state__button page-state__button--primary">
						Back To Home
					</Link>
				</div>
			</section>
		</main>
	);
}

export default NotFound;
