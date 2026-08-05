import "./Wishlist.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import wishlistService from "../../services/wishlist/wishlistService";
import cartService from "../../services/cart/cartService";
import useAuth from "../../hooks/useAuth";
import type { WishlistResponse, WishlistSummaryResponse } from "../../types/api";

function Wishlist() {
    const { auth } = useAuth();
    const [wishlists, setWishlists] = useState<WishlistSummaryResponse[]>([]);
    const [selectedWishlist, setSelectedWishlist] = useState<WishlistResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newWishlistName, setNewWishlistName] = useState("");
    const [notification, setNotification] = useState<string | null>(null);

    const fetchWishlists = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const list = await wishlistService.getUserWishlists();
            setWishlists(list);
            if (list.length > 0) {
                const detailed = await wishlistService.getWishlist(list[0].id);
                setSelectedWishlist(detailed);
            } else {
                setSelectedWishlist(null);
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to load wishlists";
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (auth.isAuthenticated) {
            fetchWishlists();
        } else {
            setIsLoading(false);
        }
    }, [auth.isAuthenticated]);

    const handleSelectWishlist = async (id: number) => {
        try {
            const detailed = await wishlistService.getWishlist(id);
            setSelectedWishlist(detailed);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Error loading wishlist";
            setNotification(msg);
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleCreateWishlist = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newWishlistName.trim()) return;
        try {
            await wishlistService.createWishlist({ name: newWishlistName });
            setNewWishlistName("");
            await fetchWishlists();
            setNotification("Wishlist created!");
            setTimeout(() => setNotification(null), 3000);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Could not create wishlist";
            setNotification(`Error: ${msg}`);
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleRemoveItem = async (productId: number) => {
        if (!selectedWishlist) return;
        try {
            await wishlistService.removeItem(selectedWishlist.id, productId);
            const updated = await wishlistService.getWishlist(selectedWishlist.id);
            setSelectedWishlist(updated);
            setNotification("Item removed from wishlist");
            setTimeout(() => setNotification(null), 3000);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to remove item";
            setNotification(`Error: ${msg}`);
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleMoveToCart = async (productId: number) => {
        try {
            await cartService.addItemToCart({ productId, quantity: 1 });
            if (selectedWishlist) {
                await wishlistService.removeItem(selectedWishlist.id, productId);
                const updated = await wishlistService.getWishlist(selectedWishlist.id);
                setSelectedWishlist(updated);
            }
            setNotification("Item moved to cart!");
            setTimeout(() => setNotification(null), 3000);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Could not move to cart";
            setNotification(`Error: ${msg}`);
            setTimeout(() => setNotification(null), 3000);
        }
    };

    if (!auth.isAuthenticated) {
        return (
            <main className="page-state page-state--wishlist" style={{ padding: "3rem", textAlign: "center" }}>
                <h2>Sign in to view your Wishlists</h2>
                <p style={{ margin: "1rem 0" }}>Save your favorite items directly to your backend AmazonScale wishlist.</p>
                <Link to="/login" className="page-state__button page-state__button--primary">
                    Sign In Now
                </Link>
            </main>
        );
    }

    return (
        <main className="page-state page-state--wishlist" style={{ padding: "2rem 1rem", maxWidth: "1200px", margin: "0 auto" }}>
            <h1 id="wishlist-page-title" className="page-state__title" style={{ marginBottom: "1rem" }}>
                Your Wishlists
            </h1>

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

            {isLoading ? (
                <div style={{ padding: "3rem", textAlign: "center" }}>Loading wishlists from backend...</div>
            ) : error ? (
                <div style={{ padding: "3rem", textAlign: "center", color: "#d32f2f" }}>
                    <p>{error}</p>
                    <button onClick={fetchWishlists} style={{ marginTop: "1rem", padding: "0.5rem 1.5rem", cursor: "pointer" }}>Retry</button>
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                    <div>
                        <div style={{ background: "#f9f9f9", padding: "1.5rem", borderRadius: "8px", border: "1px solid #eee", marginBottom: "1.5rem" }}>
                            <h3>Create New Wishlist</h3>
                            <form onSubmit={handleCreateWishlist} style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
                                <input
                                    type="text"
                                    placeholder="Wishlist name..."
                                    value={newWishlistName}
                                    onChange={(e) => setNewWishlistName(e.target.value)}
                                    style={{ flex: 1, padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
                                />
                                <button type="submit" style={{ padding: "0.5rem 1rem", background: "var(--color-primary, #ff9900)", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                                    Create
                                </button>
                            </form>
                        </div>

                        <h3>Your Collections</h3>
                        {wishlists.length === 0 ? (
                            <p style={{ marginTop: "0.5rem", color: "#666" }}>No wishlists created yet.</p>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
                                {wishlists.map((w) => (
                                    <button
                                        key={w.id}
                                        onClick={() => handleSelectWishlist(w.id)}
                                        style={{
                                            padding: "0.8rem 1rem",
                                            textAlign: "left",
                                            borderRadius: "6px",
                                            border: "1px solid #ddd",
                                            background: selectedWishlist?.id === w.id ? "#fff3e0" : "#fff",
                                            borderColor: selectedWishlist?.id === w.id ? "#ff9900" : "#ddd",
                                            cursor: "pointer",
                                            fontWeight: selectedWishlist?.id === w.id ? "bold" : "normal"
                                        }}
                                    >
                                        {w.name} ({w.totalItems} items) {w.isDefault && <span style={{ fontSize: "0.75rem", color: "#666" }}>(Default)</span>}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={{ flex: 2 }}>
                        {selectedWishlist ? (
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                    <h2>{selectedWishlist.name}</h2>
                                    <span style={{ color: "#666" }}>{selectedWishlist.totalItems} items</span>
                                </div>

                                {selectedWishlist.items.length === 0 ? (
                                    <div style={{ padding: "3rem", textAlign: "center", background: "#f9f9f9", borderRadius: "8px" }}>
                                        <p>This wishlist has no items yet.</p>
                                        <Link to="/products" className="page-state__button page-state__button--primary" style={{ marginTop: "1rem", display: "inline-block" }}>
                                            Browse Catalog
                                        </Link>
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                        {selectedWishlist.items.map((item) => (
                                            <div key={item.id} style={{
                                                display: "flex",
                                                gap: "1rem",
                                                padding: "1rem",
                                                border: "1px solid #eee",
                                                borderRadius: "8px",
                                                background: "#fff",
                                                alignItems: "center"
                                            }}>
                                                {item.productImageUrl && (
                                                    <img src={item.productImageUrl} alt={item.productName} style={{ width: "70px", height: "70px", objectFit: "contain" }} />
                                                )}
                                                <div style={{ flex: 1 }}>
                                                    <h4 style={{ margin: 0 }}>{item.productName}</h4>
                                                    <div style={{ fontWeight: "bold", marginTop: "0.25rem" }}>${item.productPrice?.toFixed(2)}</div>
                                                    {item.priority && (
                                                        <span style={{ fontSize: "0.75rem", background: "#eee", padding: "0.2rem 0.5rem", borderRadius: "4px", marginTop: "0.25rem", display: "inline-block" }}>
                                                            Priority: {item.priority}
                                                        </span>
                                                    )}
                                                </div>

                                                <button
                                                    onClick={() => handleMoveToCart(item.productId)}
                                                    style={{ padding: "0.5rem 1rem", background: "var(--color-primary, #ff9900)", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
                                                >
                                                    Move to Cart
                                                </button>

                                                <button
                                                    onClick={() => handleRemoveItem(item.productId)}
                                                    style={{ background: "none", border: "none", color: "#d32f2f", cursor: "pointer", fontSize: "1.2rem", padding: "0.5rem" }}
                                                    title="Remove item"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ padding: "3rem", textAlign: "center", background: "#f9f9f9", borderRadius: "8px" }}>
                                Select a wishlist to view items.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}

export default Wishlist;
