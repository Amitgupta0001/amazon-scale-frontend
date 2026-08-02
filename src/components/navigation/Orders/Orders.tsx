import "./Orders.css";
import { Package } from "lucide-react";

function Orders() {
    return (
        <button
            type="button"
            className="orders"
            aria-label="Returns and Orders"
        >
            <div className="orders__icon">
                <Package size={18} />
            </div>

            <div className="orders__content">
                <span className="orders__label">
                    Returns
                </span>

                <span className="orders__title">
                    & Orders
                </span>
            </div>
        </button>
    );
}

export default Orders;