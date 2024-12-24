import { useState, useEffect } from 'react';
import { playSound } from '../utils/sounds';

export const useBlackjack = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameState, setGameState] = useState('idle');
  const [stats, setStats] = useState({
    wins: 0,
    losses: 0,
    ties: 0,
    totalGames: 0,
    biggestWin: 0,
  });

  const calculateHand = (cards) => {
    let sum = 0;
    let aces = 0;
    cards.forEach(card => {
      if (card.value === 'A') aces++;
      else sum += ['K','Q','J'].includes(card.value) ? 10 : parseInt(card.value);
    });
    while (aces > 0) {
      sum += sum + 11 <= 21 ? 11 : 1;
      aces--;
    }
    return sum;
  };

  // Add game logic methods here
  const dealCards = () => {
    // Implementation
    playSound('card');
  };

  const hit = () => {
    // Implementation
    playSound('card');
  };

  const stand = () => {
    // Implementation
  };

  return {
    playerHand,
    dealerHand,
    gameState,
    stats,
    dealCards,
    hit,
    stand,
    calculateHand
  };
};
