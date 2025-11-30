// modules/game/components/how-to-play-section.tsx
"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui";
import FloatingLettersBackground from "@/components/ui/floating-letters-background";

const RULES = [
  {
    step: 1,
    title: "Get a Letter",
    description: "You'll receive a starting letter to begin your word chain.",
  },
  {
    step: 2,
    title: "Type a Word",
    description: "Enter a valid word that starts with the given letter.",
  },
  {
    step: 3,
    title: "Chain It",
    description:
      "The last letter of your word becomes the next starting letter!",
  },
];

const HowToPlaySection = () => {
  const [activeRule, setActiveRule] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRule((prev) => (prev + 1) % RULES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const current = RULES[activeRule];

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-surface-900 mb-6">
        How to Play
      </h2>

      <div className="relative flex-1 flex flex-col">
        <Card className="relative overflow-hidden flex-1 bg-surface-900">
          <FloatingLettersBackground />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 transition-all duration-500">
              {current.step}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 transition-all duration-500">
              {current.title}
            </h3>
            <p className="text-surface-300 transition-all duration-500">
              {current.description}
            </p>
          </div>
        </Card>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {RULES.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveRule(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeRule === index
                  ? "bg-primary-500 w-6"
                  : "bg-surface-300 hover:bg-surface-400"
              }`}
              aria-label={`Go to rule ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowToPlaySection;
