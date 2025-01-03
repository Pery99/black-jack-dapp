import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ suit, value, hidden, index }) => {
  const getSuitIcon = (suit) => {
    switch(suit) {
      case '♠': return '♠';
      case '♣': return '♣';
      case '♥': return '♥';
      case '♦': return '♦';
      default: return suit;
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, rotateY: 180 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ delay: index * 0.1 }}
      className="w-[70px] h-[100px] sm:w-[80px] sm:h-[120px] rounded-lg relative card-gradient"
    >
      {!hidden ? (
        <div className="w-full h-full p-2 sm:p-3 flex flex-col justify-between text-white">
          <div className="text-sm sm:text-base font-casino">{value}</div>
          <div className="text-xl sm:text-2xl self-center font-casino">
            {getSuitIcon(suit)}
          </div>
          <div className="text-sm sm:text-base self-end rotate-180 font-casino">
            {value}
          </div>
        </div>
      ) : (
        <div className="w-full h-full rounded-lg bg-gradient-game">
          <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl font-casino text-white">
            K
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Card;
