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
  useMotionValue,
  useMotionTemplate,
  useSpring
} from "framer-motion";
import { useEffect } from "react";
import { ChevronRight, Plus, Minus, Menu, X } from "lucide-react";
import { LayeredText } from "@/components/LayeredText";
import { MagicText, MagicTextRed } from "@/components/MagicText";

function DiagStorySection({
  diagSlides,
}: {
  diagSlides: { src: string; alt: string; label: string }[];
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

          <div className="diag-blueprint-row">
            {diagSlides.map((slide, index) => {
              const isRevealed = activeStep >= index;
              const titles = ["Diagnostics", "Expert Prescription", "Weekly Delivery"];
              return (
                <Fragment key={index}>
                  <div className={`reveal-card ${isRevealed ? 'revealed' : ''}`}>
                    <div className="reveal-card-header">
                      <div className="index-box serif">0{index + 1}</div>
                      <h3 className="card-blueprint-title serif">{titles[index]}</h3>
                    </div>
                    <motion.div
                      className="reveal-card-body"
                      initial={false}
                      animate={{
                        opacity: isRevealed ? 1 : 0,
                        height: isRevealed ? "auto" : 0,
                      }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="card-blueprint-desc">{slide.label}</p>
                      <div className="card-blueprint-visual">
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          fill
                          className="wireframe-img"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </motion.div>
                  </div>
                  {index < diagSlides.length - 1 && (
                    <div className="reveal-connector">
                      <div className="reveal-connector-track" />
                      <motion.div
                        className="reveal-connector-fill"
                        initial={false}
                        animate={{ scaleX: activeStep > index ? 1 : 0 }}
                        style={{ originX: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                    </div>
                  )}
                </Fragment>
              );
            })}
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

  // Comparison section sticky scroll-driven reveal
  const compRef = useRef<HTMLElement>(null);
  const { scrollYProgress: compScroll } = useScroll({ target: compRef, offset: ["start start", "end end"] });
  // Stage 1 (0.05 → 0.3): left text + left half of image reveal
  const leftOpacity = useTransform(compScroll, [0.05, 0.2, 0.3], [0, 1, 1]);
  const leftX = useTransform(compScroll, [0.05, 0.3], [-80, 0]);
  // Diagonal split: line goes from ~58% at top to ~42% at bottom
  const leftTopPct = useTransform(compScroll, [0.05, 0.3], [0, 58]);
  const leftBotPct = useTransform(compScroll, [0.05, 0.3], [0, 42]);
  const leftClip = useMotionTemplate`polygon(0% 0%, ${leftTopPct}% 0%, ${leftBotPct}% 100%, 0% 100%)`;
  // Pause from 0.3 → 0.45 so user can read left
  // Stage 2 (0.45 → 0.7): right text + right half reveal
  const rightOpacity = useTransform(compScroll, [0.45, 0.6, 0.7], [0, 1, 1]);
  const rightX = useTransform(compScroll, [0.45, 0.7], [80, 0]);
  const rightTopPct = useTransform(compScroll, [0.45, 0.7], [100, 58]);
  const rightBotPct = useTransform(compScroll, [0.45, 0.7], [100, 42]);
  const rightClip = useMotionTemplate`polygon(${rightTopPct}% 0%, 100% 0%, 100% 100%, ${rightBotPct}% 100%)`;
  // From 0.7 → 1.0 both sides hold their final state before sticky releases

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

  const mealsRef = useRef<HTMLDivElement>(null);

  // Stats section sticky scroll-driven reveal
  const statsRef = useRef<HTMLElement>(null);
  const { scrollYProgress: statsScroll } = useScroll({ target: statsRef, offset: ["start start", "end end"] });

  const diagSlides = [
    {
      src: "/dia.png",
      alt: "Blood Diagnostics",
      label: "Diagnostics",
    },
    {
      src: "/pre.png",
      alt: "Expert Prescription",
      label: "Expert nutrition prescription for planning of custom meals and fruits/nuts plan",
    },
    {
      src: "/delivery.png",
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

  const StatBar = ({ stat, index, progress }: { stat: any, index: number, progress: any }) => {
    const countRef = useRef<HTMLSpanElement>(null);
    // Per-bar timeline (each bar gets ~28% of the section scroll):
    //   Bar 0:  fill 0.04→0.20 | text 0.16→0.30
    //   Bar 1:  fill 0.30→0.46 | text 0.42→0.56
    //   Bar 2:  fill 0.56→0.72 | text 0.68→0.82
    // Hold from 0.82 → 1.0 so user can read everything before sticky releases
    const slot = 0.26;
    const barStart = 0.04 + index * slot;
    const barEnd = barStart + 0.16;
    const targetPct = parseInt(stat.pct);
    const targetHeight = parseInt(stat.height);

    const heightPct = useTransform(progress, [barStart, barEnd], [0, targetHeight]);
    const heightStyle = useTransform(heightPct, (v: number) => `${v}%`);
    const countMotion = useTransform(progress, [barStart, barEnd], [0, targetPct]);

    useMotionValueEvent(countMotion, "change", (latest) => {
      if (countRef.current) {
        countRef.current.textContent = `${Math.floor(latest)}%`;
      }
    });

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
        style={{ willChange: "transform, opacity" }}
      >
        <div className="stat-bar-outer">
          <div className="stat-bar-backdrop"></div>
          <div
            className="stat-bar-glow"
            style={{ background: stat.glowColor, opacity: 0.4 }}
          />
          <motion.div
            className="stat-bar-inner"
            style={{ background: stat.gradient, height: heightStyle, transformOrigin: "bottom", willChange: "height", overflow: 'hidden' }}
          >
            <div className="stat-bar-wave wave-1" />
            <div className="stat-bar-wave wave-2" />
            <div className="stat-bar-shimmer" style={{ animationDelay: `${index * 0.3}s` }} />
            <div className="stat-bar-edge" />
            <div className="stat-pct">
              <span ref={countRef}>0%</span>
            </div>
          </motion.div>
        </div>
        <div className="stat-info">
          <p className="stat-label serif" style={{ color: '#ff5a3d' }}>{stat.label}</p>
          <p className="stat-description">{stat.desc}</p>
        </div>
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
              Take The First Step!
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
                Take The First Step!
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
      <section className="stats-section" ref={statsRef}>
        <div className="stats-sticky">
          <div className="container">
            <motion.h2 {...fadeInUp} className="stats-heading serif">
              Hyderabad is growing fast. <br />
              So are lifestyle diseases.
            </motion.h2>

            <div className="stats-grid">
              {stats.map((stat, i) => (
                <StatBar key={i} stat={stat} index={i} progress={statsScroll} />
              ))}
            </div>
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
                text="You’re not unhealthy. You’re just out of balance.  Sorted! THE SOLUTION Your meals are full. Your schedule is packed. Your routine is consistent. But your nutrition isn’t."
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
      <section id="learn" className="comparison-section" ref={compRef} style={{ isolation: 'isolate' }}>
        <div className="comparison-sticky">
          <div className="container">
            <div className="comp-header">
              <h2 className="comp-title serif">
                <span className="comp-title-row">
                  <span className="comp-title-left">
                    <span className="red">Your Meals Fills</span>
                    <span className="grey">Nutrition Completes</span>
                  </span>
                  <span className="bold-black">You</span>
                </span>
              </h2>
              <div className="comp-divider" />
            </div>

            <div className="comp-visual-grid">
              <motion.div
                className="comp-col-left"
                style={{ opacity: leftOpacity, x: leftX }}
              >
                <h3 className="comp-label serif">Your Daily Routine</h3>
                <p className="comp-text-small">
                  Daily meals in Hyderabad are filling and energy-rich — built around rice, roti, curries, and quick bites. They keep you going through busy days, but often lack essential vitamins, minerals, and micronutrients your body needs consistently.
                </p>
              </motion.div>

              <div className="meals-composite-wrap" ref={mealsRef}>
                <div className="comp-image-stack">
                  {/* Sizing layer — invisible base image to define container size */}
                  <Image
                    src="/meals/Group_3.png"
                    alt=""
                    width={800}
                    height={500}
                    priority
                    aria-hidden
                    className="comp-image-base"
                  />
                  {/* Left half — revealed in stage 1 */}
                  <motion.div
                    className="comp-image-layer"
                    style={{
                      clipPath: leftClip,
                      WebkitClipPath: leftClip,
                    }}
                  >
                    <Image
                      src="/meals/Group_3.png"
                      alt="Daily meals"
                      width={800}
                      height={500}
                      priority
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: "contain",
                        display: 'block',
                        mixBlendMode: 'multiply',
                      }}
                    />
                  </motion.div>
                  {/* Right half — revealed in stage 2 */}
                  <motion.div
                    className="comp-image-layer"
                    style={{
                      clipPath: rightClip,
                      WebkitClipPath: rightClip,
                    }}
                  >
                    <Image
                      src="/meals/Group_3.png"
                      alt="Body needs"
                      width={800}
                      height={500}
                      priority
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: "contain",
                        display: 'block',
                        mixBlendMode: 'multiply',
                      }}
                    />
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="comp-col-right"
                style={{ opacity: rightOpacity, x: rightX }}
              >
                <h3 className="comp-label serif">What your Body Needs</h3>
                <p className="comp-text-small">
                  Daily Nutrition Target: 2–3 servings of fruits per day to support energy, immunity, and overall balance.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIAGNOSTICS SECTION ===== */}
      <DiagStorySection diagSlides={diagSlides} />

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

              <span className="footer-badge">Shri Lakshmi Kohinoor Enterprises Pvt. Ltd</span>
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
                <a href="https://wa.me/919491337052" target="_blank" rel="noopener noreferrer" className="footer-contact-text hover:underline">+91 94913 37052</a>
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
          <p className="footer-copy">&copy; 2026 Shri Lakshmi Kohinoor Enterprises Pvt. Ltd. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}
