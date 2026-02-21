"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function HomePage() {

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #ecfdf5, #f0fdf4)",
        padding: 20,
        fontFamily: "serif",
      }}
    >
      {/* 🌿 Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "#166534" }}>PA Roots 🌱</h2>

        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/login">
            <button style={outlineBtn}>Plant Login 🌱</button>
          </Link>

          <Link href="/plants">
            <button style={primaryBtn}>Buy a Plant 🌿</button>
          </Link>
        </div>
      </div>

      {/* ❤️ Hero */}
      <div style={{ textAlign: "center", marginTop: 100, maxWidth: 700, marginInline: "auto" }}>
        <h1 style={{ fontSize: 46, color: "#14532d" }}>
          Grow Love.
          <br />
          Keep Memories Alive.
        </h1>

        <p style={{ marginTop: 20, fontSize: 18, color: "#374151" }}>
          Adopt a living plant, attach your memories,
          and let love grow forever through PA Roots.
        </p>

        <Link href="/plants">
          <button style={{ ...primaryBtn, marginTop: 30, padding: "14px 26px" }}>
            Start Your Memory 🌱
          </button>
        </Link>
      </div>

      {/* 🌿 WHAT IS PA ROOTS */}
    <div className="fade-in">
    
      <Section>
        <h2 style={sectionTitle}>What is PA Roots?</h2>

        <p style={sectionText}>
          PA Roots transforms a simple plant into a living memory.
        </p>

        <p style={sectionText}>
          Instead of flowers that fade in days,
          you gift a real plant filled with your personal message,
          photos, and a custom QR memory page.
        </p>

        <p style={sectionText}>
          The plant grows.
          The memory stays forever.
        </p>
      </Section>
    </div>

      {/* 🌿 HOW IT WORKS (Legacy Theme Style) */}
      <div style={legacySection}>
        <h2 style={{ ...sectionTitle, textAlign: "center" }}>
          How It Works
        </h2>

        <div style={timeline}>
          {steps.map((step, i) => (
            <div key={i} style={timelineCard}>
              <h3 style={{ color: "#14532d", marginBottom: 10 }}>
                {step.title}
              </h3>
              <p style={{ color: "#374151", fontSize: 15 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 🌿 UNIQUE SECTION */}
    <div className="fade-in">
      <Section>
        <h2 style={sectionTitle}>What is Unique in PA Roots?</h2>

        <div style={uniqueGrid}>
          {features.map((f, i) => (
            <div key={i} style={uniqueCard}>
              {f}
            </div>
          ))}
        </div>

        <h3 style={{ marginTop: 40, fontSize: 22, color: "#166534" }}>
          Not just a plant.
          <br />
          A memory… planted.
        </h3>
      </Section>
    </div>

    {/* 🌿 BULK ORDERS SECTION */}
<div
  style={{
    marginTop: 120,
    background: "#f8f4e8",
    padding: "80px 30px",
    borderRadius: 30,
    textAlign: "center",
  }}
>
  <h2 style={{ fontSize: 34, color: "#14532d" }}>
    Planning a Bulk Order?
  </h2>

  <p
    style={{
      marginTop: 20,
      fontSize: 17,
      color: "#374151",
      maxWidth: 700,
      marginInline: "auto",
    }}
  >
    Perfect for corporate gifting, weddings, college events,
    return gifts, and special occasions.
    <br />
    Get customized Memory Plants with branding,
    personalized tags, and QR memory pages.
  </p>

  <Link href="/bulk-orders">
    <button
      style={{
        marginTop: 30,
        padding: "14px 30px",
        fontSize: 16,
        borderRadius: 14,
        border: "none",
        background: "#166534",
        color: "white",
        cursor: "pointer",
      }}
    >
      Request Bulk Quote 🌱
    </button>
  </Link>
</div>

      {/* 🌱 CTA */}
      <div style={{ textAlign: "center", marginTop: 100, marginBottom: 80 }}>
        <Link href="/plants">
          <button style={{ ...primaryBtn, padding: "16px 30px", fontSize: 18 }}>
            Create Your Memory Plant 🌱
          </button>
        </Link>
      </div>
    </div>
  );
}

/* ---------- DATA ---------- */

const steps = [
  {
    title: "1️⃣ Choose Your Plant",
    desc: "Select from Gerbera, Rose, Bonsai, Christmas Cactus & 25+ varieties.",
  },
  {
    title: "2️⃣ Add Your Memory",
    desc: "Write your personal message and upload photos. Later can be edited in your personal plant dashboard.",
  },
  {
    title: "3️⃣ We Prepare With Love",
    desc: "We attach a custom name tag and generate a private QR memory page.",
  },
  {
    title: "4️⃣ Gift a Living Memory",
    desc: "When they scan the QR code, your memories appear beautifully.",
  },
];

const features = [
  "🌿 Real growing plant",
  "💌 Fully personalized experience",
  "🔒 Private QR memory page",
  "🏷 Custom name tag",
  "🎁 Elegant eco-friendly packaging",
  "❤️ A gift that grows with time",
];

/* ---------- REUSABLE ---------- */

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 120, maxWidth: 1000, marginInline: "auto", textAlign: "center" }}>
      {children}
    </div>
  );
}

const sectionTitle: React.CSSProperties = {
  fontSize: 34,
  color: "#14532d",
  marginBottom: 20,
};

const sectionText: React.CSSProperties = {
  fontSize: 17,
  color: "#374151",
  marginTop: 10,
};

const legacySection: React.CSSProperties = {
  marginTop: 120,
  padding: "80px 20px",
  background: "#f8f4e8",
  borderRadius: 30,
};

const timeline: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 30,
  marginTop: 50,
};

const timelineCard: React.CSSProperties = {
  background: "white",
  padding: 25,
  borderRadius: 20,
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  textAlign: "center",
};

const uniqueGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
  marginTop: 40,
};

const uniqueCard: React.CSSProperties = {
  background: "#ecfdf5",
  padding: 20,
  borderRadius: 18,
  fontWeight: 600,
  color: "#166534",
};

const primaryBtn: React.CSSProperties = {
  border: "none",
  background: "#166534",
  color: "white",
  borderRadius: 12,
  padding: "10px 18px",
  cursor: "pointer",
  fontWeight: 600,
};

const outlineBtn: React.CSSProperties = {
  border: "1px solid #166534",
  background: "white",
  color: "#166534",
  borderRadius: 12,
  padding: "10px 18px",
  cursor: "pointer",
  fontWeight: 600,
};