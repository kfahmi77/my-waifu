import { InkButton, InkHeart, InkStar, type StepProps } from "./shared";

export default function Intro({ onNext }: StepProps) {
  return (
    <div className="relative text-center">
      {/* coretan kecil di pojok, seperti doodle di pinggir kertas */}
      <InkStar className="absolute -right-1 -top-3 opacity-70" size={22} />

      <InkHeart className="thump mx-auto" size={52} />

      <h1 className="handwriting mt-4 text-5xl text-ink sm:text-6xl">
        Hai, <span className="ink-underline text-rose-ink">Ica</span>...
      </h1>

      <div className="mx-auto mt-7 max-w-sm space-y-3 text-[1.05rem] leading-relaxed text-ink-soft">
        <p>Aku tahu kamu lagi kesel sama aku. Dan kamu berhak kok.</p>
        <p>
          Boleh minta waktumu sebentar? Ini aku bikin sendiri, khusus buat
          kamu.
        </p>
      </div>

      <div className="mt-9">
        <InkButton onClick={onNext}>oke, aku dengerin</InkButton>
      </div>

      <p className="handwriting mt-5 text-lg text-ink-soft/70 tilt-r">
        (pelan-pelan aja bacanya)
      </p>
    </div>
  );
}
