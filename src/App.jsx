import React, { useState } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
// Remove SolanaProvider import, we'll use useWallet directly
import Splash from "./components/Splash/Splash";
import Card from "./components/Cards/Card";
import { motion } from "framer-motion";
import { useBlackjack } from "./hooks/useBlackjack";
import BetSelector from "./components/BetSelector/BetSelector";

// Add new component for card count display
const HandTotal = ({ total, label, isDealer, hidden }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`absolute ${
      isDealer ? "top-2" : "bottom-2"
    } left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full 
    bg-surface/90 border border-surface-border backdrop-blur-xl shadow-neon z-10
    flex items-center gap-2 min-w-[100px] justify-center
    transform transition-all duration-300 hover:scale-105`}
  >
    <span
      className={`w-2 h-2 rounded-full ${
        hidden ? "bg-accent-1" : "bg-accent-3"
      } animate-pulse`}
    ></span>
    <span className="text-white text-sm font-casino whitespace-nowrap">
      {label}:{" "}
      <span className="text-accent-2 font-casino">{hidden ? "?" : total}</span>
    </span>
  </motion.div>
);

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
          ? `${publicKey.toString().slice(0, 6)}...${publicKey
              .toString()
              .slice(-4)}`
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

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 relative">
      {/* Logo placeholder - replace src with your logo */}
      <img
        src="/krank-logo.png"
        alt="Krank Logo"
        className="w-full h-full object-contain"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      {/* Fallback if no logo */}
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

const GameContent = () => {
  const {
    playerHand,
    dealerHand,
    gameState,
    stats,
    dealCards,
    hit,
    stand,
    calculateHand,
  } = useBlackjack();

  const { publicKey } = useWallet();
  const [betAmount, setBetAmount] = useState(0);
  const [dealerCards, setDealerCards] = useState([
    { suit: "♠", value: "A" },
    { suit: "♥", value: "10" },
  ]);
  const [playerCards, setPlayerCards] = useState([
    { suit: "♦", value: "J" },
    { suit: "♣", value: "8" },
  ]);

  const dealerTotal = calculateHand(dealerCards.filter((_, i) => i !== 1));
  const playerTotal = calculateHand(playerCards);

  const formatAddress = (address) => {
    if (!address) return "Not Connected";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handlePlaceBet = () => {
    if (betAmount <= 0) return;

    // Play chip sound
    playSound("chip");

    // Update game state
    setGameState("betting");

    // Here you would typically make your contract call
    console.log(`Placing bet of ${betAmount} SOL`);
  };

  return (
    <div className="min-h-screen bg-gradient-dark bg-fixed px-2 sm:px-4 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 p-2 sm:p-0">
          <Logo />
          <WalletButton />
        </header>

        {/* Game Area */}
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-8">
          {/* Game Table */}
          <div className="lg:col-span-8">
            <div className="bg-surface border border-surface-border rounded-2xl p-4 sm:p-6">
              {/* Game Status */}
              <div className="text-center mb-4">
                <span className="px-4 py-1 rounded-full bg-brand-dark text-brand-purple text-sm font-casino tracking-wide">
                  {gameState === "idle" ? "Place your bet to start" : gameState}
                </span>
              </div>

              {/* Cards Areas */}
              <div className="space-y-8 sm:space-y-12 relative py-4">
                {/* Dealer's Area */}
                <div className="min-h-[160px] sm:min-h-[200px] relative flex flex-col justify-center">
                  <HandTotal
                    total={dealerTotal}
                    label="Dealer"
                    isDealer={true}
                    hidden={gameState === "playing"}
                  />
                  <div className="flex flex-wrap justify-center gap-2 mt-8">
                    {dealerCards.map((card, index) => (
                      <Card key={index} {...card} hidden={index === 1} />
                    ))}
                  </div>
                </div>

                <div className="w-full h-px bg-surface-border/50"></div>

                {/* Player's Area */}
                <div className="min-h-[160px] sm:min-h-[200px] relative flex flex-col justify-center">
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {playerCards.map((card, index) => (
                      <Card key={index} {...card} />
                    ))}
                  </div>
                  <HandTotal
                    total={playerTotal}
                    label="Your Total"
                    isDealer={false}
                  />
                </div>
              </div>

              {/* Game Controls */}
              <div className="flex flex-wrap gap-2 justify-center items-center mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-3 bg-accent-2 text-white rounded-lg font-casino tracking-wider"
                  disabled={gameState !== "idle"}
                >
                  Deal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-3 bg-accent-3 text-white rounded-lg font-casino tracking-wider"
                  disabled={gameState !== "playing"}
                >
                  Hit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-3 bg-accent-1 text-white rounded-lg font-casino tracking-wider"
                  disabled={gameState !== "playing"}
                >
                  Stand
                </motion.button>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-4 space-y-4">
            {/* Betting Panel */}
            <motion.div
              className="bg-surface border border-surface-border rounded-xl p-4 sm:p-6"
              whileHover={{ scale: 1.01 }}
            >
              <h2 className="text-brand-red text-lg font-casino mb-4">
                Place Your Bet
              </h2>
              <BetSelector
                value={betAmount}
                onChange={setBetAmount}
                onPlaceBet={handlePlaceBet}
              />
            </motion.div>

            {/* Stats Panel */}
            <motion.div
              className="bg-surface border border-surface-border rounded-xl p-4 sm:p-6"
              whileHover={{ scale: 1.01 }}
            >
              <h2 className="text-brand-red text-lg font-casino mb-4">
                Game Stats
              </h2>
              <GameStats stats={stats} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap the connection logic in a new component
const GameWrapper = () => {
  const { connected } = useWallet();

  return !connected ? <Splash /> : <GameContent />;
};

// Main App component
const App = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <GameWrapper />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
