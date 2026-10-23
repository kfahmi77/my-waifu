"use client";

import { useEffect, useState } from "react";

type Drift = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  kind: number;
  color: string;
};

// Kelopak / daun kecil digambar tangan (stroke tinta), bukan emoji.
function Petal({ kind, color }: { kind: number; color: string }) {
  if (kind === 0) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2c5 4 7 10 0 20C5 12 7 6 12 2Z"
          stroke={color}
          strokeWidth="1.6"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }
  if (kind === 1) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21C5 15 2 11 2 7 2 4 4 2 7 2c2 0 4 1 5 3 1-2 3-3 5-3 3 0 5 2 5 5 0 4-3 8-10 14Z"
          stroke={color}
          strokeWidth="1.6"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2v20M4 12h16M6 6l12 12M18 6 6 18" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function FloatingHearts() {
  // Dibuat di client agar posisi acak tidak bikin hydration mismatch
  const [items, setItems] = useState<Drift[]>([]);

  useEffect(() => {
    const colors = ["#a8405b", "#7c8a5a", "#b98a5e"];
    // eslint-disable-next-line react-hooks/set-state-in-effect -- nilai acak harus client-only
    setItems(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 16,
        duration: 16 + Math.random() * 12,
        delay: Math.random() * 14,
        driftX: (Math.random() - 0.5) * 120,
        kind: i % 3,
        color: colors[i % colors.length],
      })),
    );
  }, []);

  return (
    <div aria-hidden="true">
      {items.map((it) => (
        <span
          key={it.id}
          className="drifting"
          style={{
            left: `${it.left}%`,
            width: `${it.size}px`,
            height: `${it.size}px`,
            opacity: 0.55,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
            ["--drift-x" as string]: `${it.driftX}px`,
          }}
        >
          <Petal kind={it.kind} color={it.color} />
        </span>
      ))}
    </div>
  );
}
