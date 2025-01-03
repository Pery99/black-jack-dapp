import React from 'react';
import { motion } from 'framer-motion';

const GameControls = ({ gameState, onDeal, onHit, onStand }) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-4 relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onDeal}
        className="game-button w-24 py-2.5"
        disabled={gameState !== "idle"}
      >
        Deal
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onHit}
        className="game-button w-24 py-2.5"
        disabled={gameState !== "playing"}
      >
        Hit
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStand}
        className="game-button w-24 py-2.5"
        disabled={gameState !== "playing"}
      >
        Stand
      </motion.button>
    </div>
  );
};

export default GameControls;
