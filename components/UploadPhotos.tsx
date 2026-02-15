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

        /* ❗ STOP JSON ERROR HERE */
        if (!res.ok) return;

        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) return;

        const data = await res.json();
        setPhotos(data.photos || []);
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

      /* ❗ SAFE JSON PARSE */
      if (!res.ok) throw new Error("Upload failed");

      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        throw new Error("Invalid server response");
      }

      const data = await res.json();
      setPhotos(data.photos || []);
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

      /* ❗ SAFE JSON PARSE */
      if (!res.ok) throw new Error("Delete failed");

      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        throw new Error("Invalid server response");
      }

      const data = await res.json();
      setPhotos(data.photos || []);
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Delete failed ❌");
    }
  }

  return (
    <div style={{ marginTop: 30, textAlign: "center" }}>
      <h2 style={{ fontSize: 22, color: "#14532d", marginBottom: 12 }}>
        Upload Memory Photos 📸
      </h2>

      <input type="file" multiple accept="image/*" onChange={handleUpload} />

      {loading && <p style={{ marginTop: 10 }}>Uploading...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          gap: 12,
          maxWidth: 500,
          margin: "20px auto 0",
        }}
      >
        {photos.map((url, i) => (
          <div key={i} style={{ position: "relative" }}>
            <img
              src={url}
              style={{
                width: "100%",
                height: 100,
                objectFit: "cover",
                borderRadius: 10,
              }}
            />

            <button
              onClick={() => handleDelete(url)}
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: 8,
                padding: "2px 6px",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}