"use client";

import { useState } from "react";
import Intro from "./steps/Intro";
import MoodMeter from "./steps/MoodMeter";
import Letter from "./steps/Letter";
import Reasons from "./steps/Reasons";
import ForgiveMe from "./steps/ForgiveMe";
import Celebration from "./steps/Celebration";
import { Tape } from "./steps/shared";

const STEPS = [Intro, MoodMeter, Letter, Reasons, ForgiveMe, Celebration];

export default function ApologyJourney() {
  const [step, setStep] = useState(0);
  const Current = STEPS[step];
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));

  return (
    <div className="relative tilt-l2">
      {/* selotip di dua pojok supaya kertas terasa ditempel */}
      <Tape style={{ top: -12, left: 28, transform: "rotate(-8deg)" }} />
      <Tape style={{ top: -10, right: 34, transform: "rotate(7deg)" }} />

      <div className="paper relative px-6 py-9 sm:px-10 sm:py-11">
        {/* animasi settle jalan ulang tiap ganti step */}
        <div key={step} className="settle">
          <Current onNext={next} />
        </div>

        {/* progress: jahitan tangan, bukan titik candy-pink */}
        <div
          className="mt-9 flex items-center justify-center gap-2"
          aria-label={`Halaman ${step + 1} dari ${STEPS.length}`}
        >
          {STEPS.map((_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="block h-[3px] rounded-full transition-all duration-500"
              style={{
                width: i === step ? 26 : 12,
                background: i <= step ? "#a8405b" : "#cdbfa6",
                opacity: i <= step ? 1 : 0.6,
                transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
