"use client"

import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

interface LayeredTextProps {
  lines?: Array<{ top: string; bottom: string }>
  colors?: Record<string, string>
  fontSize?: string
  lineHeight?: number
  className?: string
}

export function LayeredText({
  lines = [
    { top: "\u00A0", bottom: "Personalised" },
    { top: "Personalised", bottom: "Plans" },
    { top: "Plans", bottom: "Saved" },
    { top: "Saved", bottom: "Cost" },
    { top: "Cost", bottom: "More" },
    { top: "More", bottom: "Energy" },
    { top: "Energy", bottom: "\u00A0" },
  ],
  colors = {
    "Personalised": "#111111",
    "Plans": "#111111",
    "Saved": "#2E7D32",
    "Cost": "#2E7D32",
    "More": "#C8A96A",
    "Energy": "#C8A96A",
  },
  fontSize = "clamp(1.8rem, 3.5vw, 3rem)",
  lineHeight = 60,
  className = "",
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 480)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const lh = isMobile ? 42 : lineHeight
  const offset = isMobile ? 12 : 20

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    timelineRef.current = gsap.timeline({ paused: true })

    const allTops = container.querySelectorAll("[data-layer-top]")
    const allBottoms = container.querySelectorAll("[data-layer-bottom]")

    timelineRef.current.to(allTops, {
      y: -lh,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.06,
    }, 0)

    timelineRef.current.to(allBottoms, {
      y: -lh,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.06,
    }, 0)

    const handleMouseEnter = () => timelineRef.current?.play()
    const handleMouseLeave = () => timelineRef.current?.reverse()

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
      timelineRef.current?.kill()
    }
  }, [lines, lh])

  const getTextStyle = (word: string): React.CSSProperties => {
    const c = colors[word] || "#2F5D50"
    return {
      fontFamily: "var(--font-serif)",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "-0.02em",
      color: c,
      textShadow: `2px 2px 0px ${c}26, 4px 4px 0px ${c}14, 6px 6px 12px ${c}1a`,
      WebkitTextStroke: `0.5px ${c}1a`,
    }
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        margin: "0 auto",
        padding: "2rem 0",
        fontSize,
        fontFamily: "var(--font-serif)",
        fontWeight: 900,
        color: "#0a0a0a",
        cursor: "pointer",
        WebkitFontSmoothing: "antialiased",
        letterSpacing: "-1.5px",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {lines.map((line, index) => {
          const centerIndex = Math.floor(lines.length / 2)
          const tx = (index - centerIndex) * offset
          const isEven = index % 2 === 0

          return (
            <li
              key={index}
              data-layered-item
              style={{
                position: "relative",
                overflow: "hidden",
                height: `${lh}px`,
                width: "100%",
                zIndex: index,
                marginBottom: "4px",
                transform: `translateX(${tx}px) skew(${isEven ? "60deg, -30deg" : "0deg, -30deg"}) scaleY(${isEven ? 0.66667 : 1.33333})`,
                backfaceVisibility: "hidden",
              }}
            >
              <p
                data-layer-top
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${lh}px`,
                  lineHeight: `${lh}px`,
                  padding: "0 15px",
                  margin: 0,
                  whiteSpace: "nowrap",
                  ...getTextStyle(line.top),
                }}
              >
                {line.top}
              </p>
              <p
                data-layer-bottom
                style={{
                  position: "absolute",
                  top: `${lh}px`,
                  left: 0,
                  width: "100%",
                  height: `${lh}px`,
                  lineHeight: `${lh}px`,
                  padding: "0 15px",
                  margin: 0,
                  whiteSpace: "nowrap",
                  ...getTextStyle(line.bottom),
                }}
              >
                {line.bottom}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
