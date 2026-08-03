import "./Orders.css";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

function Orders() {
    return (
        <Link
            to="/orders"
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
        </Link>
    );
}

export default Orders;