import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';

const WalletButton = () => {
  const { publicKey, disconnect } = useWallet();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-4 py-2 bg-surface rounded-full border border-surface-border hover:bg-accent-2/10 transition-all text-white font-casino"
      >
        <span className="h-2 w-2 rounded-full bg-accent-2 animate-pulse"></span>
        {publicKey
          ? `${publicKey.toString().slice(0, 6)}...${publicKey.toString().slice(-4)}`
          : "Connect Wallet"}
      </button>
      {showDropdown && publicKey && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={disconnect}
          className="absolute top-full mt-2 right-0 px-4 py-2 bg-accent-1/20 text-accent-1 rounded-lg hover:bg-accent-1/30 transition-all font-casino"
        >
          Disconnect
        </motion.button>
      )}
    </div>
  );
};

export default WalletButton;
