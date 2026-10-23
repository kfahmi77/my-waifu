"use client";

import { useState } from "react";
import {
  InkArrow,
  InkButton,
  InkFlower,
  InkHeart,
  InkStar,
  Tape,
  type StepProps,
} from "./shared";

// ✏️ Ganti dengan alasan-alasan yang nyata tentang Ica
const REASONS = [
  "Senyummu bikin hari burukku langsung membaik.",
  "Kamu selalu ada waktu aku lagi down.",
  "Makan bareng kamu, apa aja jadi enak.",
  "Ketawamu itu lucu banget, nular.",
  "Ngobrol sama kamu sampai lupa waktu.",
  "Kamu kuat dan bikin aku pengen jadi lebih baik.",
];

const ICONS = [InkFlower, InkHeart, InkStar];
// rotasi berbeda tiap kartu supaya terlihat ditempel manual
const TILTS = [-2.5, 1.8, -1.2, 2.4, -1.8, 1.1];

export default function Reasons({ onNext }: StepProps) {
  const [flipped, setFlipped] = useState<boolean[]>(() =>
    REASONS.map(() => false),
  );
  const openedCount = flipped.filter(Boolean).length;

  const toggle = (i: number) =>
    setFlipped((f) => f.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="text-center">
      <h2 className="handwriting text-4xl text-ink">
        Alasan aku <span className="ink-underline">sayang</span> kamu
      </h2>
      <p className="mt-2 flex items-center justify-center gap-2 text-sm text-ink-soft">
        buka satu-satu ya
        <InkArrow size={34} className="rotate-[25deg]" />
      </p>

      <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
        {REASONS.map((text, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={flipped[i]}
              aria-label={flipped[i] ? text : `Buka alasan ke-${i + 1}`}
              style={{ transform: `rotate(${TILTS[i]}deg)` }}
              className={`flip-card relative h-36 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-ink ${
                flipped[i] ? "flipped" : ""
              }`}
            >
              <Tape
                className="z-10"
                style={{
                  top: -10,
                  left: "50%",
                  width: 54,
                  height: 18,
                  transform: `translateX(-50%) rotate(${-TILTS[i] * 2}deg)`,
                }}
              />
              <div className="flip-inner relative h-full w-full">
                {/* depan: kertas polos bernomor */}
                <div className="flip-face absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[#f7efdd] shadow-[0_4px_10px_rgba(58,46,40,0.12)]">
                  <Icon size={30} />
                  <span className="handwriting text-2xl text-ink-soft">
                    no. {i + 1}
                  </span>
                </div>
                {/* belakang: tulisan alasannya */}
                <div className="flip-face flip-back absolute inset-0 flex items-center justify-center bg-[#fffdf6] p-3 shadow-[0_4px_10px_rgba(58,46,40,0.12)]">
                  <span className="handwriting text-[1.3rem] text-ink">
                    {text}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="handwriting mt-6 text-xl text-ink-soft" aria-live="polite">
        {openedCount < REASONS.length
          ? `${openedCount} dari ${REASONS.length} udah dibuka`
          : "...dan masih banyak lagi yang nggak muat di sini."}
      </p>

      {openedCount >= 3 && (
        <div className="settle mt-6">
          <InkButton onClick={onNext}>satu pertanyaan lagi...</InkButton>
        </div>
      )}
    </div>
  );
}
