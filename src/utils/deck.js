export const SUITS = ['♠', '♥', '♦', '♣'];
export const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const createDeck = () => {
  const deck = [];
  for (let suit of SUITS) {
    for (let value of VALUES) {
      deck.push({ suit, value });
    }
  }
  return shuffle(deck);
};

export const shuffle = (deck) => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

export const getCardValue = (card) => {
  if (!card) return 0;
  if (card.value === 'A') return 11;
  if (['K', 'Q', 'J'].includes(card.value)) return 10;
  return parseInt(card.value);
};

export const calculateHandValue = (cards) => {
  let sum = 0;
  let aces = 0;

  cards.forEach(card => {
    if (card.value === 'A') {
      aces++;
    } else {
      sum += getCardValue(card);
    }
  });

  // Handle aces
  while (aces > 0) {
    if (sum + 11 <= 21) {
      sum += 11;
    } else {
      sum += 1;
    }
    aces--;
  }

  return sum;
};

export const isBlackjack = (cards) => {
  return cards.length === 2 && calculateHandValue(cards) === 21;
};

export const isBust = (cards) => {
  return calculateHandValue(cards) > 21;
};

export const compareHands = (playerCards, dealerCards) => {
  const playerValue = calculateHandValue(playerCards);
  const dealerValue = calculateHandValue(dealerCards);
  
  if (playerValue > 21) return 'dealer';
  if (dealerValue > 21) return 'player';
  if (playerValue > dealerValue) return 'player';
  if (dealerValue > playerValue) return 'dealer';
  return 'tie';
};
