import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #ecfdf5, #f0fdf4)",
        padding: 20,
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
          {/* 🌱 Plant Login (customer admin) */}
          <Link href="/login">
            <button
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                border: "1px solid #166534",
                background: "white",
                color: "#166534",
                cursor: "pointer",
              }}
            >
              Plant Login 🌱
            </button>
          </Link>

          {/* 🌿 Buy Plant */}
          <Link href="/plants">
            <button
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                border: "none",
                background: "#166534",
                color: "white",
                cursor: "pointer",
              }}
            >
              Buy a Plant 🌿
            </button>
          </Link>
        </div>
      </div>

      {/* ❤️ Hero Section */}
      <div
        style={{
          textAlign: "center",
          marginTop: 100,
          maxWidth: 700,
          marginInline: "auto",
        }}
      >
        <h1
          style={{
            fontSize: 42,
            color: "#14532d",
            lineHeight: 1.2,
          }}
        >
          Grow Love.
          <br />
          Keep Memories Alive.
        </h1>

        <p
          style={{
            marginTop: 20,
            fontSize: 18,
            color: "#374151",
          }}
        >
          Adopt a living plant, attach your memories,
          and let love grow forever through PA Roots.
        </p>

        <Link href="/plants">
          <button
            style={{
              marginTop: 30,
              padding: "14px 26px",
              fontSize: 16,
              borderRadius: 12,
              border: "none",
              background: "#166534",
              color: "white",
              cursor: "pointer",
            }}
          >
            Start Your Memory 🌱
          </button>
        </Link>
      </div>
    </div>
  );
}
