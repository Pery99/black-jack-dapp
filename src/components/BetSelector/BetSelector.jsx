import React from 'react';
import { motion } from 'framer-motion';

const predefinedBets = [0.1, 0.5, 1, 2, 5];

const BetSelector = ({ value, onChange, onPlaceBet, disabled }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {predefinedBets.map((amount) => (
          <motion.button
            key={amount}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(amount)}
            disabled={disabled}
            className={`px-3 py-2 rounded-lg text-sm md:text-base transition-all duration-200 font-casino tracking-wide 
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
              ${value === amount
                ? 'bg-brand-purple text-white'
                : 'bg-surface border border-surface-border text-white hover:border-brand-purple'
              }`}
          >
            {amount} SOL
          </motion.button>
        ))}
      </div>

      {/* Custom Amount Input */}
      <div className="flex flex-col xs:flex-row gap-2">
        <div className="relative flex-1 min-w-0">
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            className="w-full bg-secondary border border-surface-border rounded-lg px-3 py-2 text-sm text-white appearance-none"
            placeholder="Custom amount"
            step="0.1"
            min="0"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">SOL</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange(0)}
          className="px-3 py-2 bg-accent-1/20 text-accent-1 rounded-lg hover:bg-accent-1/30 transition-all text-sm"
        >
          Clear
        </motion.button>
      </div>

      {/* Bet Actions */}
      <div className="grid grid-cols-2 gap-1.5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange(value * 2)}
          disabled={!value}
          className="px-3 py-2 text-sm bg-accent-2/20 text-accent-2 rounded-lg hover:bg-accent-2/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Double
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange(value / 2)}
          disabled={!value}
          className="px-3 py-2 text-sm bg-accent-3/20 text-accent-3 rounded-lg hover:bg-accent-3/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Half
        </motion.button>
      </div>

      {/* Place Bet Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onPlaceBet}
        disabled={!value || value <= 0 || disabled}
        className="w-full py-3 font-casino tracking-wide text-lg bg-gradient-game text-white rounded-lg 
        transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed 
        hover:shadow-neon"
      >
        {disabled ? 'Game in Progress' : `Place ${value > 0 ? `${value} SOL` : 'Bet'}`}
      </motion.button>
    </div>
  );
};

export default BetSelector;