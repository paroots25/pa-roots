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

            {/* Top Bar */}
            <div style={topBar}>
              <p style={topNote}>
                A memory planted with love 🌱
              </p>
              <button style={closeBtn} onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>

            {/* Image Area */}
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

/* 🔥 FIXED OVERLAY (MOBILE SAFE) */
const overlay: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "#000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

/* 🔥 BIGGER MODAL */
const modal: React.CSSProperties = {
  width: "95%",
  maxWidth: "1400px",
  height: "92vh",
  background: "black",
  borderRadius: 24,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

/* Top Bar */
const topBar: React.CSSProperties = {
  height: 80,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 30px",
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

/* Image Container */
const imageFrame: React.CSSProperties = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
  background: "black",
};