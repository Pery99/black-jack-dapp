import React from 'react';
import { motion } from 'framer-motion';

const HandTotal = ({ total, label, isDealer, hidden }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`absolute ${
      isDealer ? "top-0" : "bottom-0"
    } left-1/2 -translate-x-1/2 z-20 px-6 py-2 rounded-full 
    bg-surface/95 border-2 border-surface-border backdrop-blur-xl shadow-neon
    flex items-center gap-3 min-w-[120px] justify-center transform
    ${isDealer ? "-translate-y-1/2" : "translate-y-1/2"}`}
  >
    <div className={`w-3 h-3 rounded-full ${hidden ? "bg-brand-red" : "bg-brand-purple"} animate-pulse`}></div>
    <span className="text-white text-base font-casino whitespace-nowrap">
      {label}: <span className="text-brand-purple font-bold ml-1">{hidden ? "?" : total}</span>
    </span>
  </motion.div>
);

export default HandTotal;
