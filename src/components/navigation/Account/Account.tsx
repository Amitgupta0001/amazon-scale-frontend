import "./Account.css";
import { User } from "lucide-react";

function Account() {
    return (
        <button
            type="button"
            className="account"
            aria-label="Account and Lists"
        >
            <div className="account__icon">
                <User size={18} />
            </div>

            <div className="account__content">
                <span className="account__label">
                    Hello, Sign in
                </span>

                <span className="account__title">
                    Account & Lists
                </span>
            </div>
        </button>
    );
}

export default Account;