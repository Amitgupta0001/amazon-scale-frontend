import "./Products.css";
import { useEffect, useState } from "react";
import productService from "../../services/product/productService";
import cartService from "../../services/cart/cartService";
import type { ProductResponse } from "../../types/api";
import ProductCard, { type Product } from "../Home/components/ProductCard";

function Products() {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("all");
    const [notification, setNotification] = useState<string | null>(null);

    const fetchProducts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await productService.getAllProducts();
            setProducts(data);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to load products from backend";
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddToCart = async (product: Product) => {
        try {
            await cartService.addItemToCart({
                productId: Number(product.id),
                quantity: 1,
            });
            setNotification(`Added "${product.name}" to cart!`);
            setTimeout(() => setNotification(null), 3000);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Could not add to cart";
            setNotification(`Cart error: ${msg}`);
            setTimeout(() => setNotification(null), 4000);
        }
    };

    const brands = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)));

    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBrand = selectedBrand === "all" || p.brand === selectedBrand;
        return matchesSearch && matchesBrand;
    });

    return (
        <main className="page-state page-state--products" style={{ padding: "2rem 1rem", maxWidth: "1280px", margin: "0 auto" }}>
            <header className="products-header" style={{ marginBottom: "2rem" }}>
                <h1 id="products-page-title" className="page-state__title" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                    Product Catalog
                </h1>
                <p className="page-state__subtitle">
                    Integrated directly with AmazonScale Spring Boot Product APIs
                </p>
            </header>

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

            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
                <input
                    type="text"
                    placeholder="Search catalog products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        flex: "1 1 300px",
                        padding: "0.6rem 1rem",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        fontSize: "0.95rem"
                    }}
                />
                <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    style={{
                        padding: "0.6rem 1rem",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        fontSize: "0.95rem"
                    }}
                >
                    <option value="all">All Brands</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>

            {isLoading ? (
                <div style={{ textAlign: "center", padding: "3rem" }}>Loading products from backend...</div>
            ) : error ? (
                <div style={{ textAlign: "center", padding: "3rem", color: "var(--color-error, #d32f2f)" }}>
                    <p>{error}</p>
                    <button
                        onClick={fetchProducts}
                        style={{ marginTop: "1rem", padding: "0.5rem 1.5rem", cursor: "pointer" }}
                    >
                        Retry
                    </button>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem", background: "var(--color-card-bg, #f9f9f9)", borderRadius: "8px" }}>
                    <h3>No products found</h3>
                    <p style={{ marginTop: "0.5rem" }}>No products match your search or backend catalog is empty.</p>
                </div>
            ) : (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: "1.5rem"
                }}>
                    {filteredProducts.map((p) => {
                        const mappedProduct: Product = {
                            id: String(p.id),
                            name: p.name,
                            category: p.brand || "General",
                            price: p.price,
                            rating: 4.8,
                            reviewCount: p.stock * 5,
                            imageUrl: p.imageUrl,
                            badge: p.active ? "Active" : "Inactive",
                            inStock: p.stock > 0 && p.active,
                        };
                        return (
                            <ProductCard
                                key={p.id}
                                product={mappedProduct}
                                onAddToCart={handleAddToCart}
                            />
                        );
                    })}
                </div>
            )}
        </main>
    );
}

export default Products;
