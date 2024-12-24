import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ suit, value, hidden, index }) => {
  const getSuitColor = () => {
    return ['♥', '♦'].includes(suit) ? 'text-brand-red' : 'text-white';
  };

  const cardVariants = {
    initial: { 
      scale: 0.5, 
      opacity: 0,
      rotateY: 180,
      y: -50
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      rotateY: 0,
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  };

  if (hidden) {
    return (
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="w-24 h-36 bg-gradient-to-br from-brand-purple to-brand-pink rounded-xl shadow-card border border-surface-border backdrop-blur-xl transform hover:-translate-y-1 transition-transform duration-200"
      >
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-3xl text-white">?</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="w-24 h-36 bg-surface-lighter backdrop-blur-xl rounded-xl shadow-card border border-surface-border p-4 flex flex-col justify-between transform hover:-translate-y-1 transition-transform duration-200"
    >
      <div className={`text-xl ${getSuitColor()}`}>{value}</div>
      <div className={`text-4xl ${getSuitColor()} self-center`}>{suit}</div>
      <div className={`text-xl ${getSuitColor()} self-end rotate-180`}>{value}</div>
    </motion.div>
  );
};

export default Card;
