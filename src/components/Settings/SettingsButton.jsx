import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';

const SettingsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings } = useSettings();

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 flex items-center justify-center bg-surface border border-surface-border rounded-full shadow-neon"
      >
        <span className="text-2xl">⚙️</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-20 right-4 z-50 w-72 bg-surface border border-surface-border rounded-xl p-4 shadow-card"
            >
              <h3 className="text-lg font-casino text-accent-1 text-brand-purple mb-4">
                Game Settings
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-white">Sound Effects</label>
                  <button
                    onClick={() =>
                      updateSettings({ soundEnabled: !settings.soundEnabled })
                    }
                    className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                      settings.soundEnabled ? "bg-accent-2" : "bg-gray-600"
                    } relative`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform duration-200 ${
                        settings.soundEnabled ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-white">Animations</label>
                  <button
                    onClick={() =>
                      updateSettings({ animations: !settings.animations })
                    }
                    className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                      settings.animations ? "bg-accent-2" : "bg-gray-600"
                    } relative`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform duration-200 ${
                        settings.animations ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SettingsButton;
