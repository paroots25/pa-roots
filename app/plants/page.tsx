"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PlantSelectionPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /* ---------------- VALENTINE SPECIAL TYPES ---------------- */

  const valentines = [
    "peace-lily",
    "snake-plant",
    "areca-palm",
    "birkin",
    "peperomia-lime",
    "rose",
    "lavender",
    "kalanchoe",
    "bonsai",
    "orchid",
  ];

  /* ---------------- ALL PLANTS WITH CATEGORY ---------------- */

  const plants = [
    /* ---------- CORE MEMORY ---------- */
    { name: "Peace Lily", type: "peace-lily", price: "₹349", image: "/plants/Peace Lily.webp", category: "Core Memory Plants" },
    { name: "Snake Plant", type: "snake-plant", price: "₹299", image: "/plants/Snake Plant.webp", category: "Core Memory Plants" },
    { name: "Areca Palm", type: "areca-palm", price: "₹399", image: "/plants/areca-palm.webp", category: "Core Memory Plants" },
    { name: "Philodendron Birkin", type: "birkin", price: "₹499", image: "/plants/Philodendron Birkin.jpeg", category: "Core Memory Plants" },
    { name: "Philodendron White Princess", type: "white-princess", price: "₹549", image: "/plants/Philodendron White Princess.webp", category: "Core Memory Plants" },
    { name: "Peperomia Obtusifolia Lime", type: "peperomia-lime", price: "₹349", image: "/plants/Peperomia Obtusifolia Lime.webp", category: "Core Memory Plants" },
    { name: "Peperomia Silver Ripple", type: "peperomia-silver", price: "₹349", image: "/plants/Peperomia Silver Ripple.jpeg", category: "Core Memory Plants" },
    { name: "Christmas Cactus", type: "christmas-cactus", price: "₹299", image: "/plants/Christmas Cactus.jpg", category: "Core Memory Plants" },
    { name: "Zamioculcas(ZZ)", type: "ZZZ", price: "₹549", image: "/plants/Zamioculcas(ZZ)low.webp", category: "Core Memory Plants" },
    { name: "Imperial Green", type: "Imperial-Green", price: "₹549", image: "/plants/ImperialGreen.webp", category: "Core Memory Plants" },
    { name: "Aglaonema Thai", type: "Aglaonema-Thai", price: "₹549", image: "/plants/AglaonemaThai.webp", category: "Core Memory Plants" },
    { name: "Aglaonema Lipstick", type: "Aglaonema-Lipstick", price: "₹549", image: "/plants/AglaonemaThailipstick.webp", category: "Core Memory Plants" },
    { name: "Succulent", type: "Succulent", price: "₹549", image: "/plants/Succulent.webp", category: "Core Memory Plants" },
    { name: "Calathea", type: "Calathea", price: "₹549", image: "/plants/Calathea.webp", category: "Core Memory Plants" },
    { name: "Syngonium", type: "Syngonium", price: "₹549", image: "/plants/Syngonium.webp", category: "Core Memory Plants" },
    { name: "Cactus", type: "Cactus", price: "₹549", image: "/plants/Cactus.jpg", category: "Core Memory Plants" },
    /* ---------- OCCASION FLOWERING ---------- */
    { name: "Rose", type: "rose", price: "₹249", image: "/plants/rose.jpg", category: "Occasion Flowering Plants" },
    { name: "Red Gerbera", type: "Red gerbera", price: "₹199", image: "/plants/red.jpg", category: "Occasion Flowering Plants" },
    { name: "Pink Gerbera", type: "Pink gerbera", price: "₹199", image: "/plants/pink.png", category: "Occasion Flowering Plants" },
    { name: "Yellow Gerbera", type: "Yellow gerbera", price: "₹199", image: "/plants/yellow.png", category: "Occasion Flowering Plants" },
    { name: "White Gerbera", type: "White gerbera", price: "₹199", image: "/plants/white.png", category: "Occasion Flowering Plants" },
    { name: "Orange Gerbera", type: "Orange gerbera", price: "₹199", image: "/plants/orange.webp", category: "Occasion Flowering Plants" },
    { name: "Portulaca Moss Rose", type: "portulaca", price: "₹199", image: "/plants/Portulaca Moss Rose.webp", category: "Occasion Flowering Plants" },
    { name: "Crossandra", type: "crossandra", price: "₹199", image: "/plants/crossandra.webp", category: "Occasion Flowering Plants" },
    { name: "Arabian Jasmine", type: "jasmine", price: "₹249", image: "/plants/Arabian Jasmine.webp", category: "Occasion Flowering Plants" },
    { name: "Gardenia", type: "gardenia", price: "₹299", image: "/plants/gardenia1.webp", category: "Occasion Flowering Plants" },
    { name: "Yellow Kalanchoe", type: "Yellow kalanchoe", price: "₹249", image: "/plants/Yellow Kalanchoe.webp", category: "Occasion Flowering Plants" },
    { name: "Pink Kalanchoe", type: "Pink kalanchoe", price: "₹249", image: "/plants/Pink Kalanchoe.webp", category: "Occasion Flowering Plants" },
    { name: "Cana", type: "Cana", price: "₹249", image: "/plants/Cana.jpg", category: "Occasion Flowering Plants" },
     { name: "Aptenia Variegated", type: "Aptenia-Variegated", price: "₹249", image: "/plants/Aptenia Variegated.jpg", category: "Occasion Flowering Plants" },

    /* ---------- PREMIUM SIGNATURE ---------- */
    { name: "Bonsai Tree", type: "bonsai", price: "₹599", image: "/plants/Bonsai Tree.jpg", category: "Premium Signature Plants" },
    { name: "Dendrobium Orchid", type: "orchid", price: "₹699", image: "/plants/Dendrobium Orchid1.webp", category: "Premium Signature Plants" },
    { name: "Bird of Paradise", type: "bird", price: "₹799", image: "/plants/Bird of Paradise.webp", category: "Premium Signature Plants" },
    { name: "Desert Rose (Adenium)", type: "adenium", price: "₹599", image: "/plants/Desert Rose (Adenium)1.webp", category: "Premium Signature Plants" },
    { name: "Zamioculcas(ZZ) Premium ", type: "zz", price: "₹549", image: "/plants/Zamioculcas (ZZ)high.webp", category: "Premium Signature Plants" },
    { name: "Heliconia Fire", type: "Heliconia-Fire", price: "₹549", image: "/plants/Heliconia Fire.webp", category: "Premium Signature Plants" },
  ];

  function selectPlant(type: string) {
    router.push(`/buy?type=${type}`);
  }

  if (!mounted) {
    return (
      <div style={loadingWrap}>
        <p style={loadingText}>Loading plants… 🌿</p>
      </div>
    );
  }

  const categories = [
    "Core Memory Plants",
    "Occasion Flowering Plants",
    "Premium Signature Plants",
  ];

  return (
    <div style={page}>
      <h1 style={title}>Choose Your Memory Plant 🌱</h1>

      {categories.map((cat) => (
        <div key={cat} style={{ marginTop: 50 }}>
          <h2 style={sectionTitle}>{cat}</h2>

          <div style={grid}>
            {plants
              .filter((p) => p.category === cat)
              .map((plant) => {
                const isValentine = valentines.includes(plant.type);

                return (
                  <div key={plant.type} style={card}>
                    <div style={{ position: "relative", width: "100%", height: 170 }}>
                      <Image
                        src={plant.image}
                        alt={plant.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 240px"
                        style={{ objectFit: "cover" }}
                        loading="lazy"
                      />
                    </div>

                    {isValentine && (
                      <span style={valentineBadge}>Valentine Week Special ❤️</span>
                    )}

                    <h3 style={name}>{plant.name}</h3>
                    <p style={price}>{plant.price}</p>

                    <button style={btn} onClick={() => selectPlant(plant.type)}>
                      Select Plant
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom right, #ecfdf5, #f0fdf4)",
  padding: 40,
  fontFamily: "sans-serif",
  textAlign: "center",
};

const title: React.CSSProperties = {
  fontSize: 36,
  color: "#14532d",
};

const sectionTitle: React.CSSProperties = {
  fontSize: 26,
  color: "#166534",
  marginBottom: 20,
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
  gap: 24,
  maxWidth: 1100,
  margin: "0 auto",
};

const card: React.CSSProperties = {
  background: "white",
  borderRadius: 20,
  overflow: "hidden",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  paddingBottom: 20,
  position: "relative",
};

const valentineBadge: React.CSSProperties = {
  position: "absolute",
  top: 10,
  left: 10,
  background: "#b91c1c",
  color: "white",
  fontSize: 11,
  padding: "4px 10px",
  borderRadius: 20,
};

const name: React.CSSProperties = {
  fontSize: 18,
  color: "#14532d",
  marginTop: 14,
};

const price: React.CSSProperties = {
  marginTop: 8,
  marginBottom: 12,
  fontWeight: "bold",
  color: "#166534",
};

const btn: React.CSSProperties = {
  padding: "10px 18px",
  borderRadius: 10,
  border: "none",
  background: "#166534",
  color: "white",
  cursor: "pointer",
};

const loadingWrap: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#ecfdf5",
};

const loadingText: React.CSSProperties = {
  fontSize: 18,
  color: "#14532d",
};