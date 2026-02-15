"use client";

import { useParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

export default function QRPage() {
  const params = useParams();
  const id = params.id as string;

  const [link, setLink] = useState("");

  useEffect(() => {
    if (id) {
      setLink(`${window.location.origin}/plant/${id}`);
    }
  }, [id]);

  return (
    <div style={page}>
      <h1 style={title}>Your Plant QR 🌿</h1>

      {link && (
        <div style={qrWrap}>
          <QRCodeCanvas value={link} size={240} />
        </div>
      )}

      <p style={note}>
        Scan this QR anytime to view your memory page.
      </p>
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
  fontSize: 28,
  color: "#14532d",
};

const qrWrap: React.CSSProperties = {
  marginTop: 20,
};

const note: React.CSSProperties = {
  marginTop: 12,
  color: "#374151",
};