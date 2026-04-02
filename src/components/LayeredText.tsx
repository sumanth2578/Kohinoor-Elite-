"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface LayeredTextProps {
  lines?: Array<{ top: string; bottom: string }>
  fontSize?: string
  lineHeight?: number
  className?: string
}

export function LayeredText({
  lines = [
    { top: "\u00A0", bottom: "Personalised Plans" },
    { top: "Personalised Plans", bottom: "Saved Cost" },
    { top: "Saved Cost", bottom: "More Energy" },
    { top: "More Energy", bottom: "\u00A0" },
  ],
  fontSize = "clamp(2.5rem, 5vw, 4.5rem)",
  lineHeight = 80,
  className = "",
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const calculateTranslateX = (index: number) => {
    const baseOffset = 35
    const centerIndex = Math.floor(lines.length / 2)
    return (index - centerIndex) * baseOffset
  }

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    timelineRef.current = gsap.timeline({ paused: true })

    const allTops = container.querySelectorAll("[data-layer-top]")
    const allBottoms = container.querySelectorAll("[data-layer-bottom]")

    timelineRef.current.to(allTops, {
      y: -lineHeight,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
    }, 0)

    timelineRef.current.to(allBottoms, {
      y: -lineHeight,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
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
  }, [lines, lineHeight])

  const textStyle = {
    fontFamily: "var(--font-serif)",
    color: "#0a0a0a",
    fontWeight: 900 as const,
    textShadow: "2px 2px 0px rgba(0,0,0,0.15), 4px 4px 0px rgba(0,0,0,0.08), 6px 6px 12px rgba(0,0,0,0.1)",
    WebkitTextStroke: "0.5px rgba(0,0,0,0.1)",
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
          const tx = calculateTranslateX(index)
          const isEven = index % 2 === 0

          return (
            <li
              key={index}
              data-layered-item
              style={{
                position: "relative",
                overflow: "hidden",
                height: `${lineHeight}px`,
                width: "100%",
                zIndex: index,
                marginBottom: "6px",
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
                  height: `${lineHeight}px`,
                  lineHeight: `${lineHeight}px`,
                  padding: "0 15px",
                  margin: 0,
                  whiteSpace: "nowrap",
                  ...textStyle,
                }}
              >
                {line.top}
              </p>
              <p
                data-layer-bottom
                style={{
                  position: "absolute",
                  top: `${lineHeight}px`,
                  left: 0,
                  width: "100%",
                  height: `${lineHeight}px`,
                  lineHeight: `${lineHeight}px`,
                  padding: "0 15px",
                  margin: 0,
                  whiteSpace: "nowrap",
                  ...textStyle,
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
