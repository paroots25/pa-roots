"use client";

import { useState } from "react";
import MemorySlideshow from "./MemorySlideshow";

export default function MemoryModal({
  photos,
}: {
  photos: string[];
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
              <MemorySlideshow photos={photos} />
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
  inset: 0,
  width: "40vw",
  height: "90vh",
  background: "rgba(0,0,0,0.96)",  // darker full screen
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};
const modal: React.CSSProperties = {
  width: "96%",
  maxWidth: 1200,          // good for laptop
  height: "88vh",          // slightly taller
  background: "black",
  borderRadius: 24,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const topBar: React.CSSProperties = {
  height: 80,              // slightly taller header
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 40px",
  background: "black",
};

const topNote: React.CSSProperties = {
  color: "white",
  margin: 0,
  fontSize: 18,
  fontWeight: 500,
};

const closeBtn: React.CSSProperties = {
  background: "rgba(255,255,255,0.15)",
  border: "none",
  color: "white",
  fontSize: 20,
  padding: "8px 14px",
  borderRadius: 10,
  cursor: "pointer",
};

const imageFrame: React.CSSProperties = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "50px",     // 🔥 creates cinematic black border
  background: "black",
};