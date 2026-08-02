import "../styles/hero.css";

function Hero() {
    return (
        <section className="hero" aria-label="Hero Banner">
            <div className="hero__content">
                <h1 className="hero__title">Welcome to AmazonScale</h1>

                <h2 className="hero__subtitle">Your Enterprise E-Commerce Platform</h2>

                <p className="hero__description">
                    Discover millions of products, lightning-fast delivery, secure
                    payments, and a seamless shopping experience built with modern
                    frontend engineering.
                </p>

                <button type="button" className="hero__button" aria-label="Shop now">
                    Shop Now
                </button>
            </div>
        </section>
    );
}

export default Hero;