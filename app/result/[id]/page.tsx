"use client";

import { useParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";

export default function AdminResultPage() {
  const params = useParams();
  const id = params.id as string;

  // build plant memory link
  const link =
    typeof window !== "undefined"
      ? `${window.location.origin}/plant/${id}`
      : "";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ecfdf5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: 20,
      }}
    >
      {/* 🌿 Title */}
      <h1 style={{ fontSize: 34, color: "#14532d" }}>
        Plant QR Ready
      </h1>

      {/* ❤️ Emotional line */}
      <p style={{ marginTop: 10, color: "#374151", maxWidth: 420 }}>
        This QR connects love to life.  
        Place it near the plant and let memories grow forever.
      </p>

      {/* 📱 QR Code */}
      <div style={{ marginTop: 30 }}>
        {link && <QRCodeCanvas value={link} size={220} />}
      </div>

      {/* 🔗 Memory link */}
      <p
        style={{
          marginTop: 20,
          fontWeight: "bold",
          color: "#166534",
          wordBreak: "break-all",
          maxWidth: 420,
        }}
      >
        {link}
      </p>

      {/* 📩 NEW — Email instruction */}
      <p
        style={{
          marginTop: 20,
          fontSize: 15,
          color: "#374151",
          maxWidth: 420,
          lineHeight: 1.5,
        }}
      >
        📩 Check your email to receive your plant login username and temporary
        password.  
        <br />
        Please reply to the email with your delivery address so we can send your
        living memory plant to you.
      </p>

      {/* 🖨️ Print button */}
      <button
        onClick={() => window.print()}
        style={{
          marginTop: 30,
          padding: "12px 22px",
          background: "#14532d",
          color: "white",
          border: "none",
          borderRadius: 10,
          cursor: "pointer",
          fontSize: 15,
        }}
      >
        Print QR Sticker
      </button>
    </div>
  );
}
