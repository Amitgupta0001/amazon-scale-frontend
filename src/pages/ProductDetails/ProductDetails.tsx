import "./ProductDetails.css";
import { Link, useParams } from "react-router-dom";

function ProductDetails() {
	const { productId } = useParams();

	return (
		<main className="page-state page-state--product-details">
			<section className="page-state__panel" aria-labelledby="product-details-page-title">
				<p className="page-state__eyebrow">Product Details</p>
				<h1 id="product-details-page-title" className="page-state__title">
					Product Overview
				</h1>
				<p className="page-state__subtitle">
					Detailed product rendering is not implemented yet. This route is connected and ready for future catalog data.
				</p>

				<div className="page-state__meta" aria-label="Route information">
					<span className="page-state__meta-label">Product ID</span>
					<span className="page-state__meta-value">{productId ?? "placeholder-id"}</span>
				</div>

				<div className="page-state__badge-row" aria-label="Page status">
					<span className="page-state__badge">Dynamic Route</span>
					<span className="page-state__badge">Semantic HTML</span>
					<span className="page-state__badge">Placeholder Ready</span>
				</div>

				<div className="page-state__actions">
					<Link to="/products" className="page-state__button page-state__button--primary">
						Back to Products
					</Link>
					<Link to="/" className="page-state__button page-state__button--secondary">
						Return Home
					</Link>
				</div>
			</section>
		</main>
	);
}

export default ProductDetails;
