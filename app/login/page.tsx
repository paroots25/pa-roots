"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/plant-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, password }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        alert("Invalid code or password ❌");
        setLoading(false);
        return;
      }

      // ✅ redirect to plant dashboard
      // 🔐 First login → go to set password
      if (data.firstLogin) {
        router.push(`/set-password/${data.plantId}`);
        return;
      }

// ✅ Normal login
router.push(`/dashboard/${data.plantId}`);

    } catch {
      alert("Something went wrong ❌");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ecfdf5",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: 40,
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          width: 320,
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#166534", fontSize: 24 }}>Plant Login 🌱</h1>

        <input
          placeholder="Plant Code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          required
          style={{
            width: "100%",
            padding: 10,
            marginTop: 20,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 10,
            marginTop: 12,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 20,
            width: "100%",
            padding: 12,
            background: "#166534",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
