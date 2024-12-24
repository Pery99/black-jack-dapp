import { useState, useEffect } from 'react';
import { playSound } from '../utils/sounds';
import { 
  createDeck, 
  calculateHandValue, 
  isBlackjack, 
  isBust, 
  compareHands 
} from '../utils/deck';

export const useBlackjack = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameState, setGameState] = useState('idle');
  const [currentBet, setCurrentBet] = useState(0);
  const [balance, setBalance] = useState(10); // Starting balance in SOL
  const [stats, setStats] = useState({
    wins: 0,
    losses: 0,
    ties: 0,
    totalGames: 0,
    biggestWin: 0,
  });

  useEffect(() => {
    const initialDeck = createDeck();
    setDeck(initialDeck);
    setPlayerHand([]);
    setDealerHand([]);
  }, []);

  const calculateHand = (cards) => {
    return calculateHandValue(cards);
  };

  const dealCards = (betAmount) => {
    if (betAmount <= 0 || betAmount > balance) return;
    
    playSound('chip');
    const newDeck = deck.length < 10 ? createDeck() : [...deck];
    const playerCards = [newDeck.pop(), newDeck.pop()];
    const dealerCards = [newDeck.pop(), newDeck.pop()];
    
    setDeck(newDeck);
    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
    setCurrentBet(betAmount);
    setBalance(prev => prev - betAmount);
    
    // Check for immediate blackjack
    if (isBlackjack(playerCards)) {
      endRound('player');
      return;
    }
    
    setGameState('playing');
    playSound('card');
  };

  const hit = () => {
    if (gameState !== 'playing') return;
    
    const newDeck = [...deck];
    const newCard = newDeck.pop();
    const newHand = [...playerHand, newCard];
    
    playSound('card');
    setDeck(newDeck);
    setPlayerHand(newHand);
    
    if (isBust(newHand)) {
      endRound('dealer');
    }
  };

  const stand = () => {
    if (gameState !== 'playing') return;
    
    let newDeck = [...deck];
    let newDealerHand = [...dealerHand];
    
    while (calculateHandValue(newDealerHand) < 17) {
      const newCard = newDeck.pop();
      newDealerHand.push(newCard);
      playSound('card');
    }
    
    setDeck(newDeck);
    setDealerHand(newDealerHand);
    
    const winner = compareHands(playerHand, newDealerHand);
    endRound(winner);
  };

  const endRound = (winner) => {
    let winAmount = 0;
    
    if (winner === 'player') {
      winAmount = currentBet * 2;
      setBalance(prev => prev + winAmount);
      playSound('win');
      setStats(prev => ({
        ...prev,
        wins: prev.wins + 1,
        totalGames: prev.totalGames + 1,
        biggestWin: Math.max(prev.biggestWin, currentBet)
      }));
    } else if (winner === 'tie') {
      winAmount = currentBet;
      setBalance(prev => prev + winAmount);
      setStats(prev => ({
        ...prev,
        ties: prev.ties + 1,
        totalGames: prev.totalGames + 1
      }));
    } else {
      playSound('lose');
      setStats(prev => ({
        ...prev,
        losses: prev.losses + 1,
        totalGames: prev.totalGames + 1
      }));
    }
    
    setGameState(winner);
    setTimeout(() => setGameState('idle'), 2000);
  };

  return {
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
  };
};
