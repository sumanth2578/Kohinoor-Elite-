"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Home } from "lucide-react";

export default function ConnectPage() {
  return (
    <main className="connect-page">
      {/* Ambient background particles */}
      <div className="connect-particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`connect-particle connect-particle-${i + 1}`} />
        ))}
      </div>

      {/* Logo with glow */}
      <motion.div
        className="connect-logo-wrap"
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="connect-glow" />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/Updated Logo w_ background 1.png"
            alt="Kohinoor Logo"
            width={200}
            height={200}
            className="connect-logo-img"
          />
        </motion.div>
      </motion.div>

      {/* QR Code */}
      <motion.div
        className="connect-qr-wrap"
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.05, boxShadow: "0 30px 80px rgba(91, 105, 75, 0.3)" }}
      >
        <Image
          src="/qr-whatsapp.png"
          alt="WhatsApp QR Code"
          width={260}
          height={260}
          className="connect-qr-img"
        />
      </motion.div>

      {/* Text */}
      <motion.p
        className="connect-text"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        Scan this QR to connect with us on WhatsApp
      </motion.p>

      {/* Action buttons */}
      <motion.div
        className="connect-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <motion.a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="connect-btn connect-btn-wa"
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle size={24} />
        </motion.a>
        <motion.div
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className="connect-btn connect-btn-home">
            <Home size={24} />
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
