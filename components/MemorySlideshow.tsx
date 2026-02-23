"use client";

import { useEffect, useState } from "react";

export default function MemorySlideshow({
  photos,
}: {
  photos: string[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev === photos.length - 1 ? 0 : prev + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [photos]);

  return (
    <img
      src={photos[index]}
      alt="memory"
      style={image}
    />
  );
}

const image: React.CSSProperties = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
};