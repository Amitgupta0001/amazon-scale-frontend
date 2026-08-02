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
                    <a href="#">About AmazonScale</a>
                    <a href="#">Careers</a>
                    <a href="#">Blog</a>
                </div>

                <div className="footer__section">
                    <h3>Support</h3>
                    <a href="#">Help Center</a>
                    <a href="#">Contact Us</a>
                    <a href="#">Returns</a>
                </div>

                <div className="footer__section">
                    <h3>Business</h3>
                    <a href="#">Sell on AmazonScale</a>
                    <a href="#">Advertise</a>
                    <a href="#">Affiliates</a>
                </div>

                <div className="footer__section">
                    <h3>Legal</h3>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Cookies</a>
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