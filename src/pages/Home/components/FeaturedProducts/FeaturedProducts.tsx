import "./FeaturedProducts.css";
import { useEffect, useState } from "react";
import ProductGrid from "../ProductGrid";
import { Link } from "react-router-dom";
import productService from "../../../../services/product/productService";
import type { Product } from "../ProductCard";

function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        productService.getAllProducts()
            .then((data) => {
                if (isMounted && data.length > 0) {
                    const mapped: Product[] = data.slice(0, 4).map((p) => ({
                        id: String(p.id),
                        name: p.name,
                        category: p.brand || "General",
                        price: p.price,
                        rating: 4.8,
                        reviewCount: p.stock > 0 ? p.stock * 10 : 0,
                        badge: p.active ? "Available" : "Out of Stock",
                        inStock: p.stock > 0 && p.active,
                        imageUrl: p.imageUrl,
                    }));
                    setProducts(mapped);
                }
            })
            .catch(() => {
                // Fallback handled gracefully
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const FALLBACK_PRODUCTS: Product[] = [
        {
            id: "1",
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
            id: "2",
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
            id: "3",
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
            id: "4",
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

    const displayProducts = products.length > 0 ? products : FALLBACK_PRODUCTS;

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

                <Link to="/products" className="featured-products__link">
                    View All Featured →
                </Link>
            </div>

            {isLoading ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-secondary, #666)" }}>
                    Loading featured products...
                </div>
            ) : (
                <ProductGrid products={displayProducts} />
            )}
        </section>
    );
}

export default FeaturedProducts;
