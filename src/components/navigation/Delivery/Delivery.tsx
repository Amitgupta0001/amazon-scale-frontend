import "./Delivery.css";
import { MapPin } from "lucide-react";

function Delivery() {
    return (
        <button
            type="button"
            className="delivery"
            aria-label="Select delivery location, currently Bangalore 560078"
        >
            <div className="delivery__icon">
                <MapPin size={18} />
            </div>

            <div className="delivery__content">
                <span className="delivery__label">
                    Deliver to
                </span>

                <span className="delivery__location">
                    Bangalore 560078
                </span>
            </div>
        </button>
    );
}

export default Delivery;