"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TyperEffectProps {
  words: string[];
  className?: string;
}

export const TyperEffect = ({ words, className = "" }: TyperEffectProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Safety: avoid rendering blank/NaN when words is empty
  if (!words?.length) return null;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="inline-flex items-baseline justify-center min-w-[100px] sm:min-w-[140px] md:min-w-[180px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`inline-block ${className}`}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
