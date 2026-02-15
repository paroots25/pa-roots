import { supabase } from "@/lib/supabase";
import ShareButtons from "./ShareButtons";
import MemorySlideshow from "@/components/MemorySlideshow";

export const dynamic = "force-dynamic";

export default async function PlantPage({
  params,
}: {
  params: Promise<{ id: string }>; // ✅ Next.js 15 type
}) {
  /* ✅ unwrap params properly */
  const { id } = await params;

  /* 🔍 fetch plant */
  const { data: plant, error } = await supabase
    .from("plants")
    .select("name, message, photos")
    .eq("id", id)
    .maybeSingle();

  /* ❌ not found */
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
      {/* 🌸 Smooth slideshow */}
      {plant.photos?.length > 0 && (
       <MemorySlideshow photos={plant.photos} />
      )}

      {/* 🤍 memory card */}
      <div style={card}>
        <h1 style={title}>{plant.name} 🌿</h1>

        {plant.message && <p style={message}>{plant.message}</p>}

        <p style={footer}>
          A living memory that continues to grow with love 💚
        </p>

        <ShareButtons memoryLink={memoryLink} />

        {/* upload photos */}
        
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom right, #ecfdf5, #f0fdf4)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "60px 20px",
  fontFamily: "sans-serif",
};

const topGallery: React.CSSProperties = {
  display: "flex",
  gap: 20,
  marginBottom: 40,
  flexWrap: "wrap",
  justifyContent: "center",
};

const photo: React.CSSProperties = {
  width: 220,
  height: 160,
  objectFit: "contain",
  borderRadius: 16,
  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
};

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.95)",
  backdropFilter: "blur(12px)",
  padding: 48,
  borderRadius: 28,
  maxWidth: 520,
  width: "100%",
  textAlign: "center",
  boxShadow: "0 30px 70px rgba(0,0,0,0.18)",
};

const title: React.CSSProperties = {
  fontSize: 38,
  color: "#14532d",
  marginBottom: 18,
};

const message: React.CSSProperties = {
  fontSize: 18,
  color: "#374151",
  lineHeight: 1.7,
  marginBottom: 26,
  whiteSpace: "pre-line",
};

const footer: React.CSSProperties = {
  fontSize: 14,
  color: "#6b7280",
};

const center: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};