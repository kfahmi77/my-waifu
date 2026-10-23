"use client";

import { useEffect, useState } from "react";
import { InkButton, InkHeart, type StepProps } from "./shared";

// ✏️ Ganti isi surat ini dengan kata-katamu sendiri biar lebih personal
const LETTER = `Ica sayang,

Maaf ya udah bikin kamu kecewa. Aku nggak mau cari alasan, aku salah dan aku sadar itu.

Kamu itu orang yang paling penting buat aku. Liat kamu sedih gara-gara aku itu rasanya nggak enak banget.

Aku janji bakal belajar jadi lebih baik, lebih dengerin kamu, dan lebih peka.

Kamu nggak harus langsung maafin aku. Tapi aku harap kamu tahu: aku sayang kamu, banget.`;

export default function Letter({ onNext }: StepProps) {
  const [shown, setShown] = useState(0);
  const done = shown >= LETTER.length;

  useEffect(() => {
    if (done) return;
    // Hormati preferensi reduced-motion: langsung tampilkan seluruh surat
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- butuh window, client-only
      setShown(LETTER.length);
      return;
    }
    const t = setTimeout(() => setShown((n) => n + 1), 26);
    return () => clearTimeout(t);
  }, [shown, done]);

  return (
    <div>
      <p className="handwriting text-center text-xl text-ink-soft tilt-r">
        surat kecil, ditulis pelan-pelan
      </p>

      {/* Lembar surat bergaris, sedikit miring seperti diselipkan */}
      <div className="relative mt-5 -mx-2 tilt-l sm:mx-0">
        <div className="ruled relative rounded-sm bg-[#fffdf6] px-6 pb-6 pt-[22px] shadow-[0_6px_18px_rgba(58,46,40,0.12)] sm:pl-12">
          {/* garis margin merah khas buku tulis */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-8 top-0 hidden w-px bg-rose-ink/30 sm:block"
          />

          {/* Teks lengkap untuk screen reader, animasi untuk visual */}
          <p className="sr-only">{LETTER}</p>
          <p
            aria-hidden="true"
            className="handwriting min-h-[22rem] whitespace-pre-line text-[1.45rem] !leading-[32px] text-ink"
          >
            {LETTER.slice(0, shown)}
            {!done && <span className="caret text-rose-ink">|</span>}
          </p>

          {done && (
            <div className="settle mt-2 flex items-center justify-end gap-2">
              <p className="handwriting text-2xl text-rose-ink">
                — yang selalu sayang kamu
              </p>
              <InkHeart size={24} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-7 flex justify-center">
        {!done ? (
          <button
            type="button"
            onClick={() => setShown(LETTER.length)}
            className="handwriting text-xl text-ink-soft underline decoration-dotted underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-ink"
          >
            langsung baca semua
          </button>
        ) : (
          <InkButton onClick={onNext}>lanjut</InkButton>
        )}
      </div>
    </div>
  );
}
