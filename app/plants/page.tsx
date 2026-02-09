"use client";

import { useRouter } from "next/navigation";

export default function PlantSelectionPage() {
  const router = useRouter();

  const plants = [
    {
      name: "Red Gerbera",
      type: "red-gerbera",
      price: "₹199",
      meaning: "Symbol of deep love & passion ❤️",
      occasion: "Romantic Gift",
      image:
         "/plants/red.jpg"

    },
    {
      name: "Pink Gerbera",
      type: "pink-gerbera",
      price: "₹199",
      meaning: "Represents admiration & sweetness 💗",
      occasion: "Friendship",
      image:
        "/plants/pink.png",
    },
    {
      name: "Yellow Gerbera",
      type: "yellow-gerbera",
      price: "₹199",
      meaning: "Joy, happiness & positive energy ☀️",
      occasion: "Birthday Gift",
      image:
        "/plants/yellow.png"
    },
    {
      name: "White Gerbera",
      type: "white-gerbera",
      price: "₹199",
      meaning: "Purity, peace & calm memories 🤍",
      occasion: "Memorial / Calm Gift",
      image:
         "/plants/white.png",
    },
    {
      name: "Orange Gerbera",
      type: "orange-gerbera",
      price: "₹199",
      meaning: "Energy, warmth & excitement 🧡",
      occasion: "Celebration",
      image:
         "/plants/orange.webp",
    },
    {
      name: "Red Rose",
      type: "red-rose",
      price: "₹249",
      meaning: "Timeless symbol of true love 🌹",
      occasion: "Love Proposal",
      image:
         "/plants/rose.jpg",
    },
    {
      name: "Yellow Chrysanthemum",
      type: "yellow-chrysanthemum",
      price: "₹199",
      meaning: "Happiness, friendship & long life 🌼",
      occasion: "Best Friend Gift",
      image:
        "/plants/yellow1.png",
    },
    {
      name: "White Chrysanthemum",
      type: "white-chrysanthemum",
      price: "₹199",
      meaning: "Peaceful remembrance & purity 🤍",
      occasion: "Memory Plant",
      image:
        "/plants/white1.png",
    },
    {
      name: "Pink Chrysanthemum",
      type: "pink-chrysanthemum",
      price: "₹199",
      meaning: "Care, affection & gentle love 💕",
      occasion: "Family Gift",
      image:
        "/plants/pink1.png",
    },
    {
      name: "Money Plant",
      type: "money-plant",
      price: "₹299",
      meaning: "Brings prosperity & good fortune 🌿",
      occasion: "New Home / Success",
      image:
        "/plants/plant.jpeg",
    },
  ];

  function selectPlant(type: string) {
    router.push(`/buy?type=${type}`);
  }

  return (
    <div style={page}>
      <h1 style={title}>Choose Your Memory Plant 🌱</h1>

      <div style={grid}>
        {plants.map((plant) => (
          <div key={plant.type} style={card}>
            {/* IMAGE */}
            <img src={plant.image} alt={plant.name} style={image} />

            {/* OCCASION BADGE */}
            <span style={badge}>{plant.occasion}</span>

            <h2 style={name}>{plant.name}</h2>

            {/* MEANING */}
            <p style={meaning}>{plant.meaning}</p>

            <p style={price}>{plant.price}</p>

            <button style={btn} onClick={() => selectPlant(plant.type)}>
              Select Plant
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

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
  marginBottom: 40,
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: 28,
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

const image: React.CSSProperties = {
  width: "100%",
  height: 170,
  objectFit: "cover",
};

const badge: React.CSSProperties = {
  position: "absolute",
  top: 12,
  left: 12,
  background: "#166534",
  color: "white",
  fontSize: 12,
  padding: "4px 10px",
  borderRadius: 20,
};

const name: React.CSSProperties = {
  fontSize: 20,
  color: "#14532d",
  marginTop: 14,
};

const meaning: React.CSSProperties = {
  fontSize: 14,
  color: "#6b7280",
  padding: "0 14px",
  marginTop: 6,
  minHeight: 40,
};

const price: React.CSSProperties = {
  marginTop: 10,
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
