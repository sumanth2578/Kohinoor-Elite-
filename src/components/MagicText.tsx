"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface MagicTextProps {
  text: string;
  className?: string;
  progress?: MotionValue<number>;
  x?: MotionValue<number>;
  y?: MotionValue<number>;
}

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: any }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, [
    "rgba(255, 255, 255, 0.15)",
    "rgba(255, 255, 255, 1)",
  ]);

  return (
    <motion.span
      style={{ opacity, color, display: "inline-block", marginRight: "0.3em" }}
    >
      {word}
    </motion.span>
  );
}

function RedWord({ word, range, progress }: { word: string; range: [number, number]; progress: any }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, [
    "rgba(255, 59, 31, 0.15)",
    "rgba(255, 59, 31, 1)",
  ]);

  return (
    <motion.span
      style={{
        opacity,
        color,
        display: "inline-block",
        marginRight: "0.3em",
        fontWeight: 700,
        fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
      }}
    >
      {word}
    </motion.span>
  );
}

export function MagicText({ text, className, progress, x, y }: MagicTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: localScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const activeProgress = progress || localScrollYProgress;
  const words = text.split(" ");

  return (
    <motion.div ref={containerRef} className={className} style={{ position: "relative", x, y }}>
      <p style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          return (
            <Word key={i} word={word} range={[start, end]} progress={activeProgress} />
          );
        })}
      </p>
    </motion.div>
  );
}

export function MagicTextRed({ text, className, progress, x, y }: MagicTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: localScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const activeProgress = progress || localScrollYProgress;
  const words = text.split(" ");

  return (
    <motion.div ref={containerRef} className={className} style={{ position: "relative", x, y }}>
      <p style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          return (
            <RedWord key={i} word={word} range={[start, end]} progress={activeProgress} />
          );
        })}
      </p>
    </motion.div>
  );
}

