import "./Orders.css";

import { Package } from "lucide-react";

function Orders() {
    return (
        <div
            className="orders"
            role="button"
            tabIndex={0}
            aria-label="Returns and Orders"
        >
            <div className="orders__icon">
                <Package size={20} />
            </div>

            <div className="orders__content">
                <span className="orders__label">
                    Returns
                </span>

                <span className="orders__title">
                    & Orders
                </span>
            </div>
        </div>
    );
}

export default Orders;