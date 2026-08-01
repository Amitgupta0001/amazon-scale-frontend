import "./Logo.css";
import logo from "../../../assets/logos/logo.svg";

function Logo() {
    return (
        <div className="logo">
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
        </div>
    );
}

export default Logo;