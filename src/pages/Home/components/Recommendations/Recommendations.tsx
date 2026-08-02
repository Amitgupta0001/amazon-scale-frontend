import "./Recommendations.css";
import ProductGrid from "../ProductGrid";
import type { Product } from "../ProductCard";
import { ThumbsUp } from "lucide-react";

const RECOMMENDED_PRODUCTS: Product[] = [
    {
        id: "rec-1",
        name: "Professional Studio Condenser Microphone Kit",
        category: "Electronics",
        price: 89.99,
        originalPrice: 119.99,
        rating: 4.7,
        reviewCount: 540,
        badge: "Trending",
        inStock: true,
    },
    {
        id: "rec-2",
        name: "Adjustable Standing Desk Converter 32-Inch",
        category: "Home & Kitchen",
        price: 179.00,
        originalPrice: 219.00,
        rating: 4.8,
        reviewCount: 780,
        badge: "Top Pick",
        inStock: true,
    },
    {
        id: "rec-3",
        name: "Stainless Steel Smart Water Bottle 24oz",
        category: "Sports & Outdoors",
        price: 34.99,
        originalPrice: 44.99,
        rating: 4.6,
        reviewCount: 310,
        badge: "Eco Choice",
        inStock: true,
    },
    {
        id: "rec-4",
        name: "Wireless Charging Dock 3-in-1 Station",
        category: "Electronics",
        price: 49.99,
        originalPrice: 69.99,
        rating: 4.5,
        reviewCount: 1120,
        badge: "Popular",
        inStock: true,
    },
];

function Recommendations() {
    return (
        <section className="recommendations" aria-labelledby="recommendations-heading">
            <div className="recommendations__header">
                <div className="recommendations__title-group">
                    <ThumbsUp size={22} className="recommendations__icon" />
                    <div>
                        <h2 id="recommendations-heading" className="recommendations__title">
                            Recommended For You
                        </h2>
                        <p className="recommendations__subtitle">
                            Inspired by your interest in high-performance electronics & enterprise gear
                        </p>
                    </div>
                </div>
            </div>

            <ProductGrid products={RECOMMENDED_PRODUCTS} />
        </section>
    );
}

export default Recommendations;
