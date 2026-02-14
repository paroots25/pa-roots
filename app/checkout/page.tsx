"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  /* 🛒 Load cart */
  useEffect(() => {
    const stored = localStorage.getItem("pa_roots_cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  /* 💰 Total price */
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  /* 💳 HANDLE PAYMENT */
  async function handlePayment() {
    if (cart.length === 0) return;

    setLoading(true);

    try {
      /* 1️⃣ Create order + plants together */
      const orderRes = await fetch("/api/create-order-with-plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plants: cart,
          email: cart[0]?.email || "",
        }),
      });

      const data = await orderRes.json();
      if (!orderRes.ok) throw new Error("Order creation failed");

      const { order, plantIds } = data;

      /* 2️⃣ Load Razorpay safely */
      if (!(window as any).Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        await new Promise((res) => {
          script.onload = res;
        });
      }

      /* 3️⃣ Razorpay payment */
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "PA Roots",
        description: "Memory Plants Checkout",
        order_id: order.id,

        handler: async function (response: any) {
          /* 4️⃣ Verify payment for MULTIPLE plants */
          const verifyRes = await fetch("/api/verify-payment-with-plants", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plantIds,
            }),
          });

          if (!verifyRes.ok) {
            alert("Payment verification failed ❌");
            return;
          }

          /* ✅ SAVE IDS FOR MULTI-QR RESULT PAGE */
          sessionStorage.setItem(
            "pa_roots_last_order",
            JSON.stringify(plantIds)
          );

          /* 🧹 Clear cart */
          localStorage.removeItem("pa_roots_cart");

          /* 🚀 Redirect to multi-order result */
          router.push(`/order-result/${plantIds[0]}`);
        },

        theme: { color: "#166534" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }

    setLoading(false);
  }

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>Checkout 🌱</h1>

        {cart.length === 0 && <p>Your cart is empty.</p>}

        {cart.map((item, i) => (
          <div key={i} style={row}>
            <span>{item.nameLabel || item.name}</span>
            <span>₹{item.price}</span>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <h2 style={totalText}>Total: ₹{total}</h2>

            <button onClick={handlePayment} disabled={loading} style={btn}>
              {loading ? "Processing..." : "Pay Now 💳"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#ecfdf5",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card: React.CSSProperties = {
  background: "white",
  padding: 30,
  borderRadius: 16,
  width: 360,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const title: React.CSSProperties = {
  color: "#166534",
  marginBottom: 20,
};

const row: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #eee",
};

const totalText: React.CSSProperties = {
  marginTop: 20,
  fontSize: 20,
  color: "#14532d",
};

const btn: React.CSSProperties = {
  width: "100%",
  marginTop: 20,
  padding: 14,
  borderRadius: 10,
  border: "none",
  background: "#166534",
  color: "white",
  fontSize: 16,
  cursor: "pointer",
};