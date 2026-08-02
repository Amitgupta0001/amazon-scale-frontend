import "./Delivery.css";

import { MapPin } from "lucide-react";

function Delivery() {
    return (
        <div
            className="delivery"
            role="button"
            tabIndex={0}
            aria-label="Select delivery location"
        >
            <div className="delivery__icon">
                <MapPin size={20} />
            </div>

            <div className="delivery__content">

                <span className="delivery__label">
                    Deliver to
                </span>

                <span className="delivery__location">
                    Bangalore 560078
                </span>

            </div>
        </div>
    );
}

export default Delivery;