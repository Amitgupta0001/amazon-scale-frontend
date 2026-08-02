import "./Account.css";

import { User } from "lucide-react";

function Account() {
    return (
        <div
            className="account"
            role="button"
            tabIndex={0}
            aria-label="Account and Lists"
        >
            <div className="account__icon">
                <User size={20} />
            </div>

            <div className="account__content">

                <span className="account__label">
                    Hello, Sign in
                </span>

                <span className="account__title">
                    Account & Lists
                </span>

            </div>
        </div>
    );
}

export default Account;