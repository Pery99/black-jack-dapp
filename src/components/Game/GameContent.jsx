import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useBlackjack } from '../../hooks/useBlackjack';
import { playSound } from '../../utils/sounds';
import Logo from '../Header/Logo';
import WalletButton from '../Header/WalletButton';
import GameTable from './GameTable';
import SidePanel from './SidePanel';
import GameStats from './GameStats';
import { useSettings } from '../../context/SettingsContext';
import TabNavigation from '../Mobile/TabNavigation';

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
  const [activeTab, setActiveTab] = useState('bets'); // Changed default tab to bets

  // Auto-switch tabs based on game state
  useEffect(() => {
    if (gameState === 'playing' || gameState === 'dealer' || gameState === 'player' || gameState === 'tie') {
      setActiveTab('game');
    } else if (gameState === 'idle') {
      setActiveTab('bets');
    }
  }, [gameState]);

  const handlePlaceBet = () => {
    if (betAmount <= 0 || betAmount > balance) return;
    dealCards(betAmount);
    setActiveTab('game'); // Switch to game tab after placing bet
  };

  const handleGameAction = (action) => {
    if (action === 'hit') hit();
    if (action === 'stand') stand();
  };

  return (
    <div className="min-h-screen bg-gradient-dark bg-fixed px-2 sm:px-4 py-4 sm:py-8 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 p-2 sm:p-0">
          <Logo />
          <WalletButton />
        </header>

        {/* Mobile View */}
        <div className="block md:hidden">
          {activeTab === 'game' && (
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
          )}
          {activeTab === 'bets' && (
            <SidePanel 
              betAmount={betAmount}
              setBetAmount={setBetAmount}
              onPlaceBet={handlePlaceBet}
              stats={stats}
              balance={balance}
              gameState={gameState}
              showStats={false}
            />
          )}
          {activeTab === 'stats' && (
            <div className="bg-surface border border-surface-border rounded-xl p-4">
              <h2 className="text-xl font-casino text-brand-purple mb-4">Game Statistics</h2>
              <GameStats stats={stats} />
            </div>
          )}
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-12 gap-8">
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
      
      {/* Mobile Navigation - Added gameState prop */}
      <TabNavigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        gameState={gameState}
      />
    </div>
  );
};

export default GameContent;
