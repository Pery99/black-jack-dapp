import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useBlackjack } from '../../hooks/useBlackjack';
import { playSound } from '../../utils/sounds';
import Logo from '../Header/Logo';
import WalletButton from '../Header/WalletButton';
import GameTable from './GameTable';
import SidePanel from './SidePanel';

const GameContent = () => {
  const { gameState, stats, calculateHand } = useBlackjack();
  const [betAmount, setBetAmount] = useState(0);
  const [dealerCards, setDealerCards] = useState([
    { suit: "♠", value: "A" },
    { suit: "♥", value: "10" },
  ]);
  const [playerCards, setPlayerCards] = useState([
    { suit: "♦", value: "J" },
    { suit: "♣", value: "8" },
  ]);

  const handlePlaceBet = () => {
    if (betAmount <= 0) return;
    playSound("chip");
    setGameState("betting");
    console.log(`Placing bet of ${betAmount} SOL`);
  };

  return (
    <div className="min-h-screen bg-gradient-dark bg-fixed px-2 sm:px-4 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 p-2 sm:p-0">
          <Logo />
          <WalletButton />
        </header>

        <div className="grid lg:grid-cols-12 gap-4 sm:gap-8">
          <GameTable 
            gameState={gameState}
            dealerCards={dealerCards}
            playerCards={playerCards}
            calculateHand={calculateHand}
          />
          <SidePanel 
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            onPlaceBet={handlePlaceBet}
            stats={stats}
          />
        </div>
      </div>
    </div>
  );
};

export default GameContent;
