import React from 'react';
import { motion } from 'framer-motion';
import BetSelector from '../BetSelector/BetSelector';
import GameStats from './GameStats';

const PanelHeading = ({ children }) => (
  <div className="relative mb-6">
    <h2 className="text-xl font-casino tracking-wider bg-gradient-to-r from-brand-red via-brand-purple to-brand-pink bg-clip-text text-transparent">
      {children}
    </h2>
    <div className="absolute -bottom-2 left-0 w-1/3 h-0.5 bg-gradient-to-r from-brand-red to-transparent"></div>
  </div>
);

const SidePanel = ({ betAmount, setBetAmount, onPlaceBet, stats }) => {
  return (
    <div className="lg:col-span-4 space-y-4">
      <motion.div
        className="bg-surface/90 border border-surface-border rounded-xl p-4 sm:p-6 backdrop-blur-xl"
        whileHover={{ scale: 1.01 }}
      >
        <PanelHeading>Place Your Bet</PanelHeading>
        <BetSelector
          value={betAmount}
          onChange={setBetAmount}
          onPlaceBet={onPlaceBet}
        />
      </motion.div>

      <motion.div
        className="bg-surface/90 border border-surface-border rounded-xl p-4 sm:p-6 backdrop-blur-xl"
        whileHover={{ scale: 1.01 }}
      >
        <PanelHeading>Game Statistics</PanelHeading>
        <GameStats stats={stats} />
      </motion.div>
    </div>
  );
};

export default SidePanel;
