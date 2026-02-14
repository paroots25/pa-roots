"use client";

import { useParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

export default function AdminResultPage() {
  const params = useParams();
  const id = params.id as string;

  const [link, setLink] = useState("");

  // ✅ Build memory link safely on client
  useEffect(() => {
    if (typeof window !== "undefined" && id) {
      setLink(`${window.location.origin}/plant/${id}`);
    }
  }, [id]);

  return (
    <div style={page}>
      {/* 🌿 Title */}
      <h1 style={title}>Plant QR Ready 🌱</h1>

      {/* ❤️ Emotional line */}
      <p style={subtitle}>
        This QR connects love to life.  
        Place it near the plant and let memories grow forever.
      </p>

      {/* 📱 QR Code */}
      {link && (
        <div style={qrWrap}>
          <QRCodeCanvas value={link} size={220} />
        </div>
      )}

      {/* 🔗 CLICKABLE MEMORY LINK */}
      {link && (
        <a href={link} target="_blank" style={linkStyle}>
          {link}
        </a>
      )}

      {/* 📩 Email instruction */}
      <p style={emailNote}>
        📩 Check your email to receive your plant login username and temporary
        password.  
        <br />
        Please reply to the email with your delivery address so we can send your
        living memory plant to you.
        <br />
        Kindly share the payment completition SS and ur email registered with the plant to the whatsapp number 8667794361 to get live updates of ur Plant
        <br/>
        ThankYou!
      </p>

      {/* 🖨️ Print button */}
      <button onClick={() => window.print()} style={printBtn}>
        Print QR Sticker
      </button>
    </div>
  );
}

/* ---------- STYLES ---------- */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#ecfdf5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  padding: 20,
};

const title: React.CSSProperties = {
  fontSize: 34,
  color: "#14532d",
};

const subtitle: React.CSSProperties = {
  marginTop: 10,
  color: "#374151",
  maxWidth: 420,
};

const qrWrap: React.CSSProperties = {
  marginTop: 30,
};

const linkStyle: React.CSSProperties = {
  marginTop: 20,
  fontWeight: "bold",
  color: "#166534",
  wordBreak: "break-all",
  maxWidth: 420,
  textDecoration: "underline",
};

const emailNote: React.CSSProperties = {
  marginTop: 20,
  fontSize: 15,
  color: "#374151",
  maxWidth: 420,
  lineHeight: 1.5,
};

const printBtn: React.CSSProperties = {
  marginTop: 30,
  padding: "12px 22px",
  background: "#14532d",
  color: "white",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  fontSize: 15,
};