"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function StickyLogo() {
  const pathname = usePathname();
  const isConnectPage = pathname === "/connect";

  return (
    <div className="sticky-logo-container">
      {isConnectPage ? (
        <Link 
          href="/" 
          style={{ 
            textDecoration: 'none', 
            color: 'white', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'rgba(255,255,255,0.1)', 
            padding: '10px 16px', 
            borderRadius: '30px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease',
            pointerEvents: 'auto'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          <ArrowLeft size={18} />
          <span style={{ fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.02em' }}>
            Back to Home
          </span>
        </Link>
      ) : (
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
      )}
    </div>
  );
}
