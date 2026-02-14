"use client";

import { useEffect, useState } from "react";

type Props = {
  plantId: string;
};

export default function UploadPhotos({ plantId }: Props) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  /* 📥 Load existing photos */
  useEffect(() => {
    async function loadPhotos() {
      try {
        const res = await fetch(`/api/get-plant-photos?id=${plantId}`);
        const data = await res.json();
        if (res.ok) setPhotos(data.photos || []);
      } catch (err) {
        console.error("LOAD PHOTOS ERROR:", err);
      }
    }

    if (plantId) loadPhotos();
  }, [plantId]);

  /* 📤 Upload handler */
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    formData.append("id", plantId);

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    setLoading(true);

    try {
      const res = await fetch("/api/upload-photo", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error("Upload failed");

      setPhotos(data.photos);
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert("Photo upload failed ❌");
    }

    setLoading(false);
  }

  /* 🗑 Delete photo */
  async function handleDelete(url: string) {
    if (!confirm("Delete this photo?")) return;

    try {
      const res = await fetch("/api/delete-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: plantId, url }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error("Delete failed");

      setPhotos(data.photos);
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Delete failed ❌");
    }
  }

  return (
    <div style={wrap}>
      <h2 style={title}>Upload Memory Photos 📸</h2>

      {/* Upload input */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        style={input}
      />

      {loading && <p style={{ marginTop: 10 }}>Uploading...</p>}

      {/* Photo grid */}
      <div style={grid}>
        {photos.map((url, i) => (
          <div key={i} style={photoCard}>
            <img src={url} alt="plant" style={img} />

            {/* 🔴 NEW DELETE BUTTON */}
            <button onClick={() => handleDelete(url)} style={deleteBtn}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const wrap: React.CSSProperties = {
  marginTop: 30,
  textAlign: "center",
};

const title: React.CSSProperties = {
  fontSize: 22,
  color: "#14532d",
  marginBottom: 12,
};

const input: React.CSSProperties = {
  marginBottom: 20,
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
  gap: 12,
  maxWidth: 500,
  margin: "0 auto",
};

const photoCard: React.CSSProperties = {
  position: "relative",
};

const img: React.CSSProperties = {
  width: "100%",
  height: 100,
  objectFit: "cover",
  borderRadius: 10,
};

/* 🔴 Always-visible delete pill */
const deleteBtn: React.CSSProperties = {
  position: "absolute",
  top: 6,
  right: 6,
  background: "#ef4444",      // bright red
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: 26,
  height: 26,
  cursor: "pointer",
  fontSize: 16,
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 20,                 // 🔥 forces above image
  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
};