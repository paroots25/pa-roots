import { supabase } from "@/lib/supabase";
import ShareButtons from "./ShareButtons";
import UploadPhotos from "@/components/UploadPhotos"; // ✅ IMPORTANT

export const dynamic = "force-dynamic";

export default async function PlantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  /* ✅ Await params properly */
  const { id } = await params;

  /* ✅ Fetch plant safely */
  const { data: plant, error } = await supabase
    .from("plants")
    .select("name, message, photos")
    .eq("id", id)
    .maybeSingle();

  /* ❗ If still not found */
  if (!plant || error) {
    return (
      <div style={center}>
        <h1>Plant not found 🌱</h1>
      </div>
    );
  }

  /* ✅ Build memory link */
  const memoryLink = `${process.env.NEXT_PUBLIC_SITE_URL}/plant/${id}`;

  return (
    <div style={page}>
      {/* 🌸 PHOTOS */}
      {plant.photos?.length > 0 && (
        <div style={topGallery}>
          {plant.photos.map((url: string, i: number) => (
            <img key={i} src={url} style={photo} />
          ))}
        </div>
      )}

      {/* 🤍 MEMORY CARD */}
      <div style={card}>
        <h1 style={title}>{plant.name} 🌿</h1>

        {plant.message && <p style={message}>{plant.message}</p>}

        <p style={footer}>
          A living memory that continues to grow with love 💚
        </p>

        <ShareButtons memoryLink={memoryLink} />

        {/* 🔥 THIS WAS MISSING — Upload + Delete UI */}
        
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
  width: 160,
  height: 120,
  objectFit: "cover",
  borderRadius: 16,
  background: "white",
  padding: 6,
  boxShadow: "0 10px 25px rgba(0,0,0,0.10)",
};

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.95)",
  backdropFilter: "blur(12px)",
  padding: 48,
  borderRadius: 28,
  maxWidth: 480,
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