import React from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

const Splash = () => {
  const { connecting } = useWallet();

  return (
    <div
      style={{
        backgroundImage: "url(/krank-bg.png)",
      }}
      className="fixed inset-0 bg-casino-green flex items-center justify-center bg-blend-saturation bg-no-repeat bg-center bg-cover"
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 text-center p-8 bg-chip-black rounded-2xl max-w-lg mx-4"
      >
        <h1 className="text-5xl font-casino text-white mb-6">
          Krank BlackJack
        </h1>
        <p className="text-white mb-8">
          Connect your Solana wallet to start playing
        </p>
        <div className={connecting ? "opacity-50 cursor-not-allowed" : ""}>
          <WalletMultiButton className="wallet-adapter-button-trigger" />
        </div>
      </motion.div>
    </div>
  );
};

export default Splash;
