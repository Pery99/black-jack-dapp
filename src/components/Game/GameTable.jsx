import React from 'react';
import Card from '../Cards/Card';
import HandTotal from './HandTotal';
import GameControls from './GameControls';

const GameTable = ({ gameState, dealerCards, playerCards, calculateHand }) => {
  const dealerTotal = calculateHand(dealerCards.filter((_, i) => i !== 1));
  const playerTotal = calculateHand(playerCards);

  return (
    <div className="lg:col-span-8">
      <div className="bg-surface border border-surface-border rounded-2xl p-4 sm:p-6">
        {/* Game Status */}
        <div className="text-center mb-4">
          <span className="px-4 py-1 rounded-full bg-brand-dark text-brand-purple text-sm font-casino tracking-wide">
            {gameState === "idle" ? "Place your bet to start" : gameState}
          </span>
        </div>

        {/* Cards Area Container */}
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
                <Card key={index} {...card} hidden={index === 1} index={index} />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-surface-border/50"></div>

          {/* Player's Area */}
          <div className="min-h-[160px] sm:min-h-[200px] relative flex flex-col justify-center">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {playerCards.map((card, index) => (
                <Card key={index} {...card} index={index} />
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
        <GameControls gameState={gameState} />
      </div>
    </div>
  );
};

export default GameTable;
