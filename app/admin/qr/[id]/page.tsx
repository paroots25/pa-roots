"use client";

import { useParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

export default function AdminQRPage() {
  const params = useParams();
  const id = params.id as string;

  const [link, setLink] = useState<string | null>(null);

  /* build plant memory link safely */
  useEffect(() => {
    if (typeof window !== "undefined" && id) {
      setLink(`${window.location.origin}/plant/${id}`);
    }
  }, [id]);

  return (
    <div style={page}>
      <h1 style={title}>Plant QR Code 🌿</h1>

      <p style={subtitle}>
        Print this QR and attach it to the physical plant.
      </p>

      {/* 🔄 loading state */}
      {!link && <p style={{ marginTop: 20 }}>Generating QR...</p>}

      {/* ✅ QR always shows when link ready */}
      {link && (
        <>
          <div style={qrWrap}>
            <QRCodeCanvas value={link} size={240} />
          </div>

          <a
            href={link}
            target="_blank"
            style={{
              display: "block",
              marginTop: 12,
              fontWeight: "bold",
              color: "#166534",
              wordBreak: "break-all",
              textDecoration: "underline",
            }}
          >
            Open Memory Page 🌿
          </a>

          <button onClick={() => window.print()} style={printBtn}>
            Print QR Sticker 🖨️
          </button>
        </>
      )}
    </div>
  );
}

/* styles */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#ecfdf5",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: 20,
};

const title: React.CSSProperties = {
  fontSize: 32,
  color: "#14532d",
};

const subtitle: React.CSSProperties = {
  marginTop: 10,
  color: "#374151",
};

const qrWrap: React.CSSProperties = {
  marginTop: 30,
};

const printBtn: React.CSSProperties = {
  marginTop: 24,
  padding: "12px 22px",
  background: "#14532d",
  color: "white",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
};