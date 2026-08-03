import "./Cart.css";
import { Link } from "react-router-dom";

function CartPage() {
	return (
		<main className="page-state page-state--cart">
			<section className="page-state__panel" aria-labelledby="cart-page-title">
				<p className="page-state__eyebrow">Cart</p>
				<h1 id="cart-page-title" className="page-state__title">
					Your Cart
				</h1>
				<p className="page-state__subtitle">
					Your shopping cart is ready for the next phase. This professional placeholder keeps the route functional without introducing checkout logic.
				</p>

				<div className="page-state__badge-row" aria-label="Page status">
					<span className="page-state__badge">Empty State</span>
					<span className="page-state__badge">Responsive</span>
					<span className="page-state__badge">No Checkout Logic</span>
				</div>

				<div className="page-state__actions">
					<Link to="/products" className="page-state__button page-state__button--primary">
						Continue Shopping
					</Link>
				</div>
			</section>
		</main>
	);
}

export default CartPage;
