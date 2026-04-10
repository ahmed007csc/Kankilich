import { useState } from 'react';
import { motion } from 'motion/react';
import { FighterData } from './HumanFighter';
import { ArrowLeft } from 'lucide-react';
import { BotDifficulty } from '../App';

interface CharacterSelectProps {
  onSelectComplete: (player1: FighterData, player2: FighterData, isBotMode: boolean, difficulty: BotDifficulty) => void;
  initialBotMode?: boolean;
  onBack?: () => void;
}

export const FIGHTERS: FighterData[] = [
  {
    id: 'manasch',
    name: 'Манасчи',
    color: '#7c3aed',
    description: 'Сказитель эпоса Манас',
    specialMove: 'Эпическое Слово',
    outfit: {
      skin: '#d4a574',
      shirt: '#7c3aed',
      pants: '#4c1d95',
      hat: '#7c3aed',
    },
  },
  {
    id: 'komuzchu',
    name: 'Комузчу',
    color: '#2563eb',
    description: 'Музыкант с комузом',
    specialMove: 'Звуковая Волна',
    outfit: {
      skin: '#d4a574',
      shirt: '#2563eb',
      pants: '#1e3a8a',
      hat: '#3b82f6',
    },
  },
  {
    id: 'baatyr',
    name: 'Баатыр',
    color: '#dc2626',
    description: 'Кыргызский богатырь',
    specialMove: 'Удар Богатыря',
    outfit: {
      skin: '#d4a574',
      shirt: '#dc2626',
      pants: '#991b1b',
      hat: '#ef4444',
    },
  },
  {
    id: 'berkutchu',
    name: 'Беркутчу',
    color: '#f59e0b',
    description: 'Охотник с беркутом',
    specialMove: 'Атака Беркута',
    outfit: {
      skin: '#d4a574',
      shirt: '#f59e0b',
      pants: '#92400e',
      hat: '#fbbf24',
    },
  },
];

export function CharacterSelect({ onSelectComplete, initialBotMode = false, onBack }: CharacterSelectProps) {
  const [selectedP1, setSelectedP1] = useState<FighterData | null>(null);
  const [selectedP2, setSelectedP2] = useState<FighterData | null>(null);
  const [isBotMode, setIsBotMode] = useState(initialBotMode);
  const [botDifficulty, setBotDifficulty] = useState<BotDifficulty>('medium');

  const handleStart = () => {
    if (selectedP1 && selectedP2) {
      onSelectComplete(selectedP1, selectedP2, isBotMode, botDifficulty);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-orange-900 to-yellow-800 flex flex-col items-center justify-center p-8 relative">
      {/* Kygyz ornament pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`,
        }}
      />

      {/* Back Button */}
      {onBack && (
        <motion.button
          onClick={onBack}
          className="absolute top-8 left-8 z-20 px-6 py-3 text-xl font-bold rounded-xl border-4 border-yellow-600 bg-gray-800 text-yellow-400 hover:border-yellow-400 hover:bg-gray-700 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-6 h-6" />
          НАЗАД
        </motion.button>
      )}

      {/* Title */}
      <motion.h1
        className="text-7xl font-bold mb-12 relative z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          background: 'linear-gradient(to bottom, #fcd34d, #f59e0b, #dc2626)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 30px rgba(220, 38, 38, 0.5)',
        }}
      >
        ВЫБОР БОЙЦОВ
      </motion.h1>

      {/* Player Selection */}
      <div className="grid grid-cols-2 gap-16 mb-8 relative z-10">
        {/* Player 1 */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-yellow-300 mb-6">ИГРОК 1</h2>
          <div className="grid grid-cols-2 gap-4">
            {FIGHTERS.map((fighter) => (
              <motion.button
                key={fighter.id}
                onClick={() => setSelectedP1(fighter)}
                className={`p-6 rounded-xl border-4 ${
                  selectedP1?.id === fighter.id
                    ? 'border-yellow-400 bg-yellow-900 shadow-lg shadow-yellow-400/50'
                    : 'border-gray-600 bg-gray-800 hover:border-gray-400'
                } transition-all`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-gray-700"
                  style={{ backgroundColor: fighter.color }}
                />
                <p className="text-white font-bold text-lg">{fighter.name}</p>
                <p className="text-gray-400 text-sm mt-1">{fighter.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Player 2 */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-yellow-300 mb-6">ИГРОК 2</h2>
          <div className="grid grid-cols-2 gap-4">
            {FIGHTERS.map((fighter) => (
              <motion.button
                key={fighter.id}
                onClick={() => setSelectedP2(fighter)}
                className={`p-6 rounded-xl border-4 ${
                  selectedP2?.id === fighter.id
                    ? 'border-yellow-400 bg-yellow-900 shadow-lg shadow-yellow-400/50'
                    : 'border-gray-600 bg-gray-800 hover:border-gray-400'
                } transition-all`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-gray-700"
                  style={{ backgroundColor: fighter.color }}
                />
                <p className="text-white font-bold text-lg">{fighter.name}</p>
                <p className="text-gray-400 text-sm mt-1">{fighter.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Bot Mode Toggle */}
      <motion.button
        onClick={() => setIsBotMode(!isBotMode)}
        className={`mb-6 px-8 py-3 text-xl font-bold rounded-xl border-4 relative z-10 ${
          isBotMode
            ? 'border-green-400 bg-green-900 text-green-300'
            : 'border-gray-600 bg-gray-800 text-gray-400'
        } transition-all`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isBotMode ? '🤖 РЕЖИМ ПРОТИВ БОТА' : '👥 РЕЖИМ 2 ИГРОКОВ'}
      </motion.button>

      {/* Difficulty Selection */}
      {isBotMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 relative z-10"
        >
          <h3 className="text-2xl font-bold text-yellow-300 mb-4 text-center">СЛОЖНОСТЬ БОТА</h3>
          <div className="flex gap-4 justify-center">
            <motion.button
              onClick={() => setBotDifficulty('easy')}
              className={`px-6 py-3 text-lg font-bold rounded-xl border-4 transition-all ${
                botDifficulty === 'easy'
                  ? 'border-green-400 bg-green-900 text-green-300 shadow-lg shadow-green-400/50'
                  : 'border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              😊 ЛЕГКИЙ
            </motion.button>
            <motion.button
              onClick={() => setBotDifficulty('medium')}
              className={`px-6 py-3 text-lg font-bold rounded-xl border-4 transition-all ${
                botDifficulty === 'medium'
                  ? 'border-yellow-400 bg-yellow-900 text-yellow-300 shadow-lg shadow-yellow-400/50'
                  : 'border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              😐 СРЕДНИЙ
            </motion.button>
            <motion.button
              onClick={() => setBotDifficulty('hard')}
              className={`px-6 py-3 text-lg font-bold rounded-xl border-4 transition-all ${
                botDifficulty === 'hard'
                  ? 'border-red-400 bg-red-900 text-red-300 shadow-lg shadow-red-400/50'
                  : 'border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              😈 СЛОЖНЫЙ
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Start Button */}
      <motion.button
        onClick={handleStart}
        disabled={!selectedP1 || !selectedP2}
        className={`px-12 py-6 text-3xl font-bold rounded-xl relative z-10 ${
          selectedP1 && selectedP2
            ? 'bg-yellow-500 text-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/50'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        } transition-all`}
        whileHover={selectedP1 && selectedP2 ? { scale: 1.1 } : {}}
        whileTap={selectedP1 && selectedP2 ? { scale: 0.95 } : {}}
      >
        НАЧАТЬ БОЙ!
      </motion.button>
    </div>
  );
}