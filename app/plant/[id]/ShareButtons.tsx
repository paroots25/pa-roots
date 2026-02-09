"use client";

export default function ShareButtons({ memoryLink }: { memoryLink: string }) {
  const whatsappLink = `https://wa.me/?text=See this living memory 🌿 ${memoryLink}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(memoryLink);
      alert("Memory link copied 💚");
    } catch {
      alert("Copy failed");
    }
  }

  return (
    <div style={shareBox}>
      <button style={shareBtn} onClick={copyLink}>
        Copy Memory Link 🔗
      </button>

      <a href={whatsappLink} target="_blank">
        <button style={shareBtn}>Share on WhatsApp 📲</button>
      </a>

      <p style={instaText}>
        Tip: Share this link in Instagram bio to keep the memory alive ✨
      </p>
    </div>
  );
}

/* styles */
const shareBox: React.CSSProperties = {
  marginTop: 24,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  alignItems: "center",
};

const shareBtn: React.CSSProperties = {
  padding: "10px 18px",
  borderRadius: 10,
  border: "none",
  background: "#166534",
  color: "white",
  cursor: "pointer",
  fontSize: 14,
};

const instaText: React.CSSProperties = {
  fontSize: 12,
  color: "#6b7280",
};
