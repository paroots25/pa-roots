"use client";

import { useEffect, useState } from "react";

export default function MemorySlideshow({ photos }: { photos: string[] }) {
  const [index, setIndex] = useState(0);

  /* change photo every 4 sec */
  useEffect(() => {
    if (!photos?.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [photos]);

  if (!photos?.length) return null;

  return (
    <div style={wrapper}>
      <div
        key={index}
        style={slide}
      >
        <img src={photos[index]} style={image} />
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

/* outer fixed area */
const wrapper: React.CSSProperties = {
  width: "100%",
  height: 180,
  overflow: "hidden",
  position: "relative",
  marginBottom: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

/* moving slide animation */
const slide: React.CSSProperties = {
  position: "absolute",
  animation: "slideAcross 4s linear",
};

/* image style (SMALL PHOTO like you asked) */
const image: React.CSSProperties = {
  height: 160,
  width: 220,
  objectFit: "contain",        // ✅ show full image
  borderRadius: 16,
  background: "#f0fdf4",       // ✅ soft light green fill
  padding: 8,                  // ✅ breathing space
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
};

/* keyframes via global style injection */
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes slideAcross {
      0%   { transform: translateX(-120%); opacity: 0; }
      10%  { opacity: 1; }
      50%  { transform: translateX(0%); }
      90%  { opacity: 1; }
      100% { transform: translateX(120%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}