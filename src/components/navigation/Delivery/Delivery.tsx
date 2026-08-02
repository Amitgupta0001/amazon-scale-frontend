import "./Delivery.css";

function Delivery() {
    return (
        <div className="delivery">
            <div className="delivery-icon">
                📍
            </div>

            <div className="delivery-context">
                <span className="delivery-lable">
                    Deliver to
                </span>
                <span className="delivery-location">
                    Banglore 560078
                </span>
            </div>
        </div>
    );
}

export default Delivery;