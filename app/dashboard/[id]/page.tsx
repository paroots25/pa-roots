"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DashboardPage() {
  const params = useParams();
  const id = params.id as string;

  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [memoryLink, setMemoryLink] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------------- LOAD PLANT ---------------- */
  useEffect(() => {
    async function loadPlant() {
      const res = await fetch(`/api/get-plant?id=${id}`);
      const data = await res.json();

      if (data.plant) {
        setMessage(data.plant.message || "");
        setPhotos(data.plant.photos || []);
      }
    }

    if (id) loadPlant();
  }, [id]);

  /* ---------------- BUILD MEMORY LINK ---------------- */
  useEffect(() => {
    if (id) {
      setMemoryLink(`${window.location.origin}/plant/${id}`);
    }
  }, [id]);

  /* ---------------- SAVE MESSAGE ---------------- */
  async function handleSaveMessage() {
    setLoading(true);

    const res = await fetch("/api/update-plant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, message }),
    });

    setLoading(false);

    if (!res.ok) alert("Failed to save ❌");
    else alert("Memory saved 🌱");
  }

  /* ---------------- UPLOAD PHOTOS ---------------- */
  async function handleUploadPhotos() {
    if (!files || files.length === 0) {
      alert("Select photos first 📸");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("id", id);

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    const res = await fetch("/api/upload-photo", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert("Upload failed ❌");
    } else {
      setPhotos(data.photos || []);
      alert("Photos uploaded 🌸");
    }
  }

  /* ---------------- DELETE PHOTO ---------------- */
  async function handleDeletePhoto(url: string) {
    if (!confirm("Delete this photo?")) return;

    setLoading(true);

    const res = await fetch("/api/delete-photo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, url }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert("Delete failed ❌");
    } else {
      setPhotos(data.photos || []);
    }
  }

  /* ---------------- UI ---------------- */
  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>Plant Dashboard 🌱</h1>

        {/* MESSAGE */}
        <textarea
          placeholder="Write your memory..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={textarea}
        />

        <button onClick={handleSaveMessage} disabled={loading} style={saveBtn}>
          {loading ? "Saving..." : "Save Memory"}
        </button>

        {/* PHOTO UPLOAD */}
        <div style={{ marginTop: 20 }}>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(e.target.files)}
          />

          <button
            onClick={handleUploadPhotos}
            disabled={loading}
            style={uploadBtn}
          >
            {loading ? "Uploading..." : "Upload Photos"}
          </button>
        </div>

        {/* PHOTO GRID WITH DELETE */}
        {photos.length > 0 && (
          <div style={photoGrid}>
            {photos.map((url, i) => (
              <div key={i} style={photoWrap}>
                <img src={url} style={photo} />

                <button
                  onClick={() => handleDeletePhoto(url)}
                  style={deleteBtn}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* QR + LINK */}
        <div style={{ marginTop: 30 }}>
          {/* ✅ FIXED → opens QR page instead of memory page */}
          <button
            onClick={() => window.open(`/admin/qr/${id}`, "_blank")}
            style={qrBtn}
          >
            View QR Code 🌿
          </button>

          {memoryLink && <p style={linkText}>{memoryLink}</p>}
        </div>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom right, #ecfdf5, #f0fdf4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
};

const card: React.CSSProperties = {
  background: "white",
  padding: 30,
  borderRadius: 20,
  width: "100%",
  maxWidth: 520,
  textAlign: "center",
  boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
};

const title: React.CSSProperties = {
  fontSize: 30,
  color: "#14532d",
};

const textarea: React.CSSProperties = {
  width: "100%",
  height: 120,
  marginTop: 20,
  padding: 12,
  borderRadius: 10,
  border: "1px solid #ccc",
};

const saveBtn: React.CSSProperties = {
  marginTop: 10,
  padding: "10px 18px",
  background: "#166534",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};

const uploadBtn: React.CSSProperties = {
  marginLeft: 10,
  padding: "8px 16px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};

const photoGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 10,
  marginTop: 20,
};

const photoWrap: React.CSSProperties = {
  position: "relative",
};

const photo: React.CSSProperties = {
  width: "100%",
  borderRadius: 10,
  objectFit: "cover",
  height: 100,
};

const deleteBtn: React.CSSProperties = {
  position: "absolute",
  top: 6,
  right: 6,
  background: "rgba(220,38,38,0.9)",
  color: "white",
  border: "none",
  borderRadius: 6,
  padding: "2px 6px",
  fontSize: 12,
  cursor: "pointer",
};

const qrBtn: React.CSSProperties = {
  padding: "12px 22px",
  background: "#14532d",
  color: "white",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
};

const linkText: React.CSSProperties = {
  marginTop: 12,
  color: "#166534",
  fontWeight: "bold",
  wordBreak: "break-all",
};