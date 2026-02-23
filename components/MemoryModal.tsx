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

            {/* 🔥 Top Header Bar */}
            <div style={topBar}>
              <span style={noteText}>
                A memory planted with love 🌱
              </span>

              <button style={closeBtn} onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>

            {/* 🔥 Slideshow Below Header */}
            <div style={slideshowArea}>
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
  fontWeight: 600,
  cursor: "pointer",
  marginBottom: 30,
  fontSize: 16,
};

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.95)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modal: React.CSSProperties = {
  width: "95%",
  maxWidth: "1200px",
  aspectRatio: "16 / 9",
  background: "black",
  borderRadius: 20,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

/* 🔥 TOP BLACK BAR */
const topBar: React.CSSProperties = {
  height: "70px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  background: "black",
};

/* 🔥 TEXT */
const noteText: React.CSSProperties = {
  color: "white",
  fontSize: 15,
  opacity: 0.9,
};

/* 🔥 CLOSE BUTTON */
const closeBtn: React.CSSProperties = {
  position: "absolute",
  right: 20,
  background: "rgba(255,255,255,0.15)",
  border: "none",
  color: "white",
  fontSize: 18,
  padding: "6px 12px",
  borderRadius: 8,
  cursor: "pointer",
};

/* 🔥 SLIDESHOW AREA BELOW HEADER */
const slideshowArea: React.CSSProperties = {
  flex: 1,
  position: "relative",
};