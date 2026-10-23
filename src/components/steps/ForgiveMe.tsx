"use client";

import { useRef, useState } from "react";
import { InkButton, InkHeart, type StepProps } from "./shared";

const NO_TEXTS = [
  "nggak",
  "yakin?",
  "beneran nih?",
  "pikir lagi dong",
  "plis...",
  "aku nangis nih",
  "hmph",
];

export default function ForgiveMe({ onNext }: StepProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const [noCount, setNoCount] = useState(0);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  // Tombol "nggak" kabur ke posisi acak di dalam area
  const runAway = () => {
    const area = areaRef.current;
    if (!area) return;
    const { width, height } = area.getBoundingClientRect();
    setPos({
      x: Math.random() * Math.max(width - 130, 0),
      y: Math.random() * Math.max(height - 44, 0),
    });
    setNoCount((c) => c + 1);
  };

  // Tombol "iya" makin besar tiap kali "nggak" dikejar
  const yesScale = Math.min(1 + noCount * 0.12, 1.9);

  return (
    <div className="text-center">
      <InkHeart className="thump mx-auto" size={56} />
      <h2 className="handwriting mt-4 text-4xl text-ink sm:text-5xl">
        <span className="text-rose-ink">Ica</span>, maafin aku ya?
      </h2>

      <div ref={areaRef} className="relative mt-8 h-56 w-full">
        <div
          className="absolute left-1/3 top-1/2 z-10 transition-transform duration-300"
          style={{ transform: `translate(-50%, -50%) scale(${yesScale})` }}
        >
          <InkButton onClick={onNext}>iya</InkButton>
        </div>

        <button
          type="button"
          onMouseEnter={runAway}
          onTouchStart={runAway}
          onClick={runAway}
          style={
            pos
              ? { left: pos.x, top: pos.y }
              : { left: "66%", top: "50%", transform: "translate(-50%, -50%)" }
          }
          className="handwriting absolute whitespace-nowrap px-3 py-1 text-xl text-ink-soft line-through decoration-ink-soft/40 transition-all duration-200"
        >
          {NO_TEXTS[Math.min(noCount, NO_TEXTS.length - 1)]}
        </button>
      </div>

      {noCount >= 3 && (
        <p className="handwriting settle text-lg text-ink-soft tilt-r">
          tombolnya emang nggak mau dipencet, maaf ya
        </p>
      )}
    </div>
  );
}
