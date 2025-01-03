import React from "react";

const GameStatistics = ({ stats }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-casino text-accent-1 mb-4">Game Statistics</h2>
      <div className="space-y-2">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-accent-2 font-medium">{key}</span>
            <span className="text-accent-1 font-casino">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameStatistics;
