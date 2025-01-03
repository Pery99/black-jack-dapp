import React from 'react';
import { motion } from 'framer-motion';
import BetSelector from '../BetSelector/BetSelector';
import GameStats from './GameStats';

const PanelHeading = ({ children }) => (
  <div className="relative mb-6">
    <h2 className="text-xl font-casino tracking-wider bg-gradient-to-r from-accent-1 via-accent-2 to-accent-1/50 bg-clip-text text-transparent">
      {children}
    </h2>
    <div className="absolute -bottom-2 left-0 w-1/3 h-0.5 bg-gradient-to-r from-accent-1 to-transparent"></div>
  </div>
);

const BalanceSection = ({ balance, onClaim }) => (
  <div className="mb-6 p-4 bg-surface-lighter rounded-lg border border-surface-border">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-accent-1 text-sm">Balance</h3>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClaim}
        className="px-3 py-1 text-xs font-casino bg-gradient-game text-white rounded-full hover:shadow-neon transition-all duration-300"
      >
        Claim balance
      </motion.button>
    </div>
    <div className="text-text-primary text-2xl font-bold font-casino">{balance} SOL</div>
  </div>
);

const SidePanel = ({ betAmount, setBetAmount, onPlaceBet, stats, balance, gameState, showStats = true }) => {
  const handleClaim = async () => {
    try {
      // Add your claim logic here
      console.log('Claiming rewards...');
      // Example: await claimRewards();
    } catch (error) {
      console.error('Error claiming rewards:', error);
    }
  };

  return (
    <div className="lg:col-span-4 space-y-4">
      <motion.div
        className="bg-surface border border-surface-border rounded-xl p-4 sm:p-6 backdrop-blur-xl"
        whileHover={{ scale: 1.01 }}
      >
        <PanelHeading>
          {gameState === 'idle' ? 'Place Your Bet' : 'Current Bet'}
        </PanelHeading>
        <BalanceSection balance={balance} onClaim={handleClaim} />
        <BetSelector
          value={betAmount}
          onChange={setBetAmount}
          onPlaceBet={onPlaceBet}
          disabled={gameState !== 'idle'}
        />
      </motion.div>

      {/* Stats Panel - Only show on desktop or when showStats is true */}
      {showStats && (
        <motion.div
          className="bg-surface border border-surface-border rounded-xl p-4 sm:p-6 backdrop-blur-xl"
          whileHover={{ scale: 1.01 }}
        >
          <PanelHeading>Game Statistics</PanelHeading>
          <GameStats stats={stats} />
        </motion.div>
      )}
    </div>
  );
};

export default SidePanel;
