import "./DealsSection.css";
import ProductGrid from "../ProductGrid";
import type { Product } from "../ProductCard";
import { Flame, Clock } from "lucide-react";

const TODAY_DEALS: Product[] = [
    {
        id: "deal-1",
        name: "4K Ultra HD Smart TV 55-Inch OLED",
        category: "Electronics",
        price: 599.99,
        originalPrice: 899.99,
        rating: 4.9,
        reviewCount: 3410,
        discountPercent: 33,
        isDeal: true,
        inStock: true,
    },
    {
        id: "deal-2",
        name: "Automatic Espresso Machine & Milk Frother",
        category: "Home & Kitchen",
        price: 149.00,
        originalPrice: 229.00,
        rating: 4.7,
        reviewCount: 920,
        discountPercent: 35,
        isDeal: true,
        inStock: true,
    },
    {
        id: "deal-3",
        name: "Noise-Canceling Wireless Earbuds",
        category: "Electronics",
        price: 79.99,
        originalPrice: 129.99,
        rating: 4.5,
        reviewCount: 1540,
        discountPercent: 38,
        isDeal: true,
        inStock: true,
    },
    {
        id: "deal-4",
        name: "High-Speed SSD External Drive 2TB",
        category: "Gaming",
        price: 159.99,
        originalPrice: 219.99,
        rating: 4.8,
        reviewCount: 680,
        discountPercent: 27,
        isDeal: true,
        inStock: true,
    },
];

function DealsSection() {
    return (
        <section className="deals-section" aria-labelledby="deals-section-heading">
            <div className="deals-section__banner">
                <div className="deals-section__header-content">
                    <div className="deals-section__title-row">
                        <Flame size={24} className="deals-section__flame-icon" />
                        <h2 id="deals-section-heading" className="deals-section__title">
                            Today's Lightning Deals
                        </h2>
                    </div>

                    <div className="deals-section__timer">
                        <Clock size={16} />
                        <span>Ends in: <strong>08h 42m 15s</strong></span>
                    </div>
                </div>
            </div>

            <div className="deals-section__content">
                <ProductGrid products={TODAY_DEALS} />
            </div>
        </section>
    );
}

export default DealsSection;
