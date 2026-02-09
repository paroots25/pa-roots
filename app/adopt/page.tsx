"use client";
import { useState } from "react";

export default function AdoptPage() {
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Plant reserved: ${name}`);
  }

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', textAlign: "center" }}>
      <h1 style={{ fontSize: 28, color: '#166534' }}>Adopt a Plant 🌱</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter plant name"
          required
          style={{
            width: '100%',
            padding: 12,
            borderRadius: 8,
            border: '1px solid #ccc'
          }}
        />

        <button
          type="submit"
          style={{
            marginTop: 12,
            width: '100%',
            padding: 12,
            background: '#166534',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          Reserve Plant
        </button>
      </form>
    </div>
  );
}
