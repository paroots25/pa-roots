"use client";

import { useState } from "react";

export default function BulkOrdersPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    plantType: "",
    quantity: "",
    eventDate: "",
    location: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const mailBody = `
Name: ${form.name}
Company/Event: ${form.company}
Phone: ${form.phone}
Email: ${form.email}
Plant Type: ${form.plantType}
Quantity: ${form.quantity}
Event Date: ${form.eventDate}
Location: ${form.location}
Message: ${form.message}
`;

    window.location.href = `mailto:growwithparoots@gmail.com?subject=Bulk Order Inquiry&body=${encodeURIComponent(mailBody)}`;
  }

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>Bulk Memory Plant Orders 🌿</h1>

        <p style={subtitle}>
          Perfect for corporate gifting, weddings, college events, and special occasions.
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: 30 }}>
          <input name="name" placeholder="Your Name" required style={input} onChange={handleChange} />
          <input name="company" placeholder="Company / Event Name" required style={input} onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" required style={input} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" required style={input} onChange={handleChange} />

          <select name="plantType" required style={input} onChange={handleChange}>
            <option value="">Select Plant Type</option>
            <option>Peace Lily</option>
            <option>Snake Plant</option>
            <option>Areca Palm</option>
            <option>Philodendron Birkin</option>
            <option>Philodendron Birkin</option>
            <option>Philodendron White Princess</option>
            <option>Peperomia Obtusifolia Lime</option>
            <option>Peperomia Silver Ripple</option>
            <option>Christmas Cactus</option>
            <option>Zamioculcas(ZZ)</option>
            <option>Imperial Green</option>
            <option>Aglaonema Thai</option>
            <option>Aglaonema Lipstick</option>
            <option>Succulent</option>
            <option>Calathea</option>
            <option>Syngonium</option>
            <option>Cactus</option>
            <option>Rose</option>
            <option>Red Gerbera</option>
            <option>Pink Gerbera</option>
            <option>Yellow Gerbera</option>
            <option>White Gerbera</option>
            <option>Orange Gerbera</option>
            <option>Portulaca Moss Rose</option>
            <option>Crossandra</option>
            <option>Arabian Jasmine</option>
            <option>Gardenia</option>
            <option>Yellow Kalanchoe</option>
            <option>Pink Kalanchoe</option>
            <option>Cana</option>
            <option>Aptenia Variegated</option>
            <option>Bonsai Tree</option>
            <option>Dendrobium Orchid</option>
            <option>Bird of Paradise</option>
            <option>Desert Rose (Adenium)</option>
            <option>Zamioculcas(ZZ) Premium</option>
            <option>Philodendron Prince of Orange</option>
            
          </select>

          <input name="quantity" type="number" placeholder="Quantity (Minimum 25)" required style={input} onChange={handleChange} />
          <input name="eventDate" type="date" required style={input} onChange={handleChange} />
          <input name="location" placeholder="Delivery Location" required style={input} onChange={handleChange} />

          <textarea
            name="message"
            placeholder="Additional Requirements (Customization, Branding, Special Instructions)"
            rows={4}
            style={input}
            onChange={handleChange}
          />

          <button type="submit" style={button}>
            Request Bulk Quote 🌱
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom right, #ecfdf5, #f0fdf4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
};

const card: React.CSSProperties = {
  background: "white",
  padding: 40,
  borderRadius: 20,
  maxWidth: 500,
  width: "100%",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
};

const title: React.CSSProperties = {
  fontSize: 32,
  color: "#14532d",
  textAlign: "center",
};

const subtitle: React.CSSProperties = {
  marginTop: 10,
  fontSize: 16,
  color: "#374151",
  textAlign: "center",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: 12,
  marginBottom: 15,
  borderRadius: 8,
  border: "1px solid #ccc",
};

const button: React.CSSProperties = {
  width: "100%",
  padding: 14,
  background: "#166534",
  color: "white",
  border: "none",
  borderRadius: 10,
  fontSize: 16,
  cursor: "pointer",
};