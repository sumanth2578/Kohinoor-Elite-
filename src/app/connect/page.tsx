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
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        Scan this QR to connect with us on WhatsApp
      </motion.p>

      {/* Action buttons */}
      <motion.div
        className="connect-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <motion.a
          href="https://wa.me/918179337052"
          target="_blank"
          rel="noopener noreferrer"
          className="connect-btn connect-btn-wa"
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.766 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.008-3.568c0-3.639 2.961-6.592 6.592-6.592a6.55 6.55 0 0 1 4.67 1.916 6.55 6.55 0 0 1 1.916 4.67c0 3.64-2.959 6.6-6.592 6.6zm3.627-4.945c-.198-.099-1.171-.578-1.353-.643-.182-.065-.315-.099-.448.099-.133.198-.513.643-.628.775-.115.132-.231.148-.413.057-.183-.09-.773-.285-1.472-.909-.544-.485-.912-1.082-1.02-1.263-.108-.182-.011-.28.08-.37.085-.084.198-.219.297-.329.099-.11.132-.182.198-.314.066-.132.033-.248-.016-.351-.05-.103-.448-1.078-.614-1.477-.161-.392-.326-.339-.448-.345-.115-.007-.247-.008-.379-.008s-.347.049-.529.248c-.182.198-.694.678-.694 1.653 0 .975.723 1.916.822 2.049.099.133 1.42 2.167 3.44 3.042.48.207.855.33 1.149.423.483.155.922.133 1.269.08.391-.059 1.205-.492 1.374-.967.169-.475.169-.882.119-.967-.05-.084-.182-.133-.379-.232z"/>
          </svg>
        </motion.a>
      </motion.div>
    </main>
  );
}
