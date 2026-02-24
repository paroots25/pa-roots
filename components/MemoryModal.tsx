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

/* ---------- Styles (UNCHANGED) ---------- */

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
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modal: React.CSSProperties = {
  width: "92%",
  maxWidth: 1300,
  height: "85vh",
  background: "black",
  borderRadius: 20,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const topBar: React.CSSProperties = {
  height: 70,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 30px",
  background: "black",
};

const topNote: React.CSSProperties = {
  color: "white",
  margin: 0,
  fontSize: 16,
};

const closeBtn: React.CSSProperties = {
  background: "rgba(255,255,255,0.15)",
  border: "none",
  color: "white",
  fontSize: 20,
  padding: "6px 12px",
  borderRadius: 8,
  cursor: "pointer",
};

const imageFrame: React.CSSProperties = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px",
  background: "black",
};