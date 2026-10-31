"use client";

import { useEffect, useState } from "react";
import { InkHeart, InkScribble } from "./shared";

// ✏️ Sesuaikan kupon dengan hal yang Ica suka
const VOUCHERS = [
  { title: "Traktir boba", desc: "Ukuran large, topping bebas" },
  { title: "Makan sepuasnya", desc: "Kamu yang pilih tempatnya" },
  { title: "Trip Jogja berdua", desc: "Kamu yang atur, aku yang nyetir" },
  { title: "Movie date", desc: "Film pilihanmu, aku nggak protes" },
  { title: "Kamu menang debat", desc: "Berlaku 1x, tanpa syarat" },
  { title: "Peluk unlimited", desc: "Tidak ada tanggal kedaluwarsa" },
];

type Scrap = {
  id: number;
  dx: number;
  dy: number;
  w: number;
  h: number;
  color: string;
};

// Step terakhir: onNext tidak dipakai
export default function Celebration() {
  const [scraps, setScraps] = useState<Scrap[]>([]);
  const [claimed, setClaimed] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Potongan kertas sobek, warna tinta & kertas — bukan emoji
    const colors = ["#a8405b", "#7c8a5a", "#e9dcc2", "#b98a5e", "#fbf6ea"];
    // eslint-disable-next-line react-hooks/set-state-in-effect -- posisi acak harus client-only
    setScraps(
      Array.from({ length: 34 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 140 + Math.random() * 280;
        return {
          id: i,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          w: 6 + Math.random() * 10,
          h: 4 + Math.random() * 8,
          color: colors[i % colors.length],
        };
      }),
    );
  }, []);

  const claim = (i: number) => setClaimed((prev) => new Set(prev).add(i));

  return (
    <div className="text-center">
      {scraps.map((s) => (
        <span
          key={s.id}
          aria-hidden="true"
          className="confetti"
          style={
            {
              "--dx": `${s.dx}px`,
              "--dy": `${s.dy}px`,
              width: s.w,
              height: s.h,
              background: s.color,
              boxShadow: "0 1px 1px rgba(58,46,40,.15)",
            } as React.CSSProperties
          }
        />
      ))}

      <InkHeart className="thump mx-auto" size={56} />
      <h2 className="handwriting mt-3 text-5xl text-rose-ink">
        Makasih, sayang.
      </h2>
      <InkScribble className="mx-auto mt-1" />
      <p className="mx-auto mt-4 max-w-sm leading-relaxed text-ink">
        Aku janji nggak akan sia-siain kesempatan ini.
      </p>
      <p className="mt-1 text-sm text-ink-soft">
        Sebagai tanda maaf, ini kupon buat kamu. Pencet buat klaim.
      </p>

      <ul className="mt-7 grid gap-4 sm:grid-cols-2">
        {VOUCHERS.map((v, i) => {
          const isClaimed = claimed.has(i);
          return (
            <li key={v.title} className={`ticket-wrap ${i % 2 ? "tilt-r" : "tilt-l"}`}>
              <button
                type="button"
                onClick={() => claim(i)}
                disabled={isClaimed}
                aria-label={`${v.title}. ${v.desc}${isClaimed ? ". Sudah diklaim" : ""}`}
                className="ticket group relative flex w-full items-stretch text-left transition-transform duration-200 enabled:hover:-translate-y-0.5 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-ink"
              >
                {/* sobekan kiri: nomor kupon */}
                <span className="flex w-14 shrink-0 flex-col items-center justify-center border-r-2 border-dashed border-ink-soft/30 py-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                    no
                  </span>
                  <span className="handwriting text-3xl text-rose-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <span className="flex-1 px-4 py-3">
                  <span className="handwriting block text-2xl leading-none text-ink">
                    {v.title}
                  </span>
                  <span className="mt-1 block text-xs text-ink-soft">
                    {v.desc}
                  </span>
                </span>

                {isClaimed && (
                  <span
                    aria-hidden="true"
                    className="stamp absolute right-3 top-1/2 rounded-sm border-2 border-rose-ink px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-rose-ink"
                  >
                    diklaim
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="handwriting mt-8 text-xl text-ink-soft tilt-r">
        p.s. screenshot halaman ini ya, buat bukti sah.
      </p>
    </div>
  );
}
