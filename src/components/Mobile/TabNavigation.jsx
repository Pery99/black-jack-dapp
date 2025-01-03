import React from 'react';
import { motion } from 'framer-motion';

const TabNavigation = ({ activeTab, setActiveTab, gameState }) => {
  const tabs = [
    { id: 'bets', icon: '💰', label: 'Bets' },
    { id: 'game', icon: '🎮', label: 'Game' },
    { id: 'stats', icon: '📊', label: 'Stats' }
  ];

  // Disable game tab when in idle state
  const isTabDisabled = (tabId) => {
    if (tabId === 'game' && gameState === 'idle') return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-border p-2 z-40 md:hidden">
      <div className="flex justify-around max-w-md mx-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => !isTabDisabled(tab.id) && setActiveTab(tab.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
              isTabDisabled(tab.id) ? 'opacity-50 cursor-not-allowed' :
              activeTab === tab.id ? 'text-[#FEFCC1]' : 'text-white/60'
            }`}
            disabled={isTabDisabled(tab.id)}
          >
            <span className="text-xl mb-1">{tab.icon}</span>
            <span className="text-xs font-casino">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 h-0.5 w-12 bg-[#FEFCC1]"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
