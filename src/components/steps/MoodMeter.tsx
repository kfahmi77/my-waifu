"use client";

import { useState } from "react";
import { InkButton, type StepProps } from "./shared";

const LEVELS = [
  { label: "dikit", text: "Cuma dikit? Syukurlah... tapi aku tetap mau minta maaf." },
  { label: "lumayan", text: "Hmm, lumayan ya. Aku siap dengerin semua keluhanmu." },
  { label: "kesel", text: "Oke, aku pantas dapet ini. Maaf ya, sayang." },
  { label: "kesel banget", text: "Waduh... aku siapin seblak + boba sebagai jaminan." },
  { label: "maksimal", text: "Level maksimal. Aku sujud virtual dulu." },
];

/* Wajah digambar tangan: alis & mulut berubah sesuai level (0–4). */
function InkFace({ level }: { level: number }) {
  const t = level / 4; // 0 = kalem, 1 = marah banget
  const brow = 2 + t * 9; // kemiringan alis
  const mouth = 8 - t * 16; // >0 senyum, <0 cemberut
  const color = "#3a2e28";

  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className="mx-auto"
    >
      {/* kepala: lingkaran yang sengaja tidak rapi */}
      <path
        d="M50 8c24 0 42 17 41 42-1 24-19 42-42 41C25 90 8 72 9 48 10 25 27 8 50 8Z"
        stroke={color}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* pipi merah makin terlihat saat makin kesel */}
      <ellipse cx="27" cy="60" rx="7" ry="4" fill="#a8405b" opacity={0.12 + t * 0.35} />
      <ellipse cx="73" cy="60" rx="7" ry="4" fill="#a8405b" opacity={0.12 + t * 0.35} />
      {/* alis */}
      <path
        d={`M27 ${34 - brow / 2}L42 ${34 + brow / 2}`}
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        style={{ transition: "d .35s ease" }}
      />
      <path
        d={`M73 ${34 - brow / 2}L58 ${34 + brow / 2}`}
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        style={{ transition: "d .35s ease" }}
      />
      {/* mata */}
      <circle cx="35" cy="46" r="2.8" fill={color} />
      <circle cx="65" cy="46" r="2.8" fill={color} />
      {/* mulut */}
      <path
        d={`M36 70Q50 ${70 + mouth} 64 70`}
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        style={{ transition: "d .35s ease" }}
      />
      {/* uap marah di level tinggi */}
      {level >= 3 && (
        <g stroke="#a8405b" strokeWidth="2" strokeLinecap="round">
          <path d="M84 14c3 3-1 5 2 8" />
          <path d="M91 22c3 3-1 5 2 8" />
        </g>
      )}
    </svg>
  );
}

export default function MoodMeter({ onNext }: StepProps) {
  const [level, setLevel] = useState(4);
  const current = LEVELS[level];

  return (
    <div className="text-center">
      <h2 className="handwriting text-4xl text-ink">
        Seberapa kesel kamu sekarang?
      </h2>
      <p className="mt-2 text-sm text-ink-soft">Jujur aja, geser sesukamu.</p>

      <div className="my-6">
        <InkFace level={level} />
        <p className="handwriting mt-1 text-2xl text-rose-ink tilt-l">
          {current.label}
        </p>
      </div>

      <label htmlFor="mood" className="sr-only">
        Tingkat kekesalan
      </label>
      <input
        id="mood"
        type="range"
        min={0}
        max={LEVELS.length - 1}
        value={level}
        onChange={(e) => setLevel(Number(e.target.value))}
        className="ink-range w-full"
        aria-valuetext={`${current.label}: ${current.text}`}
      />
      <div className="handwriting mt-1 flex justify-between text-lg text-ink-soft">
        <span>dikit</span>
        <span>banget!!</span>
      </div>

      <p
        className="mx-auto mt-5 min-h-[3.5rem] max-w-sm leading-relaxed text-ink"
        aria-live="polite"
      >
        {current.text}
      </p>

      <div className="mt-6">
        <InkButton onClick={onNext}>terus?</InkButton>
      </div>
    </div>
  );
}
