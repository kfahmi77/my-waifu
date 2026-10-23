import type { CSSProperties, ReactNode } from "react";

export type StepProps = {
  onNext: () => void;
};

/* =========================================================
   Hand-drawn SVG accents — digambar dengan path "tangan",
   bukan emoji. Semua pakai stroke supaya terasa seperti tinta.
   ========================================================= */

type IconProps = {
  className?: string;
  style?: CSSProperties;
  size?: number;
  color?: string;
};

export function InkHeart({
  className,
  style,
  size = 40,
  color = "#a8405b",
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 44"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M24 40C10 30 3 22 3 14 3 8 7.5 4 12.5 4 17 4 21 7 24 11c3-4 7-7 11.5-7C40.5 4 45 8 45 14c0 8-7 16-21 26Z"
        stroke={color}
        strokeWidth="2.4"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function InkFlower({
  className,
  style,
  size = 40,
  color = "#a8405b",
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="2.2" strokeLinejoin="round" fill="none">
        <path d="M24 22c-6-7-1-16 0-16s6 9 0 16Z" />
        <path d="M24 22c7-6 16-1 16 0s-9 6-16 0Z" />
        <path d="M24 22c6 7 1 16 0 16s-6-9 0-16Z" />
        <path d="M24 22c-7 6-16 1-16 0s9-6 16 0Z" />
        <circle cx="24" cy="22" r="3.4" fill={color} stroke="none" />
      </g>
    </svg>
  );
}

export function InkStar({
  className,
  style,
  size = 28,
  color = "#7c8a5a",
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M16 3v26M3 16h26M7 7l18 18M25 7 7 25"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InkArrow({
  className,
  style,
  size = 44,
  color = "#6b5d53",
}: IconProps) {
  return (
    <svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 88 44"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M4 26c14-10 44-16 74-14M60 4c8 4 14 7 18 8-5 4-9 9-11 16"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function InkScribble({
  className,
  style,
  color = "#a8405b",
}: IconProps) {
  return (
    <svg
      width="120"
      height="14"
      viewBox="0 0 120 14"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M2 8c18-6 30 5 46-1s28-6 44 2"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* =========================================================
   Selotip kertas — diletakkan absolut di pojok kartu.
   ========================================================= */
export function Tape({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return <span className={`tape ${className ?? ""}`} style={style} aria-hidden="true" />;
}

/* =========================================================
   Tombol yang terasa di-cap tangan, bukan pil candy-pink.
   ========================================================= */
export function InkButton({
  children,
  onClick,
  tone = "rose",
}: {
  children: ReactNode;
  onClick: () => void;
  tone?: "rose" | "sage";
}) {
  const color = tone === "sage" ? "#7c8a5a" : "#a8405b";
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative inline-flex items-center gap-2 bg-transparent px-6 py-2 handwriting text-2xl transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
      style={{ color }}
    >
      {/* bingkai oval coretan tangan */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 220 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M30 8C80 2 150 2 196 9c18 3 20 36 2 41-52 8-128 8-176 1C4 48 2 14 30 8Z"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          className="transition-[stroke-width] duration-200 group-hover:[stroke-width:3]"
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
