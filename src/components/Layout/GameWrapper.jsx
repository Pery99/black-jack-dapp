import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Splash from '../Splash/Splash';
import GameContent from '../Game/GameContent';

const GameWrapper = () => {
  const { connected } = useWallet();

  return (
    <div className="w-full min-h-screen">
      {!connected ? <Splash /> : <GameContent />}
    </div>
  );
};

export default GameWrapper;
