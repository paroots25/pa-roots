"use client";

import { useParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";

export default function PrintQRPage() {
  const params = useParams();
  const id = params.id as string;

  const link =
    typeof window !== "undefined"
      ? `${window.location.origin}/plant/${id}`
      : "";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "white",
      }}
    >
      <h1>Plant QR 🌱</h1>

      {link && <QRCodeCanvas value={link} size={220} />}

      <p style={{ marginTop: 20 }}>{link}</p>

      <button
        onClick={() => window.print()}
        style={{
          marginTop: 20,
          padding: "10px 16px",
          background: "#166534",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        Print QR 🖨️
      </button>
    </div>
  );
}
