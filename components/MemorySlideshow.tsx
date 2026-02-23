"use client";

import { useEffect, useState } from "react";

export default function MemorySlideshow({
  photos,
}: {
  photos: string[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!photos || photos.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) =>
        prev === photos.length - 1 ? 0 : prev + 1
      );
    }, 2000); // 2 seconds per image

    return () => clearInterval(interval);
  }, [photos]);

  if (!photos || photos.length === 0) return null;

  return (
    <div style={container}>
      {photos.map((photo, i) => (
        <img
          key={i}
          src={photo}
          alt="memory"
          style={{
            ...image,
            opacity: i === index ? 1 : 0,
            transform: i === index ? "scale(1.06)" : "scale(1)",
            zIndex: i === index ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Styles ---------- */

const container: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  background: "black", // prevents any white gap
};

const image: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain", // 🔥 THIS is the key change
  transition: "opacity 0.8s ease-in-out",
  background: "black",
};