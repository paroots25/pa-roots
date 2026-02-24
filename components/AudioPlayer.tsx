"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioPlayer({
  audioUrl,
  audioMode,
}: {
  audioUrl: string;
  audioMode: "manual" | "auto";
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const updateTime = () => setCurrent(audio.currentTime);
    const loaded = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", loaded);

    if (audioMode === "auto") {
      audio.play().catch(() => {});
      setPlaying(true);
    }

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", loaded);
    };
  }, [audioMode]);

  const toggle = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const format = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div style={player}>
      <audio ref={audioRef} src={audioUrl} />

      <button onClick={toggle} style={btn}>
        {playing ? "⏸" : "▶"}
      </button>

      <div style={{ flex: 1 }}>
        <div style={barBackground}>
          <div
            style={{
              ...barProgress,
              width: duration
                ? `${(current / duration) * 100}%`
                : "0%",
            }}
          />
        </div>

        <div style={timeRow}>
          <span>{format(current)}</span>
          <span>-{format(duration - current)}</span>
        </div>
      </div>
    </div>
  );
}

const player: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 24,
};

const btn: React.CSSProperties = {
  border: "none",
  background: "#166534",
  color: "white",
  borderRadius: 50,
  width: 42,
  height: 42,
  cursor: "pointer",
  fontSize: 18,
};

const barBackground: React.CSSProperties = {
  height: 6,
  background: "#e5e7eb",
  borderRadius: 6,
  overflow: "hidden",
};

const barProgress: React.CSSProperties = {
  height: "100%",
  background: "#16a34a",
};

const timeRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 12,
  color: "#6b7280",
  marginTop: 4,
};