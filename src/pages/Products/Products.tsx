import "./Products.css";
import { Link } from "react-router-dom";

function Products() {
	return (
		<main className="page-state page-state--products">
			<section className="page-state__panel" aria-labelledby="products-page-title">
				<p className="page-state__eyebrow">Catalog</p>
				<h1 id="products-page-title" className="page-state__title">
					Products
				</h1>
				<p className="page-state__subtitle">
					The full catalog experience is being prepared. This page is ready for the next phase and currently acts as a professional placeholder.
				</p>

				<div className="page-state__badge-row" aria-label="Page status">
					<span className="page-state__badge">Coming Soon</span>
					<span className="page-state__badge">Responsive</span>
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

export default Products;
