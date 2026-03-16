"use client";

import { useState } from "react";
import MemorySlideshow from "./MemorySlideshow";

export default function MemoryModal({
  photos,
  audioUrl,
  audioMode,
}: {
  photos: string[];
  audioUrl?: string;
  audioMode?: "manual" | "auto";
}) {
  const [open, setOpen] = useState(false);

  if (!photos || photos.length === 0) return null;

  return (
    <>
      <button onClick={() => setOpen(true)} style={viewButton}>
        View Memories 💚
      </button>

      {open && (
        <div style={overlay} onClick={() => setOpen(false)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>

            {/* 🔝 Top Bar */}
            <div style={topBar}>
              <p style={topNote}>
                A memory planted with love 🌱
              </p>
              <button style={closeBtn} onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>

            {/* 🖼 Image Frame */}
            <div style={imageFrame}>
              <MemorySlideshow
                photos={photos}
                audioUrl={audioUrl || undefined}
                audioMode={audioMode || undefined}
              />
            </div>

          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Styles ---------- */

const viewButton: React.CSSProperties = {
  padding: "14px 28px",
  background: "#166534",
  color: "white",
  border: "none",
  borderRadius: 16,
  cursor: "pointer",
};

const overlay: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modal: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  background: "black",
  display: "flex",
  flexDirection: "column",
};

const topBar: React.CSSProperties = {
  height: 70,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px",
  background: "black",
};

const topNote: React.CSSProperties = {
  color: "white",
  margin: 0,
  fontSize: 16,
};

const closeBtn: React.CSSProperties = {
  background: "rgba(255,255,255,0.2)",
  border: "none",
  color: "white",
  fontSize: 20,
  padding: "8px 14px",
  borderRadius: 10,
  cursor: "pointer",
};

const imageFrame: React.CSSProperties = {
  flex: 1,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "black",
};