import { motion } from 'motion/react';

interface HealthBarProps {
  health: number;
  maxHealth: number;
  playerName: string;
  isPlayer1: boolean;
}

export function HealthBar({ health, maxHealth, playerName, isPlayer1 }: HealthBarProps) {
  const healthPercentage = (health / maxHealth) * 100;

  return (
    <div className={`flex flex-col gap-2 ${isPlayer1 ? 'items-start' : 'items-end'}`}>
      <p className="text-white font-bold text-xl">{playerName}</p>
      <div className="w-80 h-8 bg-gray-800 border-4 border-yellow-600 rounded-lg overflow-hidden">
        <motion.div
          className={`h-full ${
            healthPercentage > 60
              ? 'bg-green-500'
              : healthPercentage > 30
              ? 'bg-yellow-500'
              : 'bg-red-500'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: `${healthPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
