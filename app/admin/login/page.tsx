"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert("Invalid login ❌");
        setLoading(false);
        return;
      }

      router.push("/admin/analytics");
      router.refresh();
    } catch (err) {
      alert("Something went wrong ❌");
    }

    setLoading(false);
  }

  return (
    <div style={page}>
      <form onSubmit={handleLogin} style={card}>
        <h1 style={title}>Admin Login 🔐</h1>

        <input
          type="email"
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={input}
        />

        <button type="submit" disabled={loading} style={btn}>
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
    </div>
  );
}

/* styles same as yours */

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
  width: 320,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const title: React.CSSProperties = {
  color: "#166534",
  marginBottom: 20,
};

const input: React.CSSProperties = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #ccc",
};

const btn: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "none",
  background: "#166534",
  color: "white",
  cursor: "pointer",
};