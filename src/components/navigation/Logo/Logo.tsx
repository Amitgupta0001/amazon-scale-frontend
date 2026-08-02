import "./Logo.css";
import logo from "../../../assets/logos/logo.svg";

function Logo() {
    return (
        <a
            href="/"
            className="logo"
            aria-label="AmazonScale Home"
        >
            <img
                src={logo}
                alt="AmazonScale Logo"
                className="logo__image"
            />

            <div className="logo__content">
                <h1 className="logo__title">
                    AmazonScale
                </h1>

                <span className="logo__subtitle">
                    Enterprise Store
                </span>
            </div>
        </a>
    );
}

export default Logo;