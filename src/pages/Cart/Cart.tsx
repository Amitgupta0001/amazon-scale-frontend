import "./Cart.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartService from "../../services/cart/cartService";
import orderService from "../../services/order/orderService";
import useAuth from "../../hooks/useAuth";
import type { CartResponse } from "../../types/api";

function CartPage() {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [cart, setCart] = useState<CartResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [shippingAddress, setShippingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"CREDIT_CARD" | "DEBIT_CARD" | "UPI" | "NET_BANKING" | "CASH_ON_DELIVERY">("CREDIT_CARD");
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const fetchCart = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await cartService.getCart();
            setCart(data);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to fetch cart";
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (auth.isAuthenticated) {
            fetchCart();
        } else {
            setIsLoading(false);
        }
    }, [auth.isAuthenticated]);

    const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        try {
            const updated = await cartService.updateCartItem(productId, { quantity: newQuantity });
            setCart(updated);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to update quantity";
            setNotification(`Error: ${msg}`);
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleRemoveItem = async (productId: number) => {
        try {
            await cartService.removeCartItem(productId);
            await fetchCart();
            setNotification("Item removed from cart");
            setTimeout(() => setNotification(null), 3000);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to remove item";
            setNotification(`Error: ${msg}`);
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleClearCart = async () => {
        try {
            await cartService.clearCart();
            await fetchCart();
            setNotification("Cart cleared");
            setTimeout(() => setNotification(null), 3000);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to clear cart";
            setNotification(`Error: ${msg}`);
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!shippingAddress.trim()) {
            setNotification("Please provide a shipping address.");
            return;
        }

        const userId = auth.user?.id || cart?.userId || 1;
        setIsPlacingOrder(true);
        try {
            await orderService.placeOrder(userId, {
                shippingAddress,
                paymentMethod,
            });
            setNotification("Order placed successfully!");
            setTimeout(() => navigate("/orders"), 1500);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to place order";
            setNotification(`Order Error: ${msg}`);
            setTimeout(() => setNotification(null), 4000);
        } finally {
            setIsPlacingOrder(false);
        }
    };

    if (!auth.isAuthenticated) {
        return (
            <main className="page-state page-state--cart" style={{ padding: "3rem", textAlign: "center" }}>
                <h2>Sign in to view your cart</h2>
                <p style={{ margin: "1rem 0" }}>Your shopping cart is synchronized with your AmazonScale account.</p>
                <Link to="/login" className="page-state__button page-state__button--primary">
                    Sign In Now
                </Link>
            </main>
        );
    }

    return (
        <main className="page-state page-state--cart" style={{ padding: "2rem 1rem", maxWidth: "1200px", margin: "0 auto" }}>
            <h1 id="cart-page-title" className="page-state__title" style={{ marginBottom: "1rem" }}>
                Shopping Cart
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
                <div style={{ padding: "3rem", textAlign: "center" }}>Loading cart items from backend...</div>
            ) : error ? (
                <div style={{ padding: "3rem", textAlign: "center", color: "#d32f2f" }}>
                    <p>{error}</p>
                    <button onClick={fetchCart} style={{ marginTop: "1rem", padding: "0.5rem 1.5rem", cursor: "pointer" }}>Retry</button>
                </div>
            ) : !cart || cart.items.length === 0 ? (
                <div style={{ padding: "3rem", textAlign: "center", background: "#f9f9f9", borderRadius: "8px" }}>
                    <h2>Your Cart is Empty</h2>
                    <p style={{ margin: "1rem 0" }}>Explore our catalog to add items to your cart.</p>
                    <Link to="/products" className="page-state__button page-state__button--primary">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
                    <div style={{ flex: "2" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                            <h3>Cart Items ({cart.totalItems})</h3>
                            <button onClick={handleClearCart} style={{ color: "#d32f2f", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
                                Clear Cart
                            </button>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {cart.items.map((item) => (
                                <div key={item.id} style={{
                                    display: "flex",
                                    gap: "1rem",
                                    padding: "1rem",
                                    border: "1px solid #eee",
                                    borderRadius: "8px",
                                    background: "#fff",
                                    alignItems: "center"
                                }}>
                                    {item.imageUrl && (
                                        <img src={item.imageUrl} alt={item.productName} style={{ width: "80px", height: "80px", objectFit: "contain" }} />
                                    )}
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: "0 0 0.5rem 0" }}>{item.productName}</h4>
                                        <div style={{ fontWeight: "bold", color: "#111" }}>${item.productPrice?.toFixed(2)}</div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                                            style={{ padding: "0.2rem 0.6rem", cursor: "pointer" }}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                                            style={{ padding: "0.2rem 0.6rem", cursor: "pointer" }}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div style={{ fontWeight: "bold", minWidth: "70px", textAlign: "right" }}>
                                        ${item.itemTotal?.toFixed(2)}
                                    </div>
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
                    </div>

                    <div style={{ background: "#f9f9f9", padding: "1.5rem", borderRadius: "8px", border: "1px solid #e0e0e0", height: "fit-content" }}>
                        <h3 style={{ marginBottom: "1rem" }}>Order Summary</h3>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                            <span>Total Items:</span>
                            <span>{cart.totalItems}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: "bold" }}>
                            <span>Total Amount:</span>
                            <span>${cart.totalAmount?.toFixed(2)}</span>
                        </div>

                        <form onSubmit={handlePlaceOrder}>
                            <div style={{ marginBottom: "1rem" }}>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Shipping Address</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                    placeholder="Enter complete shipping address"
                                    style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
                                />
                            </div>

                            <div style={{ marginBottom: "1.5rem" }}>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Payment Method</label>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                                    style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
                                >
                                    <option value="CREDIT_CARD">Credit Card</option>
                                    <option value="DEBIT_CARD">Debit Card</option>
                                    <option value="UPI">UPI</option>
                                    <option value="NET_BANKING">Net Banking</option>
                                    <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={isPlacingOrder}
                                style={{
                                    width: "100%",
                                    padding: "0.8rem",
                                    background: "var(--color-primary, #ff9900)",
                                    color: "#111",
                                    fontWeight: "bold",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer"
                                }}
                            >
                                {isPlacingOrder ? "Placing Order..." : "Proceed to Checkout"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}

export default CartPage;
