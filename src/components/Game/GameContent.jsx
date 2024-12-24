import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useBlackjack } from '../../hooks/useBlackjack';
import { playSound } from '../../utils/sounds';
import Logo from '../Header/Logo';
import WalletButton from '../Header/WalletButton';
import GameTable from './GameTable';
import SidePanel from './SidePanel';
import { useSettings } from '../../context/SettingsContext';

const GameContent = () => {
  const {
    playerHand,
    dealerHand,
    gameState,
    stats,
    balance,
    currentBet,
    dealCards,
    hit,
    stand,
    calculateHand
  } = useBlackjack();

  const { settings } = useSettings();

  const [betAmount, setBetAmount] = useState(0);

  const handlePlaceBet = () => {
    if (betAmount <= 0 || betAmount > balance) return;
    dealCards(betAmount);
  };

  const handleGameAction = (action) => {
    if (action === 'hit') hit();
    if (action === 'stand') stand();
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
            dealerCards={dealerHand}
            playerCards={playerHand}
            calculateHand={calculateHand}
            onDeal={handlePlaceBet}
            onHit={hit}
            onStand={stand}
            animate={settings.animations}
          />
          <SidePanel 
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            onPlaceBet={handlePlaceBet}
            stats={stats}
            balance={balance}
            gameState={gameState}
          />
        </div>
      </div>
    </div>
  );
};

export default GameContent;
