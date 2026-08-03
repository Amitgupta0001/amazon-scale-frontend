import "./Account.css";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

function Account() {
    return (
        <Link
            to="/login"
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
        </Link>
    );
}

export default Account;