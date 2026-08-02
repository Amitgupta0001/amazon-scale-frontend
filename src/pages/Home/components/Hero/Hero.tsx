import "./Hero.css";
import { ArrowRight, Sparkles, Tag } from "lucide-react";

function Hero() {
    return (
        <section className="hero-banner" aria-label="Hero Banner">
            <div className="hero-banner__overlay" />

            <div className="hero-banner__container">
                <div className="hero-banner__content">
                    <div className="hero-banner__badge">
                        <Sparkles size={14} className="hero-banner__badge-icon" />
                        <span>Enterprise E-Commerce Redefined</span>
                    </div>

                    <h1 className="hero-banner__title">
                        Next-Gen Shopping <br />
                        <span className="hero-banner__title-accent">Engineered for Scale</span>
                    </h1>

                    <p className="hero-banner__subtitle">
                        Discover millions of premium products with instant logistics, guaranteed
                        authenticity, and seamless global fulfillment powered by AmazonScale.
                    </p>

                    <div className="hero-banner__actions">
                        <button
                            type="button"
                            className="hero-banner__btn hero-banner__btn--primary"
                            aria-label="Explore Product Catalog"
                        >
                            <span>Explore Catalog</span>
                            <ArrowRight size={18} />
                        </button>

                        <button
                            type="button"
                            className="hero-banner__btn hero-banner__btn--secondary"
                            aria-label="View Today's Deals"
                        >
                            <Tag size={18} />
                            <span>Today's Deals</span>
                        </button>
                    </div>

                    <div className="hero-banner__features">
                        <div className="hero-banner__feature-item">
                            <span className="hero-banner__feature-dot" />
                            <span>Free Priority Shipping</span>
                        </div>
                        <div className="hero-banner__feature-item">
                            <span className="hero-banner__feature-dot" />
                            <span>24/7 Enterprise Support</span>
                        </div>
                        <div className="hero-banner__feature-item">
                            <span className="hero-banner__feature-dot" />
                            <span>30-Day Money-Back Guarantee</span>
                        </div>
                    </div>
                </div>

                <div className="hero-banner__graphic">
                    <div className="hero-banner__card-preview">
                        <div className="hero-banner__card-tag">Hot Deal</div>
                        <div className="hero-banner__card-icon">⚡</div>
                        <div className="hero-banner__card-info">
                            <span className="hero-banner__card-title">Ultra HD Sound System</span>
                            <span className="hero-banner__card-price">$299.99 <s className="hero-banner__card-old">$399.99</s></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
