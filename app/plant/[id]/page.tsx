"use client";

import LoveAnimation from "@/components/animations/LoveAnimation";
import BirthdayAnimation from "@/components/animations/BirthdayAnimation";
import SisterAnimation from "@/components/animations/SisterAnimation";
import BrotherAnimation from "@/components/animations/BrotherAnimation";
import MotherAnimation from "@/components/animations/MotherAnimation";
import FatherAnimation from "@/components/animations/FatherAnimation";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ShareButtons from "./ShareButtons";
import MemoryModal from "@/components/MemoryModal";
import AudioPlayer from "@/components/AudioPlayer";
import { useParams } from "next/navigation";

export const dynamic = "force-dynamic";

type Plant = {
  name: string;
  message: string;
  photos: string[];
  audio_url?: string | null;
  audio_mode?: "manual" | "auto" | null;
  animation_type?: "none" | "love" | "birthday" | "sister" | "brother" | "mother" | "father";
};

export default function PlantPage() {

  const params = useParams();
  const id = params?.id as string;

  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  /* LOAD PLANT */

  useEffect(() => {

    if (!id) return;

    async function loadPlant() {

      const { data } = await supabase
        .from("plants")
        .select("name, message, photos, audio_url, audio_mode, animation_type")
        .eq("id", id)
        .maybeSingle();

      if (data) setPlant(data);

      setLoading(false);
    }

    loadPlant();

  }, [id]);

  /* AUTO CLOSE ANIMATION */

  useEffect(() => {

    if (showAnimation) {

      const timer = setTimeout(() => {
        setShowAnimation(false);
        setStarted(true);
      }, 3000);

      return () => clearTimeout(timer);
    }

  }, [showAnimation]);

  /* LOADING */

  if (loading) {
    return (
      <div style={center}>
        <h2>Loading memory...</h2>
      </div>
    );
  }

  if (!plant) {
    return (
      <div style={center}>
        <h1>Plant not found 🌱</h1>
      </div>
    );
  }

  const memoryLink = `${process.env.NEXT_PUBLIC_SITE_URL}/plant/${id}`;

  /* ANIMATION SCREEN */

  if (showAnimation) {

    switch (plant.animation_type) {

      case "love":
        return <LoveAnimation />;

      case "birthday":
        return <BirthdayAnimation />;

      case "sister":
        return <SisterAnimation />;

      case "brother":
        return <BrotherAnimation />;

      case "mother":
        return <MotherAnimation />;

      case "father":
        return <FatherAnimation />;

      default:
        return null;
    }
  }

  /* WELCOME SCREEN */

  if (!started) {
    return (
      <div style={welcomePage}>
        <div style={welcomeCard}>

          <h1 style={welcomeTitle}>PA ROOTS 🌿</h1>

          <p style={welcomeText}>
            This plant holds a special memory.
          </p>

          <p style={welcomeSub}>
            Grow memories that live forever
          </p>

          <button
            style={startBtn}
            onClick={() => {

              if (plant.animation_type && plant.animation_type !== "none") {
                setShowAnimation(true);
              } else {
                setStarted(true);
              }

            }}
          >
            Start Memory
          </button>

        </div>
      </div>
    );
  }

  /* MAIN MEMORY PAGE */

  return (
    <div style={page}>
      <div style={card}>

        <h1 style={title}>{plant.name} 🌿</h1>

        {plant.audio_url && plant.audio_mode === "manual" && (
          <AudioPlayer
            audioUrl={plant.audio_url}
            audioMode="manual"
          />
        )}

        {plant.message && <p style={message}>{plant.message}</p>}

        {plant.photos?.length > 0 && (
          <MemoryModal
            photos={plant.photos}
            audioUrl={plant.audio_url || undefined}
            audioMode={plant.audio_mode === "auto" ? "auto" : "manual"}
          />
        )}

        <p style={footer}>
          A living memory that continues to grow with love 💚
        </p>

        <ShareButtons memoryLink={memoryLink} />

      </div>
    </div>
  );
}

/* STYLES */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom right, #ecfdf5, #f0fdf4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "60px 20px",
};

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.96)",
  backdropFilter: "blur(14px)",
  padding: 56,
  borderRadius: 32,
  maxWidth: 560,
  width: "100%",
  textAlign: "center",
  boxShadow: "0 35px 80px rgba(0,0,0,0.2)",
};

const title: React.CSSProperties = {
  fontSize: 40,
  color: "#14532d",
  marginBottom: 24,
};

const message: React.CSSProperties = {
  fontSize: 20,
  color: "#374151",
  lineHeight: 1.9,
  marginBottom: 40,
  whiteSpace: "pre-line",
};

const footer: React.CSSProperties = {
  fontSize: 14,
  color: "#6b7280",
  marginTop: 40,
};

const welcomePage: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to bottom right,#ecfdf5,#f0fdf4)",
};

const welcomeCard: React.CSSProperties = {
  background: "white",
  padding: 40,
  borderRadius: 20,
  textAlign: "center",
  maxWidth: 420,
};

const welcomeTitle: React.CSSProperties = {
  fontSize: 34,
  color: "#14532d",
};

const welcomeText: React.CSSProperties = {
  fontSize: 18,
};

const welcomeSub: React.CSSProperties = {
  fontSize: 14,
  color: "#6b7280",
};

const startBtn: React.CSSProperties = {
  marginTop: 30,
  padding: "14px 28px",
  background: "#166534",
  color: "white",
  border: "none",
  borderRadius: 12,
  fontSize: 16,
  cursor: "pointer",
};

const center: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};