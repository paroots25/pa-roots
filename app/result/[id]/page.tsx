import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function ResultPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  /* 🌱 Get plant info */
  const { data: plant } = await supabase
    .from("plants")
    .select("name, email")
    .eq("id", id)
    .maybeSingle();

  return (
    <div style={page}>
      <div style={card}>
        {/* 🌿 Title */}
        <h1 style={title}>Thank you for planting a memory 🌱</h1>

        {/* 💚 Subtitle */}
        <p style={subtitle}>
          Your order has been received successfully.
        </p>

        {/* 🌸 Personalized line */}
        {plant?.name && (
          <p style={plantLine}>
            This memory plant is created for{" "}
            <span style={highlight}>{plant.name}</span>
          </p>
        )}

        {/* 📩 Email info */}
         
          <p style={info}>
            Login details to personalize your memory will be sent to your registered Email
            
          </p>
        

        {/* 🏷 Physical QR note */}
        <p style={info}>
          Your QR code will be carefully printed and attached
          to the plant before delivery 🌿
        </p>

        {/* ❤️ Closing line */}
        <p style={footer}>
          A living memory that will continue to grow with love.
        </p>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom right, #ecfdf5, #f0fdf4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  fontFamily: "sans-serif",
};

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.95)",
  backdropFilter: "blur(12px)",
  padding: "50px 40px",
  borderRadius: 28,
  maxWidth: 520,
  width: "100%",
  textAlign: "center",
  boxShadow: "0 30px 70px rgba(0,0,0,0.15)",
};

const title: React.CSSProperties = {
  fontSize: 34,
  color: "#14532d",
  marginBottom: 18,
  fontWeight: "bold",
};

const subtitle: React.CSSProperties = {
  fontSize: 18,
  color: "#374151",
  marginBottom: 20,
};

const plantLine: React.CSSProperties = {
  fontSize: 20,
  marginBottom: 18,
  color: "#14532d",
};

const info: React.CSSProperties = {
  fontSize: 16,
  color: "#4b5563",
  marginBottom: 16,
  lineHeight: 1.6,
};

const highlight: React.CSSProperties = {
  color: "#166534",
  fontWeight: "bold",
};

const footer: React.CSSProperties = {
  marginTop: 24,
  fontSize: 15,
  color: "#6b7280",
  fontStyle: "italic",
};