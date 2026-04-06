"use client";

import React, { useState, useRef, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useInView,
  useMotionValue,
  useSpring
} from "framer-motion";
import { useEffect } from "react";
import { ChevronRight, Plus, Minus, Menu, X } from "lucide-react";
import { LayeredText } from "@/components/LayeredText";
import { MagicText, MagicTextRed } from "@/components/MagicText";

function DiagStorySection({
  diagSlides,
  paraX,
  paraY
}: {
  diagSlides: { src: string; alt: string; label: string }[];
  paraX: any;
  paraY: any;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.3) setActiveStep(0);
    else if (v < 0.7) setActiveStep(1);
    else setActiveStep(2);
  });

  return (
    <section ref={sectionRef} className="diag-section blueprint-journey">
      <div className="diag-sticky">
        <div className="container relative z-10 h-full flex flex-col items-center justify-center">
          <div className="diag-header-static">
            <motion.h2
              className="diag-heading-centered serif"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
                y: useTransform(scrollYProgress, [0, 0.1], [10, 0])
              }}
            >
              What Your Body Needs
            </motion.h2>
            <motion.p
              className="diag-sub-text-blueprint narrow centered"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.7, 0.7, 0]),
                y: useTransform(scrollYProgress, [0, 0.15], [10, 0])
              }}
            >
              Not everyone needs the same nutrients. Based on your lifestyle, energy levels, and health concerns,
              your body requires a different mix of vitamins and micronutrients.
            </motion.p>
          </div>

          <div className="diag-blueprint-grid">
            {diagSlides.map((slide, index) => (
              <Fragment key={index}>
                <motion.div
                  className={`blueprint-card ${activeStep === index ? 'active' : ''}`}
                  animate={{
                    scale: activeStep === index ? 1.05 : 0.95,
                    opacity: activeStep === index ? 1 : (activeStep > index ? 0.3 : 0.1),
                    filter: activeStep === index ? 'blur(0px)' : 'blur(1px)',
                    y: activeStep === index ? -10 : 0
                  }}
                  whileHover={{
                    rotateY: index === 0 ? -8 : 8,
                    rotateX: 4,
                    scale: activeStep === index ? 1.08 : 1.02,
                    zIndex: 50
                  }}
                  style={{
                    perspective: 1000,
                    x: paraX,
                    y: paraY,
                    transformStyle: "preserve-3d"
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="card-blueprint-header" style={{ transform: "translateZ(30px)" }}>
                    <div className="index-box serif">
                      0{index + 1}
                    </div>
                    <h3 className="card-blueprint-title serif">
                      {index === 0 ? "Diagnostics" : (index === 1 ? "Expert Prescription" : "Weekly Delivery")}
                    </h3>
                  </div>

                  <div className="card-blueprint-content" style={{ transform: "translateZ(20px)" }}>
                    <p className="card-blueprint-desc narrow">
                      {slide.label}
                    </p>

                    <div className="card-blueprint-visual">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className="wireframe-img"
                        style={{ objectFit: "cover" }}
                      />
                      <div className="wireframe-grid-overlay" />
                    </div>
                  </div>
                </motion.div>

                {index < diagSlides.length - 1 && (
                  <div className="blueprint-connector">
                    <div className="connector-line-thin" />
                    <motion.div
                      className="connector-fill-blue"
                      animate={{ scaleX: activeStep > index ? 1 : 0 }}
                      style={{ originX: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const BlurIn = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2, delayChildren: delay }}
      style={{ display: "inline" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { filter: "blur(12px)", opacity: 0, y: 10 },
            visible: { filter: "blur(0px)", opacity: 1, y: 0 },
          }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-block" }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const statementRef = useRef<HTMLElement>(null);
  const { scrollYProgress: statementScroll } = useScroll({ target: statementRef, offset: ["start start", "end end"] });

  // Cursor tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax transforms for Statement text
  const paraX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const paraY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  // Video playback logic
  const mealsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mealsInView = useInView(mealsRef, { once: false, amount: 0.1 });
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    if (mealsInView) {
      setVideoEnded(false);
      // Wait for re-mount then play
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(e => console.error("Video play error:", e));
        }
      }, 50);
    }
  }, [mealsInView]);

  const diagSlides = [
    {
      src: "/diagnostics_vial.png",
      alt: "Blood Diagnostics",
      label: "Diagnostics",
    },
    {
      src: "/pexels-michelangelo-buonarroti-4176846 2.png",
      alt: "Expert Prescription",
      label: "Expert nutrition prescription for planning of custom meals and fruits/nuts plan",
    },
    {
      src: "/pexels-michelangelo-buonarroti-4176846 3.png",
      alt: "Delivery Package",
      label: "Delivery of custom fruit, nuts and seeds package every week",
    },
  ];

  const transition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition,
  };

  const stats = [
    {
      pct: "50%",
      label: "Metabolic Risk",
      desc: "Over 50% of lifestyle diseases like diabetes and heart disease are linked to diet and lifestyle choices.",
      gradient: "linear-gradient(180deg, #ff4d3a 0%, #8B0000 100%)",
      glowColor: "rgba(139, 0, 0, 0.6)",
      height: "45%"
    },
    {
      pct: "75%",
      label: "Nutrient Void",
      desc: "Over 70% of urban Indians suffer from at least one nutritional deficiency including Vitamin D, B12, and Iron.",
      gradient: "linear-gradient(180deg, #ff5533 0%, #C20000 100%)",
      glowColor: "rgba(194, 0, 0, 0.6)",
      height: "70%"
    },
    {
      pct: "90%",
      label: "Hidden Sugars",
      desc: "Nearly 90% of people in Indian cities don't consume the recommended daily fruits and Nuts.",
      gradient: "linear-gradient(180deg, #ff6644 0%, #FF1A00 100%)",
      glowColor: "rgba(255, 26, 0, 0.6)",
      height: "95%"
    },
  ];

  const faqs = [
    { q: "How is this different from buying fruits myself?", a: "You have to decide what to eat and order them repeatedly yourself but we handle all this for you and know what we sell so it is a cheaper run with enhanced quality." },
    { q: "How is my fruit/nuts box personalised?", a: "We have both generic and personalised packages. We have generic packages designed with scope for your taste consideration specifically for men, women and children seperately. We also have personalised packages which will cover everything right from your diagnostics, expert nutritionist advice followed by a personalised plan and finally delivering your custom fruits/nuts packages to home!" },
    { q: "Do I need to change my diet?", a: "No. You can continue your regular meals. We simply add the missing micronutrients your body needs — without disrupting your routine." },
    { q: "How often will I receive my box?", a: "Deliveries are planned based on the type of fruits and their shelf life. Some fruits are meant for 2-3 days, while others last longer. We ensure you always receive fresh, properly timed deliveries. (Once a week, in most of the cases.)" },
    { q: "What kind of fruits will I get?", a: "You'll receive a mix of:\n1. Seasonal fruits\n2. Premium & exotic fruits\n3. Functional fruits (for specific health goals)\nAll curated based on your personalised plan." },
    { q: "Is this suitable for everyone?", a: "Yes.\nWhether you are:\n1. A working professional\n2. Someone who goes to the gym\n3. Focused on beauty or health goals\n4. Or simply aiming for a healthier lifestyle\nEach plan is tailored specifically for you." },
    { q: "Can I customise my preferences?", a: "Yes. We take into account your:\n1. Taste preferences\n2. Allergies\nSo your plan stays effective and enjoyable." },
    { q: "Can I pause or cancel anytime?", a: "Yes. You can pause or cancel your subscription anytime without any penalties." },
    { q: "How does delivery work?", a: "We deliver weekly to ensure the peak freshness of your superfoods. All boxes are handled with care to preserve nutrient density." },
  ];

  const StatBar = ({ stat, index }: { stat: any, index: number }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.5,
          delay: index * 0.08,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="stat-card"
      >
        <div className="stat-bar-outer">
          <div className="stat-bar-backdrop"></div>
          <motion.div
            className="stat-bar-glow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
            style={{ background: stat.glowColor }}
          />
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: stat.height }}
            viewport={{ once: true, margin: "-50px" }}
            onViewportEnter={() => {
              if (hasAnimated) return;
              setHasAnimated(true);
              const end = parseInt(stat.pct);
              const duration = 0.8;
              const startTime = Date.now();
              const timer = setInterval(() => {
                const elapsed = (Date.now() - startTime) / 1000;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(eased * end));
                if (progress >= 1) {
                  setCount(end);
                  clearInterval(timer);
                }
              }, 1000 / 60);
            }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 18,
              delay: index * 0.12 + 0.15
            }}
            className="stat-bar-inner"
            style={{ background: stat.gradient }}
          >
            <div className="stat-bar-shimmer" style={{ animationDelay: `${index * 0.3}s` }} />
            <div className="stat-bar-edge" />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.12 + 0.5, duration: 0.3, ease: "backOut" }}
              className="stat-pct"
            >
              {count}%
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="stat-info"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.12 + 0.6, duration: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="stat-label serif" style={{ color: stat.glowColor?.replace('0.6', '1') || '#ff3b1f' }}>{stat.label}</p>
          <p className="stat-description">{stat.desc}</p>
        </motion.div>
      </motion.div>
    );
  };


  return (
    <div className="main-wrapper">
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section" ref={heroRef}>
        <header className="main-header">
          <motion.div
            className="header-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Empty space - StickyLogo handles emblem at top-left natively */}
          </motion.div>
          <motion.div
            className="header-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "backOut" }}
          >
            <Link href="/" className="brand-text-logo" style={{ alignItems: 'center', marginBottom: 0 }}>
              <h3 className="brand-text-main header-brand-main">KOHINOOR</h3>
              <h4 className="brand-text-sub header-brand-sub">Elite Living</h4>
            </Link>
          </motion.div>
          <motion.div
            className="header-right"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/connect" className="score-btn desktop-only">
              Get your Health Sorted!
              <ChevronRight size={18} strokeWidth={2.5} />
            </Link>
            <button
              className="hamburger-btn mobile-only"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="mobile-menu-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={28} strokeWidth={2} />
              </button>
              <Link
                href="/connect"
                className="mobile-menu-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get your Health Sorted!
                <ChevronRight size={18} strokeWidth={2.5} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="container hero-content-box"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hero-title serif"
          >
            True Nutrition Wins
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hero-para"
          >
            India has one of the richest food cultures in the world. Yet our health is quietly
            declining. Highly processed food has hollowed out our health, driving obesity,
            diabetes, heart disease, and early death. <br />
            The truth is simple: your body needs true nutrition.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hero-cta-wrap"
          >
            <Link href="#learn" className="cta-pill">
              What is True Nutrition?
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="stats-section">
        <div className="container">
          <motion.h2 {...fadeInUp} className="stats-heading serif">
            Hyderabad is growing fast. <br />
            So are lifestyle diseases.
          </motion.h2>

          <div className="stats-grid">
            {stats.map((stat, i) => (
              <StatBar key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATEMENT SECTION ===== */}
      <section className="statement-section" ref={statementRef}>
        <div className="statement-sticky">
          <div className="container">
            <h2 className="statement-heading serif">
              <BlurIn text="Hyderabad Doesn’t Need More Food. It" /> <br />
              <BlurIn text="Needs Better Nutrition." delay={0.8} />
            </h2>
            <div className="statement-para">
              <MagicText
                text="You’re not unhealthy. You’re just out of balance. Get your Health Sorted! THE SOLUTION Your meals are full. Your schedule is packed. Your routine is consistent. But your nutrition isn’t."
                className="magic-text-block"
                progress={useTransform(statementScroll, [0.15, 0.7], [0, 1])}
                x={paraX}
                y={paraY}
              />
              <MagicTextRed
                text="And over time, your body keeps adjusting — until it can’t."
                className="magic-text-block"
                progress={useTransform(statementScroll, [0.65, 0.95], [0, 1])}
                x={useTransform(paraX, (v: number) => v * 1.5)} // Slightly more movement for red text
                y={useTransform(paraY, (v: number) => v * 1.5)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== NUTRITION COMPARISON SECTION ===== */}
      <section id="learn" className="comparison-section" style={{ isolation: 'isolate' }}>
        <div className="container">
          <motion.div
            className="comp-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="comp-title serif">
              <span className="comp-title-row">
                <span className="comp-title-left">
                  <motion.span
                    className="red"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Your Meals Fills
                  </motion.span>
                  <motion.span
                    className="grey"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Nutrition Completes
                  </motion.span>
                </span>
                <motion.span
                  className="bold-black"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3, ease: "backOut" }}
                >
                  You
                </motion.span>
              </span>
            </h2>
            <motion.div
              className="comp-divider"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          <div className="comp-visual-grid">
            <motion.div
              className="comp-col-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="comp-label serif">Your Daily Routine</h3>
              <motion.p
                className="comp-text-small"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Daily meals in Hyderabad are filling and energy-rich — built around rice, roti, curries, and quick bites. They keep you going through busy days, but often lack essential vitamins, minerals, and micronutrients your body needs consistently.
              </motion.p>
            </motion.div>

            <motion.div
              className="meals-composite-wrap"
              ref={mealsRef}
              initial={{ opacity: 0, scale: 0.3, y: 60 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
                mass: 1.2,
                delay: 0.4,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotateZ: [0, 0.5, -0.5, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  background: 'transparent'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '800px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* The static image serves as the layout base and final state */}
                  <Image
                    src="/meals/Group_3.png"
                    alt="Nutrition Needs Static"
                    width={800}
                    height={500}
                    priority
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: "contain",
                      display: 'block',
                      mixBlendMode: 'multiply',
                      opacity: videoEnded ? 1 : 0, // Hide while video is active to prevent ghosting
                      transition: 'opacity 0.2s ease-in-out'
                    }}
                  />
                  {!videoEnded && mealsInView && (
                    <video
                      key="active-video-v5"
                      ref={videoRef}
                      src="/updated-ani.mp4"
                      muted
                      playsInline
                      autoPlay
                      onEnded={() => setVideoEnded(true)}
                      onError={(e) => {
                        console.error("Video element error:", e);
                        setVideoEnded(true);
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        pointerEvents: 'none',
                        mixBlendMode: 'multiply',
                        display: 'block',
                        zIndex: 10,
                        opacity: 1
                      }}
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="comp-col-right"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="comp-label serif">What your Body Needs</h3>
              <motion.p
                className="comp-text-small"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Daily Nutrition Target: 2–3 servings of fruits per day to support energy, immunity, and overall balance.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== DIAGNOSTICS SECTION ===== */}
      <DiagStorySection diagSlides={diagSlides} paraX={paraX} paraY={paraY} />

      {/* ===== BENEFITS SECTION ===== */}
      <section className="benefits-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <LayeredText
              lines={[
                { top: "\u00A0", bottom: "Personalised" },
                { top: "Personalised", bottom: "Plans" },
                { top: "Plans", bottom: "Saved" },
                { top: "Saved", bottom: "Cost" },
                { top: "Cost", bottom: "More" },
                { top: "More", bottom: "Energy" },
                { top: "Energy", bottom: "\u00A0" },
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="faq-section">
        <div className="container">
          <motion.h2
            className="faq-title serif"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="faq-accordion">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01, x: 4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="faq-trigger"
                >
                  <span className="faq-q">{`${i + 1}. ${faq.q}`}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="faq-icon"
                  >
                    {openFaq === i ? <Minus size={20} /> : <Plus size={20} />}
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="faq-answer-wrap"
                    >
                      <p className="faq-answer">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <motion.footer
        className="main-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="footer-top">
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="brand-text-logo" style={{ alignItems: 'center' }}>
              <h3 className="brand-text-main">KOHINOOR</h3>
              <h4 className="brand-text-sub" style={{ paddingLeft: 0 }}>Elite Living</h4>
            </div>
            <p className="footer-tagline">Empowering good nutrition and personally curated, tailored nutrition and Wholesome deliveries.</p>
            <div className="footer-badges">
              <span className="footer-badge">REGISTERED ENTITY DUNS</span>
              <span className="footer-badge">UAE GAMING KHIDMAT/INDIA PRIVATE LIMITED</span>
            </div>
          </motion.div>
          <div className="footer-links-group">
            <motion.div
              className="footer-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="footer-col-title">Contact Us</h4>
              <div className="footer-contact-item">
                <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div className="footer-contact-text">
                  G1, Crystal Classic Apts,<br />
                  Veera Reddy Nagar, I.E. Nacharam,<br />
                  Hyderabad, Telangana, 500076
                </div>
              </div>
              <div className="footer-contact-item">
                <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <div className="footer-contact-text">+91 81793 37052</div>
              </div>
              <div className="footer-contact-item">
                <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <div className="footer-contact-text">service@kohinoorelite.com</div>
              </div>
            </motion.div>
            <motion.div
              className="footer-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="footer-col-title">Policies</h4>
              <p><Link href="/privacy-policy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy Policy</Link></p>
              <p><Link href="/terms-conditions" style={{ textDecoration: 'none', color: 'inherit' }}>Terms & Conditions</Link></p>
              <p><Link href="/refund-cancellation" style={{ textDecoration: 'none', color: 'inherit' }}>Refund & Cancellation Policy</Link></p>
              <p><Link href="/shipping-delivery" style={{ textDecoration: 'none', color: 'inherit' }}>Shipping & Delivery Policy</Link></p>
            </motion.div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">&copy; 2026 Kohinoor Elite Living Private Limited. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}
