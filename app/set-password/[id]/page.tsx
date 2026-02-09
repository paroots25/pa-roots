"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match ❌");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/set-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to set password ❌");
      return;
    }

    alert("Your memory is now protected 🌿");

    router.push(`/dashboard/${id}`);
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
        onSubmit={handleSetPassword}
        style={{
          background: "white",
          padding: 40,
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          width: 340,
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#166534", fontSize: 22 }}>
          Create a secret key to protect your memory 🌿
        </h1>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
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
          {loading ? "Saving..." : "Protect Memory"}
        </button>
      </form>
    </div>
  );
}
