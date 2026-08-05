import "./Orders.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import orderService from "../../services/order/orderService";
import useAuth from "../../hooks/useAuth";
import type { OrderResponse } from "../../types/api";

function OrdersPage() {
    const { auth } = useAuth();
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        const userId = auth.user?.id || 1;
        try {
            const list = await orderService.getOrders(userId);
            setOrders(list);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to load orders";
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (auth.isAuthenticated) {
            fetchOrders();
        } else {
            setIsLoading(false);
        }
    }, [auth.isAuthenticated]);

    const handleCancelOrder = async (orderId: number) => {
        const userId = auth.user?.id || 1;
        try {
            await orderService.cancelOrder(userId, orderId);
            await fetchOrders();
            setNotification(`Order #${orderId} has been cancelled.`);
            setTimeout(() => setNotification(null), 3000);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to cancel order";
            setNotification(`Error: ${msg}`);
            setTimeout(() => setNotification(null), 3000);
        }
    };

    if (!auth.isAuthenticated) {
        return (
            <main className="page-state page-state--orders" style={{ padding: "3rem", textAlign: "center" }}>
                <h2>Sign in to view your Order History</h2>
                <p style={{ margin: "1rem 0" }}>Track and manage your AmazonScale purchases.</p>
                <Link to="/login" className="page-state__button page-state__button--primary">
                    Sign In Now
                </Link>
            </main>
        );
    }

    return (
        <main className="page-state page-state--orders" style={{ padding: "2rem 1rem", maxWidth: "1000px", margin: "0 auto" }}>
            <h1 id="orders-page-title" className="page-state__title" style={{ marginBottom: "1rem" }}>
                Your Orders
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
                <div style={{ padding: "3rem", textAlign: "center" }}>Loading orders from backend...</div>
            ) : error ? (
                <div style={{ padding: "3rem", textAlign: "center", color: "#d32f2f" }}>
                    <p>{error}</p>
                    <button onClick={fetchOrders} style={{ marginTop: "1rem", padding: "0.5rem 1.5rem", cursor: "pointer" }}>Retry</button>
                </div>
            ) : orders.length === 0 ? (
                <div style={{ padding: "3rem", textAlign: "center", background: "#f9f9f9", borderRadius: "8px" }}>
                    <h2>No Orders Found</h2>
                    <p style={{ margin: "1rem 0" }}>You haven't placed any orders yet.</p>
                    <Link to="/products" className="page-state__button page-state__button--primary">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {orders.map((order) => (
                        <div key={order.id} style={{
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            background: "#fff",
                            overflow: "hidden"
                        }}>
                            <div style={{
                                background: "#f6f6f6",
                                padding: "1rem 1.5rem",
                                display: "flex",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                gap: "1rem",
                                fontSize: "0.9rem"
                            }}>
                                <div>
                                    <div style={{ color: "#666" }}>ORDER PLACED</div>
                                    <div style={{ fontWeight: 600 }}>{new Date(order.createdAt).toLocaleDateString()}</div>
                                </div>
                                <div>
                                    <div style={{ color: "#666" }}>TOTAL</div>
                                    <div style={{ fontWeight: 600 }}>${order.totalAmount?.toFixed(2)}</div>
                                </div>
                                <div>
                                    <div style={{ color: "#666" }}>SHIP TO</div>
                                    <div style={{ fontWeight: 600 }}>{order.shippingAddress || "Default Address"}</div>
                                </div>
                                <div>
                                    <div style={{ color: "#666" }}>ORDER # {order.id}</div>
                                    <div style={{
                                        display: "inline-block",
                                        padding: "0.2rem 0.6rem",
                                        borderRadius: "4px",
                                        fontWeight: "bold",
                                        fontSize: "0.8rem",
                                        background: order.orderStatus === "DELIVERED" ? "#e8f5e9" : order.orderStatus === "CANCELLED" ? "#ffebee" : "#fff3e0",
                                        color: order.orderStatus === "DELIVERED" ? "#2e7d32" : order.orderStatus === "CANCELLED" ? "#c62828" : "#e65100"
                                    }}>
                                        {order.orderStatus}
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: "1.5rem" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    {order.items.map((item) => (
                                        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed #eee", paddingBottom: "0.5rem" }}>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{item.productName}</div>
                                                <div style={{ color: "#666", fontSize: "0.85rem" }}>Qty: {item.quantity} × ${item.productPrice?.toFixed(2)}</div>
                                            </div>
                                            <div style={{ fontWeight: "bold" }}>${item.subtotal?.toFixed(2)}</div>
                                        </div>
                                    ))}
                                </div>

                                {order.orderStatus !== "CANCELLED" && order.orderStatus !== "DELIVERED" && (
                                    <div style={{ marginTop: "1rem", textAlign: "right" }}>
                                        <button
                                            onClick={() => handleCancelOrder(order.id)}
                                            style={{
                                                padding: "0.4rem 1rem",
                                                background: "#fff",
                                                color: "#c62828",
                                                border: "1px solid #c62828",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                                fontWeight: 600
                                            }}
                                        >
                                            Cancel Order
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

export default OrdersPage;
