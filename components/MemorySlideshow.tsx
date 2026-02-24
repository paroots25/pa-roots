"use client";

import { useEffect, useRef, useState } from "react";

export default function MemorySlideshow({
  photos,
  audioUrl,
  audioMode,
}: {
  photos: string[];
  audioUrl?: string;
  audioMode?: "manual" | "auto";
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* ---------------- SLIDESHOW (UNCHANGED) ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev === photos.length - 1 ? 0 : prev + 1
      );
    }, 2000); // ✅ same timing

    return () => clearInterval(interval);
  }, [photos]);

  /* ---------------- AUTO MODE ---------------- */
  useEffect(() => {
    if (audioMode === "auto" && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  }, [audioMode]);

  /* ---------------- MANUAL TOGGLE ---------------- */
  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {/* IMAGE (UNCHANGED STYLE) */}
      <img
        src={photos[index]}
        alt="memory"
        style={image}
      />

      {/* Hidden Audio */}
      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} loop />
      )}

      {/* Manual Play Button (ONLY IF manual mode) */}
      {audioUrl && audioMode === "manual" && (
        <button
          onClick={toggleAudio}
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            padding: "8px 16px",
            borderRadius: 20,
            border: "none",
            background: "#166534",
            color: "white",
            cursor: "pointer",
          }}
        >
          {playing ? "⏸ Stop" : "▶ Play"}
        </button>
      )}
    </div>
  );
}

/* ---------------- IMAGE STYLE (UNCHANGED) ---------------- */

const image: React.CSSProperties = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
};