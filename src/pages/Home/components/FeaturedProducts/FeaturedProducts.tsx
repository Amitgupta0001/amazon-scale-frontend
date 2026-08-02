import "./FeaturedProducts.css";
import ProductGrid from "../ProductGrid";
import type { Product } from "../ProductCard";

const FEATURED_PRODUCTS: Product[] = [
    {
        id: "feat-1",
        name: "Wireless Noise-Canceling Headphones Pro",
        category: "Electronics",
        price: 249.99,
        originalPrice: 299.99,
        rating: 4.8,
        reviewCount: 1240,
        badge: "Best Seller",
        inStock: true,
    },
    {
        id: "feat-2",
        name: "Smart Watch Series X - Health & Fitness Tracker",
        category: "Electronics",
        price: 199.50,
        originalPrice: 249.00,
        rating: 4.6,
        reviewCount: 856,
        badge: "Popular",
        inStock: true,
    },
    {
        id: "feat-3",
        name: "Ergonomic Office Chair with Lumbar Support",
        category: "Home & Kitchen",
        price: 329.00,
        originalPrice: 399.00,
        rating: 4.7,
        reviewCount: 412,
        badge: "Top Rated",
        inStock: true,
    },
    {
        id: "feat-4",
        name: "Ultra-Fast Mechanical Gaming Keyboard",
        category: "Gaming",
        price: 119.99,
        originalPrice: 149.99,
        rating: 4.9,
        reviewCount: 2310,
        badge: "Best Seller",
        inStock: true,
    },
];

function FeaturedProducts() {
    return (
        <section className="featured-products" aria-labelledby="featured-products-heading">
            <div className="featured-products__header">
                <div>
                    <h2 id="featured-products-heading" className="featured-products__title">
                        Featured Products
                    </h2>
                    <p className="featured-products__subtitle">
                        Handpicked top-rated products curated for enterprise quality
                    </p>
                </div>

                <a href="#view-all" className="featured-products__link">
                    View All Featured →
                </a>
            </div>

            <ProductGrid products={FEATURED_PRODUCTS} />
        </section>
    );
}

export default FeaturedProducts;
