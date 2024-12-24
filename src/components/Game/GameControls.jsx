import React from 'react';
import { motion } from 'framer-motion';

const GameControls = ({ gameState, onDeal, onHit, onStand }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center items-center mt-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onDeal}
        className="w-full sm:w-auto px-8 py-3 bg-accent-2 text-white rounded-lg font-casino tracking-wider"
        disabled={gameState !== "idle"}
      >
        Deal
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onHit}
        className="w-full sm:w-auto px-8 py-3 bg-accent-3 text-white rounded-lg font-casino tracking-wider"
        disabled={gameState !== "playing"}
      >
        Hit
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStand}
        className="w-full sm:w-auto px-8 py-3 bg-accent-1 text-white rounded-lg font-casino tracking-wider"
        disabled={gameState !== "playing"}
      >
        Stand
      </motion.button>
    </div>
  );
};

export default GameControls;
