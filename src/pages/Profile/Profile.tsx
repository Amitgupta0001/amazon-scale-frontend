import "./Profile.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import orderService from "../../services/order/orderService";
import wishlistService from "../../services/wishlist/wishlistService";

function Profile() {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();
    const [orderCount, setOrderCount] = useState<number>(0);
    const [wishlistCount, setWishlistCount] = useState<number>(0);

    useEffect(() => {
        if (auth.isAuthenticated) {
            const userId = auth.user?.id || 1;
            orderService.getOrders(userId)
                .then((orders) => setOrderCount(orders.length))
                .catch(() => {});

            wishlistService.getUserWishlists()
                .then((lists) => setWishlistCount(lists.length))
                .catch(() => {});
        }
    }, [auth.isAuthenticated, auth.user]);

    if (!auth.isAuthenticated || !auth.user) {
        return (
            <main className="page-state page-state--profile" style={{ padding: "3rem", textAlign: "center" }}>
                <h2>Sign in to view your Profile</h2>
                <p style={{ margin: "1rem 0" }}>Manage your account settings and preferences.</p>
                <Link to="/login" className="page-state__button page-state__button--primary">
                    Sign In Now
                </Link>
            </main>
        );
    }

    return (
        <main className="page-state page-state--profile" style={{ padding: "2rem 1rem", maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "10px", padding: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
                    <div style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        background: "var(--color-primary, #ff9900)",
                        color: "#111",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        {auth.user.firstName ? auth.user.firstName.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: "1.8rem" }}>
                            {auth.user.firstName} {auth.user.lastName}
                        </h1>
                        <div style={{ color: "#666", fontSize: "0.95rem" }}>{auth.user.email}</div>
                        <span style={{
                            display: "inline-block",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "4px",
                            background: "#e3f2fd",
                            color: "#1565c0",
                            fontSize: "0.8rem",
                            fontWeight: "bold",
                            marginTop: "0.5rem"
                        }}>
                            {auth.user.role || "CUSTOMER"}
                        </span>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
                    <Link to="/orders" style={{ textDecoration: "none" }}>
                        <div style={{ background: "#f9f9f9", padding: "1.5rem", borderRadius: "8px", border: "1px solid #eee", textAlign: "center" }}>
                            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#111" }}>{orderCount}</div>
                            <div style={{ color: "#666", marginTop: "0.25rem" }}>Total Orders</div>
                        </div>
                    </Link>

                    <Link to="/wishlist" style={{ textDecoration: "none" }}>
                        <div style={{ background: "#f9f9f9", padding: "1.5rem", borderRadius: "8px", border: "1px solid #eee", textAlign: "center" }}>
                            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#111" }}>{wishlistCount}</div>
                            <div style={{ color: "#666", marginTop: "0.25rem" }}>Wishlist Collections</div>
                        </div>
                    </Link>
                </div>

                <div style={{ borderTop: "1px solid #eee", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Link to="/settings" style={{ color: "#0066c0", fontWeight: 600 }}>Account Settings →</Link>
                    <button
                        onClick={() => {
                            logout();
                            navigate("/");
                        }}
                        style={{
                            padding: "0.6rem 1.5rem",
                            background: "#ffebee",
                            color: "#c62828",
                            border: "1px solid #c62828",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: 600
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Profile;
