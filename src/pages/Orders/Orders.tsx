import "./Orders.css";
import { Link } from "react-router-dom";

function OrdersPage() {
	return (
		<main className="page-state page-state--orders">
			<section className="page-state__panel" aria-labelledby="orders-page-title">
				<p className="page-state__eyebrow">Orders</p>
				<h1 id="orders-page-title" className="page-state__title">
					Your Orders
				</h1>
				<p className="page-state__subtitle">
					Order history is intentionally not implemented yet. This page gives the route a professional, production-safe placeholder.
				</p>

				<div className="page-state__badge-row" aria-label="Page status">
					<span className="page-state__badge">Coming Soon</span>
					<span className="page-state__badge">Responsive</span>
					<span className="page-state__badge">Semantic HTML</span>
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

export default OrdersPage;
