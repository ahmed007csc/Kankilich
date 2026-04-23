import { motion } from 'motion/react';
import { Swords, Users, Bot } from 'lucide-react';

interface MainMenuProps {
  onStartGame: (mode: 'pvp' | 'bot') => void;
}

export function MainMenu({ onStartGame }: MainMenuProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-orange-900 to-yellow-800 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`,
        }}
      />

      {/* Animated swords falling in background */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-6xl opacity-20"
          initial={{ y: -100, x: Math.random() * window.innerWidth, rotate: Math.random() * 360 }}
          animate={{
            y: window.innerHeight + 100,
            rotate: Math.random() * 360 + 360,
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'linear',
          }}
        >
          🗡️
        </motion.div>
      ))}

      {/* Main Title */}
      <motion.div
        className="relative z-10 mb-16"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <h1
          className="text-9xl font-bold mb-4"
          style={{
            background: 'linear-gradient(to bottom, #fcd34d, #f59e0b, #dc2626)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 50px rgba(220, 38, 38, 0.8)',
            filter: 'drop-shadow(0 0 20px rgba(220, 38, 38, 0.6))',
          }}
        >
          КАН КЫЛЫЧ
        </h1>
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Swords className="w-12 h-12 text-yellow-400" />
          <p className="text-3xl text-yellow-300 font-bold tracking-widest">КЫРГЫЗ ФАЙТИНГ</p>
          <Swords className="w-12 h-12 text-yellow-400" />
        </motion.div>
      </motion.div>

      {/* Menu Buttons */}
      <div className="relative z-10 flex flex-col gap-6">
        <motion.button
          onClick={() => onStartGame('pvp')}
          className="group relative px-16 py-8 text-3xl font-bold rounded-2xl border-4 border-yellow-500 bg-gradient-to-b from-yellow-600 to-orange-600 text-white hover:from-yellow-500 hover:to-orange-500 transition-all shadow-2xl hover:shadow-yellow-500/50"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Users className="w-10 h-10 inline-block mr-4" />
          2 ИГРОКА
          <motion.div
            className="absolute inset-0 rounded-2xl bg-yellow-400/20"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <motion.button
          onClick={() => onStartGame('bot')}
          className="group relative px-16 py-8 text-3xl font-bold rounded-2xl border-4 border-green-500 bg-gradient-to-b from-green-600 to-emerald-700 text-white hover:from-green-500 hover:to-emerald-600 transition-all shadow-2xl hover:shadow-green-500/50"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.1, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bot className="w-10 h-10 inline-block mr-4" />
          ПРОТИВ БОТА
          <motion.div
            className="absolute inset-0 rounded-2xl bg-green-400/20"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-8 text-yellow-300/60 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Выберите режим игры
      </motion.div>
    </div>
  );
}
