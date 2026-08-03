import "./Footer.css";

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="footer">
            <div className="footer__top">
                <button
                    type="button"
                    className="footer__back-to-top"
                    onClick={scrollToTop}
                    aria-label="Back to top of page"
                >
                    Back to Top
                </button>
            </div>

            <div className="footer__content">
                <div className="footer__section">
                    <h3>Get to Know Us</h3>
                    <span className="footer__link">About AmazonScale</span>
                    <span className="footer__link">Careers</span>
                    <span className="footer__link">Blog</span>
                </div>

                <div className="footer__section">
                    <h3>Support</h3>
                    <span className="footer__link">Help Center</span>
                    <span className="footer__link">Contact Us</span>
                    <span className="footer__link">Returns</span>
                </div>

                <div className="footer__section">
                    <h3>Business</h3>
                    <span className="footer__link">Sell on AmazonScale</span>
                    <span className="footer__link">Advertise</span>
                    <span className="footer__link">Affiliates</span>
                </div>

                <div className="footer__section">
                    <h3>Legal</h3>
                    <span className="footer__link">Privacy Policy</span>
                    <span className="footer__link">Terms of Service</span>
                    <span className="footer__link">Cookies</span>
                </div>
            </div>

            <div className="footer__bottom">
                <p>
                    © {new Date().getFullYear()} AmazonScale. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;