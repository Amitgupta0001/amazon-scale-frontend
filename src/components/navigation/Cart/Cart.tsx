import "./Cart.css";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function Cart() {
    return (
        <Link
            to="/cart"
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
        </Link>
    );
}

export default Cart;