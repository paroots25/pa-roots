"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  /* 🛒 Load cart from localStorage */
  useEffect(() => {
    const stored = localStorage.getItem("pa_roots_cart");
    if (stored) setCart(JSON.parse(stored));
  }, [open]);

  /* ❌ Remove item from cart */
  function removeItem(index: number) {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("pa_roots_cart", JSON.stringify(updated));
  }

  /* 💰 Total price */
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  /* 💳 Checkout → go to checkout page */
  function handleCheckout() {
    if (cart.length === 0) return;
    setOpen(false);
    router.push("/checkout");
  }

  return (
    <html lang="en">
      <body>
        {/* 🌿 NAVBAR */}
        <div style={navbar}>
          <h2 style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
            PA Roots 🌱
          </h2>

          {/* 🛒 CART BUTTON */}
          <button style={cartBtn} onClick={() => setOpen(true)}>
            🛒 ({cart.length})
          </button>
        </div>

        {children}

        {/* 🧊 CART DRAWER */}
        {open && (
          <>
            {/* overlay */}
            <div style={overlay} onClick={() => setOpen(false)} />

            {/* drawer */}
            <div style={drawer}>
              <h2>Your Cart 🛒</h2>

              {cart.length === 0 && (
                <p style={{ marginTop: 20 }}>No plants added yet.</p>
              )}

              {/* cart items */}
              {cart.map((item, i) => (
                <div key={i} style={cartItem}>
                  <div>
                    <p style={{ fontWeight: "bold" }}>{item.name}</p>
                    <p style={{ fontSize: 13, color: "#6b7280" }}>
                      ₹{item.price}
                    </p>
                  </div>

                  <button style={removeBtn} onClick={() => removeItem(i)}>
                    ✕
                  </button>
                </div>
              ))}

              {/* total */}
              <h3 style={{ marginTop: 20 }}>Total: ₹{total}</h3>

              {/* checkout */}
              <button style={checkoutBtn} onClick={handleCheckout}>
                Checkout 🌿
              </button>
            </div>
          </>
        )}
      </body>
    </html>
  );
}

/* ---------- styles ---------- */

const navbar: React.CSSProperties = {
  height: 60,
  background: "#166534",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
};

const cartBtn: React.CSSProperties = {
  background: "white",
  color: "#166534",
  border: "none",
  padding: "8px 14px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold",
};

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  zIndex: 40,
};

const drawer: React.CSSProperties = {
  position: "fixed",
  right: 0,
  top: 0,
  height: "100%",
  width: 320,
  background: "white",
  zIndex: 50,
  padding: 20,
  boxShadow: "-4px 0 20px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
};

const cartItem: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 12,
  paddingBottom: 10,
  borderBottom: "1px solid #eee",
};

const removeBtn: React.CSSProperties = {
  background: "transparent",
  border: "none",
  fontSize: 18,
  cursor: "pointer",
  color: "#ef4444",
};

const checkoutBtn: React.CSSProperties = {
  marginTop: "auto",
  padding: 14,
  border: "none",
  borderRadius: 10,
  background: "#166534",
  color: "white",
  fontSize: 16,
  cursor: "pointer",
};