import "./Logo.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/logos/logo.svg";

function Logo() {
    return (
        <Link
            to="/"
            className="logo"
            aria-label="AmazonScale Home"
        >
            <img
                src={logo}
                alt="AmazonScale Logo"
                className="logo__image"
                width={40}
                height={40}
            />

            <div className="logo__content">
                <span className="logo__title">
                    AmazonScale
                </span>

                <span className="logo__subtitle">
                    Enterprise Store
                </span>
            </div>
        </Link>
    );
}

export default Logo;