"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DashboardPage() {
  const params = useParams();
  const id = params.id as string;

  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioMode, setAudioMode] = useState<"manual" | "auto">("manual");

  /* NEW */
  const [animationType, setAnimationType] = useState<
    "none" | "love" | "birthday" | "sister" | "brother" | "mother" | "father"
  >("none");

  const [memoryLink, setMemoryLink] = useState("");
  const [loading, setLoading] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "message" | "images" | "audio" | "animations" | "qr"
  >("message");

  /* ---------------- LOAD PLANT ---------------- */
  useEffect(() => {
    async function loadPlant() {
      const res = await fetch(`/api/get-plant?id=${id}`);
      const data = await res.json();

      if (data.plant) {
        setMessage(data.plant.message || "");
        setPhotos(data.plant.photos || []);
        setAudioUrl(data.plant.audio_url || "");
        setAudioMode(data.plant.audio_mode || "manual");

        /* NEW */
        setAnimationType(data.plant.animation_type || "none");
      }
    }

    if (id) loadPlant();
  }, [id]);

  /* ---------------- MEMORY LINK ---------------- */
  useEffect(() => {
    if (id) {
      const base =
        process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
      setMemoryLink(`${base}/plant/${id}`);
    }
  }, [id]);

  /* ---------------- SAVE MESSAGE ---------------- */
  async function handleSaveMessage() {
    setLoading(true);

    await fetch("/api/update-plant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, message }),
    });

    setLoading(false);
    alert("Memory saved 🌱");
  }

  /* ---------------- SAVE ANIMATION ---------------- */
  async function handleSaveAnimation() {
    setLoading(true);

    await fetch("/api/update-plant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        animation_type: animationType,
      }),
    });

    setLoading(false);
    alert("Animation saved 🎬");
  }

  /* ---------------- UPLOAD PHOTOS ---------------- */
  async function handleUploadPhotos() {
    if (!files) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("id", id);

    Array.from(files).forEach((file) =>
      formData.append("files", file)
    );

    const res = await fetch("/api/upload-photo", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setPhotos(data.photos || []);
    setLoading(false);
  }

  /* ---------------- DELETE PHOTO ---------------- */
  async function handleDeletePhoto(photoUrl: string) {
    if (!confirm("Delete this photo?")) return;

    const fileName = photoUrl.split("/").pop();

    const res = await fetch("/api/delete-photo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        fileName,
      }),
    });

    if (!res.ok) {
      alert("Delete failed ❌");
    } else {
      setPhotos((prev) => prev.filter((p) => p !== photoUrl));
      alert("Photo deleted 🗑️");
    }
  }

  /* ---------------- UPLOAD AUDIO ---------------- */
  async function handleUploadAudio() {
    if (!audioFile) {
      alert("Select audio first 🎵");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("id", id);
    formData.append("audio", audioFile);
    formData.append("mode", audioMode);

    const res = await fetch("/api/upload-audio", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) alert("Upload failed ❌");
    else {
      setAudioUrl(data.audioUrl);
      alert("Audio uploaded 🎶");
    }
  }

  /* ---------------- DELETE AUDIO ---------------- */
  async function handleDeleteAudio() {
    if (!audioUrl) return;

    if (!confirm("Delete this audio?")) return;

    const fileName = audioUrl.split("/").pop();

    const res = await fetch("/api/delete-audio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        fileName,
      }),
    });

    if (!res.ok) {
      alert("Delete failed ❌");
    } else {
      setAudioUrl("");
      setAudioFile(null);
      alert("Audio deleted 🎵");
    }
  }

  /* ---------------- UI ---------------- */

  return (
    <div style={page}>
      <div style={topBar}>
        <button style={hamburger} onClick={() => setSidebarOpen(true)}>
          ☰
        </button>
        <h2 style={{ margin: 0 }}>Plant Dashboard 🌱</h2>
      </div>

      <div style={contentWrapper}>
        <div style={card}>

          {activeTab === "message" && (
            <>
              <textarea
                placeholder="Write your memory..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={textarea}
              />
              <button style={btn} onClick={handleSaveMessage}>
                {loading ? "Saving..." : "Save Memory"}
              </button>
            </>
          )}

          {activeTab === "images" && (
            <>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setFiles(e.target.files)}
              />

              <button style={btn} onClick={handleUploadPhotos}>
                Upload Photos
              </button>

              <div style={photoGrid}>
                {photos.map((url, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img src={url} style={photo} />

                    <button
                      onClick={() => handleDeletePhoto(url)}
                      style={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        background: "rgba(0,0,0,0.6)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: 24,
                        height: 24,
                        cursor: "pointer",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "audio" && (
            <>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) =>
                  setAudioFile(e.target.files?.[0] || null)
                }
              />

              <div style={radioContainer}>
                <label style={radioRow}>
                  <input
                    type="radio"
                    checked={audioMode === "manual"}
                    onChange={() => setAudioMode("manual")}
                  />
                  Play only when clicked ▶️
                </label>

                <label style={radioRow}>
                  <input
                    type="radio"
                    checked={audioMode === "auto"}
                    onChange={() => setAudioMode("auto")}
                  />
                  Auto play with slideshow 🔁
                </label>
              </div>

              <button style={btn} onClick={handleUploadAudio}>
                Upload Audio
              </button>

              {audioUrl && (
                <>
                  <audio
                    controls
                    src={audioUrl}
                    style={{ marginTop: 20, width: "100%" }}
                  />

                  <button
                    style={{
                      ...btn,
                      background: "#dc2626",
                      marginTop: 15,
                    }}
                    onClick={handleDeleteAudio}
                  >
                    Delete Audio ❌
                  </button>
                </>
              )}
            </>
          )}

          {/* NEW ANIMATION TAB */}

          {activeTab === "animations" && (
            <>
              <div style={radioContainer}>

                <label style={radioRow}>
                  <input
                    type="radio"
                    checked={animationType === "none"}
                    onChange={() => setAnimationType("none")}
                  />
                  No Animation
                </label>

                <label style={radioRow}>
                  <input
                    type="radio"
                    checked={animationType === "love"}
                    onChange={() => setAnimationType("love")}
                  />
                  Love Story 💖
                </label>

                <label style={radioRow}>
                  <input
                    type="radio"
                    checked={animationType === "birthday"}
                    onChange={() => setAnimationType("birthday")}
                  />
                  Birthday 🎂
                </label>

                <label style={radioRow}>
                  <input
                    type="radio"
                    checked={animationType === "sister"}
                    onChange={() => setAnimationType("sister")}
                  />
                  Sister 💜
                </label>

                <label style={radioRow}>
                  <input
                    type="radio"
                    checked={animationType === "brother"}
                    onChange={() => setAnimationType("brother")}
                  />
                  Brother 💙
                </label>

                <label style={radioRow}>
                  <input
                    type="radio"
                    checked={animationType === "mother"}
                    onChange={() => setAnimationType("mother")}
                  />
                  Mother's Day 🌸
                </label>

                <label style={radioRow}>
                  <input
                    type="radio"
                    checked={animationType === "father"}
                    onChange={() => setAnimationType("father")}
                  />
                  Father's Day 🌳
                </label>

              </div>

              <button style={btn} onClick={handleSaveAnimation}>
                Save Animation 🎬
              </button>
            </>
          )}

          {activeTab === "qr" && (
            <>
              <button
                style={btn}
                onClick={() => window.open(`/qr/${id}`, "_blank")}
              >
                View QR Code 🌿
              </button>

              <a
                href={memoryLink}
                target="_blank"
                rel="noopener noreferrer"
                style={linkText}
              >
                {memoryLink}
              </a>
            </>
          )}

        </div>
      </div>

      {sidebarOpen && (
        <div style={overlay} onClick={() => setSidebarOpen(false)} />
      )}

      <div
        style={{
          ...sidebar,
          transform: sidebarOpen
            ? "translateX(0)"
            : "translateX(-100%)",
        }}
      >
        <h3>Customize 🌿</h3>

        <div style={menuItem} onClick={() => { setActiveTab("message"); setSidebarOpen(false); }}>
          📝 Message
        </div>

        <div style={menuItem} onClick={() => { setActiveTab("images"); setSidebarOpen(false); }}>
          🖼 Images
        </div>

        <div style={menuItem} onClick={() => { setActiveTab("audio"); setSidebarOpen(false); }}>
          🎵 Audio
        </div>

        <div style={menuItem} onClick={() => { setActiveTab("animations"); setSidebarOpen(false); }}>
          🎬 Animations
        </div>

        <div style={menuItem} onClick={() => { setActiveTab("qr"); setSidebarOpen(false); }}>
          🔗 QR & Link
        </div>
      </div>
    </div>
  );
}
/* ---------------- STYLES ---------------- */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f0fdf4",
};

const topBar: React.CSSProperties = {
  height: 70,
  backgroundColor: "#166534",
  color: "white",
  display: "flex",
  alignItems: "center",
  gap: 20,
  padding: "0 20px",
};

const hamburger: React.CSSProperties = {
  fontSize: 24,
  backgroundColor: "transparent",
  border: "none",
  color: "white",
  cursor: "pointer",
};

const contentWrapper: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  padding: "40px 20px",
};

const card: React.CSSProperties = {
  width: "100%",
  maxWidth: 600,
  backgroundColor: "white",
  padding: 30,
  borderRadius: 20,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const textarea: React.CSSProperties = {
  width: "100%",
  height: 120,
  padding: 12,
  borderRadius: 10,
  border: "1px solid #ccc",
  outline: "none",
};

const btn: React.CSSProperties = {
  marginTop: 15,
  padding: "10px 20px",
  backgroundColor: "#166534",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};

const photoGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))",
  gap: 10,
  marginTop: 20,
};

const photo: React.CSSProperties = {
  width: "100%",
  height: 100,
  objectFit: "cover",
  borderRadius: 8,
};

const radioContainer: React.CSSProperties = {
  marginTop: 20,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const radioRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
};

const linkText: React.CSSProperties = {
  display: "block",
  marginTop: 20,
  color: "#166534",
  fontWeight: "bold",
  wordBreak: "break-all",
};

const overlay: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  zIndex: 998,
};

const sidebar: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: 260,
  height: "100vh",
  backgroundColor: "#111",
  color: "white",
  padding: 20,
  zIndex: 999,
  transition: "transform 0.3s ease",
};

const menuItem: React.CSSProperties = {
  padding: "12px 10px",
  marginTop: 10,
  backgroundColor: "#1f1f1f",
  borderRadius: 8,
  cursor: "pointer",
};