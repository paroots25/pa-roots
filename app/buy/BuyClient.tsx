"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function BuyPage() {
  const router = useRouter();
  const params = useSearchParams();

  const plantType = params.get("type");

  const plantPrices: Record<string, { name: string; price: number }> = {
    "peace-lily": { name: "Peace Lily", price: 749 },
    "snake-plant": { name: "Snake Plant", price: 449 },
    "areca-palm": { name: "Areca Palm", price: 1 },
    birkin: { name: "Philodendron Birkin", price: 599 },
    "white-princess": { name: "Philodendron White Princess", price: 1099 },
    "peperomia-lime": { name: "Peperomia Obtusifolia Lime", price: 449 },
    "peperomia-silver": { name: "Peperomia Silver Ripple", price: 449 },
    "christmas-cactus": { name: "Christmas Cactus", price: 699 },
    ZZZ: { name: "Zamioculcas(ZZ)", price: 799 },
    zz: { name: "Zamioculcas(ZZ) Premium", price: 1299 },
    "Imperial-Green": { name: "Imperial Green", price: 849 },
    "Aglaonema-Thai": { name: "Aglaonema Thai", price: 1399 },
    "Aglaonema-Lipstick": { name: "Aglaonema Lipstick", price: 949 },
    Succulent: { name: "Succulent", price: 549 },
    Calathea: { name: "Calathea", price: 599 },
    Syngonium: { name: "Syngonium", price: 429 },
    Cactus: { name: "Cactus", price: 499 },
    Cana: { name: "Cana", price: 449 },
    "Aptenia-Variegated": { name: "Aptenia Variegated", price: 649 },
    rose: { name: "Rose", price: 349 },
    "Red gerbera": { name: "Red Gerbera", price: 399 },
    "Pink gerbera": { name: "Pink Gerbera", price: 399 },
    "Yellow gerbera": { name: "Yellow Gerbera", price: 399 },
    "White gerbera": { name: "White Gerbera", price: 399 },
    "Orange gerbera": { name: "Orange Gerbera", price: 399 },
    portulaca: { name: "Portulaca Moss Rose", price: 399 },
    crossandra: { name: "Crossandra", price: 399 },
    jasmine: { name: "Arabian Jasmine", price: 399 },
    gardenia: { name: "Gardenia", price: 399 },
    "Yellow kalanchoe": { name: "Yellow Kalanchoe", price: 549 },
    "Pink kalanchoe": { name: "Pink Kalanchoe", price: 549 },
    bonsai: { name: "Bonsai Tree", price: 999 },
    orchid: { name: "Dendrobium Orchid", price: 1049 },
    bird: { name: "Bird of Paradise", price: 799 },
    adenium: { name: "Desert Rose (Adenium)", price: 799 },
    "orange-philo": { name: "Philodendron Prince of Orange", price: 849 },
  };

  const selectedPlant = plantType ? plantPrices[plantType] : null;

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // ✅ NEW
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  function handleAddToCart() {
    if (!name || !message || !email || !phone || !location || !selectedPlant) {
      alert("Please fill all fields and select a plant");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("pa_roots_cart") || "[]");

    cart.push({
      plant_type: plantType,
      plantName: name,
      message,
      email,
      phone, // ✅ NEW
      location,
      price: selectedPlant.price,
      nameLabel: selectedPlant.name,
    });

    localStorage.setItem("pa_roots_cart", JSON.stringify(cart));
    alert("Added to cart 🛒");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !message || !email || !phone || !location || !selectedPlant) {
      alert("Please fill all fields and select a plant");
      return;
    }

    setLoading(true);

    try {
      const plantRes = await fetch("/api/create-plant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          message,
          email,
          phone, // ✅ NEW
          location,
          plant_type: plantType,
        }),
      });

      const plantData = await plantRes.json();
      if (!plantRes.ok) throw new Error("Plant creation failed");

      const plantId = plantData.plant.id;

      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedPlant.price }),
      });

      const order = await orderRes.json();
      if (!orderRes.ok) throw new Error("Order creation failed");

      if (!(window as any).Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        await new Promise((res) => (script.onload = res));
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "PA Roots",
        description: `MemoryPlantsCheckout ${selectedPlant.name}`,
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

        prefill: { email, contact: phone }, // ✅ Razorpay phone autofill
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
      <form onSubmit={handleSubmit} style={form}>
        <h1 style={title}>Buy Your Memory Plant 🌱</h1>

        <p style={costInfo}>
          All costs including packaging & shipping are already included.
          No extra charges needed.
          Free Pots are Included
        </p>

        {selectedPlant && (
          <p style={selectedPlantText}>
            {selectedPlant.name} — ₹{selectedPlant.price}
          </p>
        )}

        <input placeholder="Plant name" value={name} onChange={(e) => setName(e.target.value)} required style={input} />

        <textarea placeholder="Memory message" value={message} onChange={(e) => setMessage(e.target.value)} required style={{ ...input, minHeight: 90 }} />

        <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required style={input} />

        {/* ✅ NEW PHONE FIELD */}
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={input}
        />

        <input placeholder="Delivery location" value={location} onChange={(e) => setLocation(e.target.value)} required style={input} />

        <button type="button" onClick={handleAddToCart} style={button}>
          Add to Cart 🛒
        </button>

        <button type="submit" disabled={loading} style={{ ...button, marginTop: 12 }}>
          {loading ? "Processing..." : "Pay & Create Plant"}
        </button>
      </form>
    </div>
  );
}

/* styles unchanged */
const page = { minHeight: "100vh", background: "#ecfdf5", display: "flex", justifyContent: "center", alignItems: "center" };
const form = { background: "white", padding: 30, borderRadius: 16, width: 360, boxShadow: "0 10px 25px rgba(0,0,0,0.08)" };
const title = { color: "#166534", marginBottom: 10 };
const costInfo = { fontSize: 13, color: "#065f46", background: "#d1fae5", padding: "8px 12px", borderRadius: 8, marginBottom: 14, textAlign: "center" as const };
const selectedPlantText = { marginBottom: 12, fontWeight: "bold", color: "#14532d" };
const input = { width: "100%", padding: 12, marginBottom: 12, borderRadius: 8, border: "1px solid #ccc" };
const button = { width: "100%", padding: 14, borderRadius: 10, border: "none", background: "#166534", color: "white", fontSize: 16, cursor: "pointer" };