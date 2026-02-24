import { supabase } from "@/lib/supabase";
import ShareButtons from "./ShareButtons";
import MemorySlideshow from "@/components/MemorySlideshow";
import MemoryModal from "@/components/MemoryModal";
import AudioPlayer from "@/components/AudioPlayer";

export const dynamic = "force-dynamic";

type Plant = {
  name: string;
  message: string;
  photos: string[];
  audio_url?: string | null;
  audio_mode?: "manual" | "auto" | null;
};

export default async function PlantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("plants")
    .select("name, message, photos, audio_url, audio_mode")
    .eq("id", id)
    .maybeSingle();

  const plant = data as Plant | null;

  if (!plant || error) {
    return (
      <div style={center}>
        <h1>Plant not found 🌱</h1>
      </div>
    );
  }

  const memoryLink = `${process.env.NEXT_PUBLIC_SITE_URL}/plant/${id}`;

  return (
    <div style={page}>
      {/* 🤍 MEMORY CARD FIRST */}
      <div style={card}>
        <h1 style={title}>{plant.name} 🌿</h1>
       {plant.audio_url && plant.audio_mode === "manual" && (
         <AudioPlayer
           audioUrl={plant.audio_url}
           audioMode="manual"
         />
       )}

        {plant.message && <p style={message}>{plant.message}</p>}

        {/* View Memories Button */}
        {plant.photos?.length > 0 && (
          <MemoryModal
            photos={plant.photos}
            audioUrl={plant.audio_url || undefined}
            audioMode={
              plant.audio_mode === "auto" ? "auto" : "manual"
            }
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

/* ---------- styles ---------- */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom right, #ecfdf5, #f0fdf4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "60px 20px",
  fontFamily: "sans-serif",
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

const center: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};