import "./Cart.css";
import { ShoppingCart } from "lucide-react";

function Cart() {
    return (
        <button
            type="button"
            className="cart"
            aria-label="Shopping Cart, 0 items"
        >
            <div className="cart__icon">
                <ShoppingCart size={24} />
                <span className="cart__count">
                    0
                </span>
            </div>

            <span className="cart__text">
                Cart
            </span>
        </button>
    );
}

export default Cart;