"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function StickyLogo() {
  return (
    <div className="sticky-logo-container">
      <Link href="/" className="sticky-emblem-wrap">
        <motion.div
          className="glow-blur-layer"
          animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.6, 0.45] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <Image
          src="/Updated Logo w_ background 1.png"
          alt="Kohinoor Logo"
          width={338}
          height={163}
          className="sticky-focal-logo"
          priority
        />
      </Link>
    </div>
  );
}
