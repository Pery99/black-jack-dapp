import React from 'react';
import { motion } from 'framer-motion';

const GameStats = ({ stats }) => (
  <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
    {Object.entries(stats).map(([key, value]) => (
      <motion.div
        key={key}
        whileHover={{ scale: 1.02 }}
        className="bg-surface border border-surface-border rounded-xl p-3 backdrop-blur-xl"
      >
        <h3 className="text-accent-2 text-xs sm:text-sm uppercase tracking-wider truncate">
          {key}
        </h3>
        <p className="text-white text-lg sm:text-2xl font-bold mt-1">{value}</p>
      </motion.div>
    ))}
  </div>
);

export default GameStats;
