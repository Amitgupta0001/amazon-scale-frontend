import "./ProductDetails.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import productService from "../../services/product/productService";
import cartService from "../../services/cart/cartService";
import wishlistService from "../../services/wishlist/wishlistService";
import type { ProductResponse } from "../../types/api";

function ProductDetails() {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<ProductResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        if (!productId) return;
        setIsLoading(true);
        productService.getProductById(productId)
            .then((data) => {
                setProduct(data);
                setError(null);
            })
            .catch((err: unknown) => {
                const msg = err instanceof Error ? err.message : "Failed to load product";
                setError(msg);
            })
            .finally(() => setIsLoading(false));
    }, [productId]);

    const handleAddToCart = async () => {
        if (!product) return;
        try {
            await cartService.addItemToCart({
                productId: product.id,
                quantity: quantity,
            });
            setNotification(`Added ${quantity} x "${product.name}" to cart!`);
            setTimeout(() => setNotification(null), 3000);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Error adding to cart";
            setNotification(`Cart error: ${msg}`);
            setTimeout(() => setNotification(null), 4000);
        }
    };

    const handleAddToWishlist = async () => {
        if (!product) return;
        try {
            const wishlists = await wishlistService.getUserWishlists();
            let wishlistId = wishlists[0]?.id;
            if (!wishlistId) {
                const created = await wishlistService.createWishlist({
                    name: "My Wishlist",
                    description: "Default wishlist",
                });
                wishlistId = created.id;
            }
            await wishlistService.addItem({
                wishlistId,
                productId: product.id,
            });
            setNotification(`Added "${product.name}" to wishlist!`);
            setTimeout(() => setNotification(null), 3000);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Error adding to wishlist";
            setNotification(`Wishlist error: ${msg}`);
            setTimeout(() => setNotification(null), 4000);
        }
    };

    if (isLoading) {
        return (
            <main style={{ padding: "3rem", textAlign: "center" }}>
                Loading product details...
            </main>
        );
    }

    if (error || !product) {
        return (
            <main style={{ padding: "3rem", textAlign: "center" }}>
                <h2>Product Not Found</h2>
                <p style={{ marginTop: "0.5rem", color: "var(--color-error, #d32f2f)" }}>{error || "Product unavailable"}</p>
                <div style={{ marginTop: "1.5rem" }}>
                    <Link to="/products" className="page-state__button page-state__button--primary">
                        Back to Products
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="page-state page-state--product-details" style={{ padding: "2rem 1rem", maxWidth: "1000px", margin: "0 auto" }}>
            {notification && (
                <div style={{
                    padding: "0.75rem 1rem",
                    marginBottom: "1.5rem",
                    borderRadius: "6px",
                    background: "var(--color-success, #2e7d32)",
                    color: "#fff",
                    fontWeight: 500
                }}>
                    {notification}
                </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #eee", textAlign: "center" }}>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ maxWidth: "100%", maxHeight: "350px", objectFit: "contain" }}
                        onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                        }}
                    />
                </div>

                <div>
                    <span style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "#666", fontWeight: 600 }}>
                        {product.brand}
                    </span>
                    <h1 style={{ fontSize: "1.8rem", margin: "0.5rem 0" }}>{product.name}</h1>
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#111", marginBottom: "1rem" }}>
                        ${product.price?.toFixed(2)}
                    </div>
                    <p style={{ color: "#444", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                        {product.description}
                    </p>

                    <div style={{ marginBottom: "1.5rem" }}>
                        <span style={{ fontWeight: 600 }}>Availability: </span>
                        {product.active && product.stock > 0 ? (
                            <span style={{ color: "#2e7d32", fontWeight: "bold" }}>In Stock ({product.stock} available)</span>
                        ) : (
                            <span style={{ color: "#d32f2f", fontWeight: "bold" }}>Out of Stock</span>
                        )}
                    </div>

                    <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
                        <label htmlFor="quantity" style={{ fontWeight: 600 }}>Qty:</label>
                        <select
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
                        >
                            {[1, 2, 3, 4, 5, 10].map((q) => (
                                <option key={q} value={q}>{q}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.active || product.stock <= 0}
                            style={{
                                padding: "0.75rem 1.5rem",
                                borderRadius: "6px",
                                background: "var(--color-primary, #ff9900)",
                                color: "#111",
                                fontWeight: "bold",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={handleAddToWishlist}
                            style={{
                                padding: "0.75rem 1.5rem",
                                borderRadius: "6px",
                                background: "#f0f0f0",
                                color: "#111",
                                fontWeight: "600",
                                border: "1px solid #ccc",
                                cursor: "pointer"
                            }}
                        >
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: "2rem" }}>
                <Link to="/products" className="page-state__button page-state__button--secondary">
                    ← Back to Products
                </Link>
            </div>
        </main>
    );
}

export default ProductDetails;
