"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function BuyPage() {
  const router = useRouter();
  const params = useSearchParams();

  const plantType = params.get("type");

  const plantPrices: Record<string, { name: string; price: number }> = {
    "red-gerbera": { name: "Red Gerbera", price: 399 },
    "pink-gerbera": { name: "Pink Gerbera", price: 349 },
    "yellow-gerbera": { name: "Yellow Gerbera", price: 349 },
    "white-gerbera": { name: "White Gerbera", price: 399 },
    "orange-gerbera": { name: "Orange Gerbera", price: 349 },
    "red-rose": { name: "Red Rose", price: 449 },
    "yellow-chrysanthemum": { name: "Yellow Chrysanthemum", price: 299 },
    "white-chrysanthemum": { name: "White Chrysanthemum", price: 299 },
    "pink-chrysanthemum": { name: "Pink Chrysanthemum", price: 299 },
    "money-plant": { name: "Money Plant", price: 349 },
  };

  const selectedPlant = plantType ? plantPrices[plantType] : null;

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !message || !email || !selectedPlant) {
      alert("Please fill all fields and select a plant");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create plant in DB
      const plantRes = await fetch("/api/create-plant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          message,
          email,
          plant_type: plantType,
        }),
      });

      const plantData = await plantRes.json();

      if (!plantRes.ok) throw new Error("Plant creation failed");

      const plantId = plantData.plant.id;

      // 2️⃣ Create Razorpay order with correct amount
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedPlant.price }),
      });

      const order = await orderRes.json();

      if (!orderRes.ok) throw new Error("Order creation failed");

      // 3️⃣ Load Razorpay
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "PA Roots",
          description: `Advance for ${selectedPlant.name}`,
          order_id: order.id,

          handler: async function (response: any) {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plantId,
              }),
            });

            if (!verifyRes.ok) {
              alert("Payment verification failed ❌");
              return;
            }

            router.push(`/result/${plantId}`);
          },

          prefill: { email },
          theme: { color: "#166534" },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };

      document.body.appendChild(script);
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }

    setLoading(false);
  }

  return (
    <div style={page}>
      <form onSubmit={handleSubmit} style={form}>
        <h1 style={title}>Buy Your Memory Plant 🌱</h1>

        {selectedPlant && (
          <p style={selectedPlantText}>
            {selectedPlant.name} — ₹{selectedPlant.price}
          </p>
        )}

        <input
          placeholder="Plant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={input}
        />

        <textarea
          placeholder="Memory message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{ ...input, minHeight: 90 }}
        />

        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={input}
        />

        <button type="submit" disabled={loading} style={button}>
          {loading ? "Processing..." : "Pay & Create Plant"}
        </button>
      </form>
    </div>
  );
}

/* styles */
const page = {
  minHeight: "100vh",
  background: "#ecfdf5",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const form = {
  background: "white",
  padding: 30,
  borderRadius: 16,
  width: 360,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const title = { color: "#166534", marginBottom: 20 };

const selectedPlantText = {
  marginBottom: 12,
  fontWeight: "bold",
  color: "#14532d",
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #ccc",
};

const button = {
  width: "100%",
  padding: 14,
  borderRadius: 10,
  border: "none",
  background: "#166534",
  color: "white",
  fontSize: 16,
  cursor: "pointer",
};
