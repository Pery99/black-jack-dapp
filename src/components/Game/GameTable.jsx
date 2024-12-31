import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../Cards/Card';
import HandTotal from './HandTotal';
import GameControls from './GameControls';

const GameTable = ({ 
  gameState, 
  dealerCards, 
  playerCards, 
  calculateHand,
  onDeal,
  onHit,
  onStand 
}) => {
  const dealerTotal = calculateHand(dealerCards.filter((_, i) => i !== 1));
  const playerTotal = calculateHand(playerCards);

  const getStatusMessage = (state) => {
    switch(state) {
      case 'player': return '🎉 You Won!';
      case 'dealer': return '😔 Dealer Won';
      case 'tie': return '🤝 Push - It\'s a Tie';
      case 'playing': return 'Your Turn';
      default: return 'Place your bet to start';
    }
  };

  return (
    <div className="lg:col-span-8">
      <AnimatePresence>
        {(gameState !== 'idle' || dealerCards?.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-surface border border-surface-border rounded-2xl p-4 sm:p-6 mb-20 md:mb-0"
          >
            {/* Add return to bets button when game is over */}
            {(gameState === 'player' || gameState === 'dealer' || gameState === 'tie') && (
              <div className="text-center mt-4">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-2 bg-brand-purple text-white rounded-full font-casino text-sm"
                  onClick={() => setActiveTab('bets')}
                >
                  Place New Bet
                </motion.button>
              </div>
            )}
            
            <div className="text-center mb-4">
              <span className={`px-4 py-1 rounded-full ${
                gameState === 'player' ? 'bg-accent-3/20 text-accent-3' :
                gameState === 'dealer' ? 'bg-accent-1/20 text-accent-1' :
                'bg-brand-dark text-brand-purple'
              } text-sm font-casino tracking-wide`}>
                {getStatusMessage(gameState)}
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
                <div className="flex flex-wrap justify-center gap-4">
                  {dealerCards && dealerCards.map((card, index) => (
                    <Card 
                      key={`dealer-${index}`}
                      suit={card.suit}
                      value={card.value}
                      hidden={index === 1 && gameState === 'playing'}
                      index={index}
                    />
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-surface-border/50"></div>

              {/* Player's Area */}
              <div className="min-h-[160px] sm:min-h-[200px] relative flex flex-col justify-center">
                <div className="flex flex-wrap justify-center gap-4">
                  {playerCards && playerCards.map((card, index) => (
                    <Card 
                      key={`player-${index}`}
                      suit={card.suit}
                      value={card.value}
                      index={index}
                    />
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
            <GameControls 
              gameState={gameState}
              onDeal={onDeal}
              onHit={onHit}
              onStand={onStand}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {gameState === 'idle' && !dealerCards?.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-full min-h-[400px] bg-surface/50 border border-surface-border rounded-2xl p-6"
        >
          <span className="text-4xl mb-4">🎲</span>
          <h2 className="text-2xl font-casino text-brand-purple mb-2">Welcome to Krank BlackJack</h2>
          <p className="text-white/80 text-center">Place your bet to start playing</p>
        </motion.div>
      )}
    </div>
  );
};

export default GameTable;
