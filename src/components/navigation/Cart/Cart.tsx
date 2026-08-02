import "./Cart.css";

import { ShoppingCart } from "lucide-react";

function Cart() {
    return (
        <div
            className="cart"
            role="button"
            tabIndex={0}
            aria-label="Shopping Cart"
        >
            <div className="cart__icon">

                <ShoppingCart size={22} />

                <span className="cart__count">
                    0
                </span>

            </div>

            <span className="cart__text">
                Cart
            </span>
        </div>
    );
}

export default Cart;