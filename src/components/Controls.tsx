import { motion } from 'motion/react';

interface ControlsProps {
  isBotMode: boolean;
}

export function Controls({ isBotMode }: ControlsProps) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 rounded-xl p-6 border-2 border-yellow-600"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="text-yellow-400 font-bold text-xl mb-4 text-center">УПРАВЛЕНИЕ</h3>
      <div className="grid grid-cols-2 gap-8">
        {/* Player 1 */}
        <div className="text-white">
          <p className="font-bold text-lg mb-2 text-yellow-300">Игрок 1 (Слева):</p>
          <div className="space-y-1 text-sm">
            <p><span className="font-bold text-yellow-200">J K</span> - Движение</p>
            <p><span className="font-bold text-green-300">W</span> - Прыжок 💫</p>
            <p><span className="font-bold text-green-300">E</span> - Уклонение 💨</p>
            <p><span className="font-bold text-yellow-200">A</span> - Удар</p>
            <p><span className="font-bold text-yellow-200">S</span> - Пинок</p>
            <p><span className="font-bold text-yellow-200">D</span> - Блок</p>
            <p><span className="font-bold text-cyan-300">Q</span> - 🔥 УЛЬТА</p>
          </div>
        </div>

        {/* Player 2 */}
        <div className="text-white">
          <p className="font-bold text-lg mb-2 text-yellow-300">
            {isBotMode ? 'БОТ (Справа):' : 'Игрок 2 (Справа):'}
          </p>
          {isBotMode ? (
            <div className="space-y-1 text-sm">
              <p className="text-gray-400">Управляется ИИ</p>
            </div>
          ) : (
            <div className="space-y-1 text-sm">
              <p><span className="font-bold text-yellow-200">← →</span> - Движение</p>
              <p><span className="font-bold text-green-300">↑</span> - Прыжок 💫</p>
              <p><span className="font-bold text-green-300">↓</span> - Уклонение 💨</p>
              <p><span className="font-bold text-yellow-200">1</span> - Удар</p>
              <p><span className="font-bold text-yellow-200">2</span> - Пинок</p>
              <p><span className="font-bold text-yellow-200">3</span> - Блок</p>
              <p><span className="font-bold text-pink-300">4</span> - 🔥 УЛЬТА</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}