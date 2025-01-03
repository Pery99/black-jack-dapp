import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 relative">
      <img
        src="/krank-logo.jpg"
        alt="Krank Logo"
        className="w-full h-full object-contain"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      <div className="hidden w-full h-full rounded-xl bg-gradient-to-r from-accent-2 to-accent-3 items-center justify-center text-2xl font-bold text-white">
        K
      </div>
    </div>
    <motion.h1
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-2xl sm:text-3xl md:text-4xl font-casino bg-clip-text text-transparent bg-gradient-game tracking-wider"
    >
      $Krank
    </motion.h1>
  </div>
);

// Add this line to ensure proper export
export default Logo;
