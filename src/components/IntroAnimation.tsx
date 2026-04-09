"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Realfood.gov-inspired intro animation.
 * Three food items (orange, brazil nut, dates) fly in from off-screen,
 * scale up, rotate, settle around the title, then the overlay fades out.
 */
export function IntroAnimation() {
  const [show, setShow] = useState(true);
  const [blurPhase, setBlurPhase] = useState(false);

  useEffect(() => {
    // Lock body scroll while intro is playing
    document.body.style.overflow = "hidden";
    
    // Trigger blur phase once text is visible
    const blurTimer = setTimeout(() => {
      setBlurPhase(true);
    }, 2500);

    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 4200); // Slightly extended to show the blur effect longer

    return () => {
      clearTimeout(timer);
      clearTimeout(blurTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const items = [
    {
      src: "/intro/orange.svg",
      alt: "Orange",
      from: { x: "-60vw", y: "-40vh", rotate: -120 },
      to: { x: "-22vw", y: "5vh", rotate: -8 },
      size: 260,
      delay: 0.1,
    },
    {
      src: "/intro/brazil-nut.svg",
      alt: "Brazil Nut",
      from: { x: "0vw", y: "-70vh", rotate: 90 },
      to: { x: "0vw", y: "-2vh", rotate: 12 },
      size: 220,
      delay: 0.25,
    },
    {
      src: "/intro/dates.svg",
      alt: "Dates",
      from: { x: "60vw", y: "-40vh", rotate: 140 },
      to: { x: "22vw", y: "6vh", rotate: -10 },
      size: 250,
      delay: 0.4,
    },
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          <div className="intro-stage">
            {items.map((item, i) => (
              <motion.div
                key={i}
                className="intro-item"
                initial={{
                  x: item.from.x,
                  y: item.from.y,
                  rotate: item.from.rotate,
                  scale: 0.4,
                  opacity: 0,
                  filter: "blur(0px)",
                }}
                animate={{
                  x: item.to.x,
                  y: item.to.y,
                  rotate: item.to.rotate,
                  scale: blurPhase ? 0.9 : 1,
                  opacity: blurPhase ? 0.3 : 1,
                  filter: blurPhase ? "blur(12px)" : "blur(0px)",
                }}
                transition={{
                  duration: blurPhase ? 1.5 : 1.4,
                  delay: blurPhase ? 0 : item.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ zIndex: blurPhase ? 1 : 10 }}
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5 + item.delay,
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.size}
                    height={item.size}
                    priority
                    style={{
                      width: `${item.size}px`,
                      height: "auto",
                      objectFit: "contain",
                      filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))",
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}

            <motion.div
              className="intro-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
              style={{ zIndex: 20 }}
            >
              <motion.h1 
                className="intro-title serif"
                animate={{ scale: blurPhase ? 1.05 : 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                KOHINOOR
              </motion.h1>
              <motion.p 
                className="intro-tagline"
                animate={{ scale: blurPhase ? 1.1 : 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                Elite Living.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
