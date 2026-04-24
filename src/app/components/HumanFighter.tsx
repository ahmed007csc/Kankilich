import { motion } from 'motion/react';
import { Zap, Music, Swords, Bird } from 'lucide-react';

export interface FighterData {
  id: string;
  name: string;
  color: string;
  description: string;
  specialMove: string;
  outfit: {
    skin: string;
    shirt: string;
    pants: string;
    hat: string;
  };
}

interface HumanFighterProps {
  fighter: FighterData;
  isPlayer1: boolean;
  isAttacking: boolean;
  isKicking: boolean;
  isBlocking: boolean;
  isSpecialAttack: boolean;
  isHit: boolean;
  isJumping: boolean;
  isDodging: boolean;
  health: number;
  position: number;
}

export function HumanFighter({
  fighter,
  isPlayer1,
  isAttacking,
  isKicking,
  isBlocking,
  isSpecialAttack,
  isHit,
  isJumping,
  isDodging,
  health,
  position,
}: HumanFighterProps) {
  const direction = isPlayer1 ? 1 : -1;

  // Уникальные элементы для каждого персонажа
  const renderSpecialFeature = () => {
    switch (fighter.id) {
      case 'manasch':
        return (
          <div className="absolute top-20 -right-20 rotate-12">
            {/* Свиток с письменами */}
            <div className="relative">
              <div className="w-10 h-28 bg-amber-100 border-4 border-amber-800 rounded-lg shadow-xl">
                <div className="absolute top-2 left-2 right-2 h-1 bg-purple-600 rounded" />
                <div className="absolute top-5 left-2 right-2 h-1 bg-purple-500 rounded" />
                <div className="absolute top-8 left-2 right-2 h-1 bg-purple-600 rounded" />
                <div className="absolute top-11 left-2 right-2 h-1 bg-purple-400 rounded" />
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-red-700 rounded-t-lg border-2 border-red-900" />
            </div>
          </div>
        );
      case 'komuzchu':
        return (
          <div className="absolute top-20 -right-24 -rotate-45">
            {/* Komuz (детализированный) */}
            <div className="relative">
              <div className="w-10 h-32 bg-gradient-to-b from-amber-700 to-amber-900 border-4 border-amber-950 rounded-2xl shadow-2xl" />
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full border-4 border-amber-950 shadow-lg" />
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-900 rounded-full" />
              <div className="absolute top-14 left-1/2 -translate-x-1/2 w-1 h-16 bg-gray-100" />
              <div className="absolute top-14 left-[45%] w-1 h-14 bg-gray-100" />
              <div className="absolute top-14 left-[55%] w-1 h-14 bg-gray-100" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-3 bg-amber-800 rounded-t-lg border-2 border-amber-950" />
            </div>
          </div>
        );
      case 'baatyr':
        return (
          <div className="absolute top-20 -right-20">
            {/* Легендарный меч */}
            <div className="relative">
              <div className="w-5 h-36 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 border-4 border-gray-900 rounded-t-sm shadow-2xl" />
              <div className="absolute inset-0 w-1 left-1/2 -translate-x-1/2 bg-white opacity-50 rounded" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-12 bg-gradient-to-b from-amber-700 to-amber-900 border-4 border-amber-950 rounded shadow-xl" />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-16 h-2 bg-red-700 border-2 border-red-900 shadow-lg" />
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full border-3 border-red-900" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-4 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-t border-2 border-yellow-700" />
            </div>
          </div>
        );
      case 'berkutchu':
        return (
          <div className="absolute -top-16 -right-16">
            {/* Детализированный беркут */}
            <div className="relative">
              <div className="text-7xl animate-pulse drop-shadow-2xl">🦅</div>
              <motion.div
                className="absolute -bottom-2 -left-2 text-2xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderHeadwear = () => {
    switch (fighter.id) {
      case 'manasch':
        return (
          <>
            {/* Ак-калпак (белый войлочный колпак) */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-20 border-4 border-gray-800 shadow-2xl"
              style={{
                backgroundColor: '#f5f5f5',
                background: 'linear-gradient(to bottom, #ffffff, #e5e5e5)',
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
              }}
            >
              {/* Складки калпака */}
              <div className="absolute top-0 left-[25%] w-1 h-full bg-gray-300" />
              <div className="absolute top-0 left-[50%] w-1 h-full bg-gray-300" />
              <div className="absolute top-0 left-[75%] w-1 h-full bg-gray-300" />
            </div>
            {/* Верхушка калпака */}
            <div className="absolute -top-18 left-1/2 -translate-x-1/2 w-8 h-6 bg-white border-3 border-gray-800 rounded-t-lg" />
            {/* Отвороты */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-3 bg-gray-200 border-2 border-gray-700 rounded" />
            {/* Фиолетовые полоски (орнамент) */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-1 bg-purple-600 rounded" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-1 bg-purple-500 rounded" />
          </>
        );
      case 'komuzchu':
        return (
          <>
            {/* Элечек - традиционный женский головной убор (но стилизованный для музыканта) */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-18 rounded-t-full border-4 border-blue-900 shadow-2xl overflow-hidden"
              style={{
                backgroundColor: '#3b82f6',
                background: 'linear-gradient(135deg, #60a5fa, #3b82f6, #2563eb)'
              }}
            >
              {/* Обмотка тканью - волнистые линии */}
              <div className="absolute top-2 left-0 right-0 h-2 bg-white/40 rounded-full" />
              <div className="absolute top-5 left-2 right-2 h-2 bg-cyan-200/60 rounded-full" />
              <div className="absolute top-8 left-0 right-0 h-2 bg-white/40 rounded-full" />
              <div className="absolute top-11 left-3 right-3 h-2 bg-cyan-200/60 rounded-full" />
              {/* Декоративные элементы */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-yellow-400 rounded-full border-2 border-yellow-600" />
            </div>
            {/* Боковые свисающие части */}
            <div className="absolute -top-10 left-0 w-6 h-14 bg-gradient-to-b from-blue-400 to-blue-600 border-2 border-blue-800 rounded-lg -rotate-12" />
            <div className="absolute -top-10 right-0 w-6 h-14 bg-gradient-to-b from-blue-400 to-blue-600 border-2 border-blue-800 rounded-lg rotate-12" />
          </>
        );
      case 'baatyr':
        return (
          <>
            {/* Топу (круглая меховая шапка воина) */}
            <div
              className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-16 rounded-full border-4 border-red-950 shadow-2xl"
              style={{
                backgroundColor: '#991b1b',
                background: 'radial-gradient(circle, #dc2626 0%, #991b1b 50%, #7f1d1d 100%)'
              }}
            >
              {/* Меховая опушка по краю */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gray-700 border-t-3 border-gray-900 rounded-b-full">
                {/* Текстура меха */}
                <div className="absolute top-0 left-2 w-1 h-3 bg-gray-600" />
                <div className="absolute top-0 left-5 w-1 h-3 bg-gray-600" />
                <div className="absolute top-0 left-8 w-1 h-3 bg-gray-600" />
                <div className="absolute top-0 right-8 w-1 h-3 bg-gray-600" />
                <div className="absolute top-0 right-5 w-1 h-3 bg-gray-600" />
                <div className="absolute top-0 right-2 w-1 h-3 bg-gray-600" />
              </div>
              {/* Декоративный верх */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full border-3 border-yellow-700" />
              {/* Орнамент */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-2 bg-red-900 rounded" />
            </div>
          </>
        );
      case 'berkutchu':
        return (
          <>
            {/* Соломенная шляпа кыргызского охотника */}
            <div
              className="absolute -top-14 left-1/2 -translate-x-1/2 w-36 h-8 rounded-full border-4 border-amber-800 shadow-2xl"
              style={{
                backgroundColor: '#d4a574',
                background: 'linear-gradient(135deg, #f4d4a4, #d4a574, #c49a6c)'
              }}
            >
              {/* Текстура соломы - горизонтальные линии */}
              <div className="absolute top-1 left-4 right-4 h-0.5 bg-amber-700/40" />
              <div className="absolute top-2 left-6 right-6 h-0.5 bg-amber-700/40" />
              <div className="absolute top-3 left-4 right-4 h-0.5 bg-amber-700/40" />
              <div className="absolute top-4 left-6 right-6 h-0.5 bg-amber-700/40" />
            </div>
            {/* Тулья (верхняя часть) */}
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-20 h-12 rounded-t-full border-4 border-amber-800 shadow-xl"
              style={{
                backgroundColor: '#d4a574',
                background: 'linear-gradient(to bottom, #f4d4a4, #d4a574)'
              }}
            >
              {/* Вертикальные линии соломы */}
              <div className="absolute top-0 left-[20%] w-0.5 h-full bg-amber-700/40" />
              <div className="absolute top-0 left-[40%] w-0.5 h-full bg-amber-700/40" />
              <div className="absolute top-0 left-[60%] w-0.5 h-full bg-amber-700/40" />
              <div className="absolute top-0 left-[80%] w-0.5 h-full bg-amber-700/40" />
            </div>
            {/* Тесьма вокруг шляпы */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-22 h-3 bg-amber-900 border-2 border-amber-950 rounded-full shadow-lg" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{
        left: isPlayer1 ? `${position}px` : 'auto',
        right: isPlayer1 ? 'auto' : `${1200 - position}px`,
        opacity: health <= 0 ? 0.3 : isDodging ? 0.4 : 1,
        bottom: '120px',
      }}
      animate={{
        x: isAttacking || isKicking ? direction * 50 : 0,
        y: isJumping ? -150 : 0,
        scale: isHit ? 0.95 : isDodging ? 0.7 : 1,
        rotate: isHit ? direction * -5 : isDodging ? direction * 15 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Jump/Dodge visual indicators */}
      {isJumping && (
        <motion.div
          className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 text-4xl z-30"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          💫
        </motion.div>
      )}

      {isDodging && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl z-30"
          initial={{ scale: 0, opacity: 1, rotate: 0 }}
          animate={{ scale: 2, opacity: 0, rotate: 360 }}
          transition={{ duration: 0.4 }}
        >
          💨
        </motion.div>
      )}

      {/* Fighter Body */}
      <div className="relative" style={{ transform: `scaleX(${direction})` }}>
        {/* Head */}
        <motion.div
          className="relative z-20"
          animate={{
            rotate: isBlocking ? -10 : 0,
            y: isKicking ? -5 : 0,
          }}
        >
          {/* Headwear */}
          {renderHeadwear()}

          {/* Face */}
          <div
            className="w-20 h-24 rounded-full border-4 border-gray-900 relative shadow-2xl"
            style={{
              backgroundColor: fighter.outfit.skin,
              background: `linear-gradient(135deg, ${fighter.outfit.skin}, #c4915f)`
            }}
          >
            {/* Eyebrows */}
            <div className="absolute top-6 left-2 w-5 h-1.5 bg-gray-900 rounded -rotate-12" />
            <div className="absolute top-6 right-2 w-5 h-1.5 bg-gray-900 rounded rotate-12" />

            {/* Eyes - более детализированные */}
            <div className="absolute top-8 left-3 w-5 h-4 bg-white rounded-full border-2 border-gray-800">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 rounded-full">
                <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
              </div>
            </div>
            <div className="absolute top-8 right-3 w-5 h-4 bg-white rounded-full border-2 border-gray-800">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 rounded-full">
                <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
              </div>
            </div>

            {/* Nose - более выраженный */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-3 h-5 bg-gray-700/40 rounded-full border-l-2 border-gray-600/30" />
            <div className="absolute top-15 left-1/2 -translate-x-1/2 w-4 h-2 bg-gray-600/20 rounded-full" />

            {/* Cheeks - румянец */}
            <div className="absolute top-11 left-1 w-3 h-3 bg-red-300/40 rounded-full" />
            <div className="absolute top-11 right-1 w-3 h-3 bg-red-300/40 rounded-full" />

            {/* Усы для Баатыра и Беркутчу - более детализированные */}
            {fighter.id === 'baatyr' && (
              <>
                <div className="absolute top-14 left-1/2 -translate-x-1/2 w-14 h-3 bg-gray-900 rounded-full shadow-lg" />
                <div className="absolute top-14 left-2 w-6 h-2 bg-gray-900 rounded-full -rotate-12" />
                <div className="absolute top-14 right-2 w-6 h-2 bg-gray-900 rounded-full rotate-12" />
              </>
            )}
            {fighter.id === 'berkutchu' && (
              <>
                <div className="absolute top-14 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-gray-800 rounded-full" />
                <div className="absolute top-13.5 left-3 w-5 h-2 bg-gray-800 rounded-full -rotate-6" />
                <div className="absolute top-13.5 right-3 w-5 h-2 bg-gray-800 rounded-full rotate-6" />
              </>
            )}

            {/* Борода для Манасчи */}
            {fighter.id === 'manasch' && (
              <>
                <div className="absolute top-16 left-1/2 -translate-x-1/2 w-10 h-6 bg-gray-700 rounded-b-full border-2 border-gray-800" />
                <div className="absolute top-17 left-1/2 -translate-x-1/2 w-8 h-4 bg-gray-600 rounded-b-full" />
              </>
            )}

            {/* Mouth - улыбка */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-7 h-2 bg-gray-900/60 rounded-full" />
            <div className="absolute top-16.5 left-1/2 -translate-x-1/2 w-6 h-1 bg-red-400 rounded-b-full" />

            {/* Уникальные черты лица */}
            {fighter.id === 'komuzchu' && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-1 h-4 bg-gray-700/50 rotate-12" />
            )}
          </div>
        </motion.div>

        {/* Body */}
        <motion.div
          className="relative mt-2 z-10"
          animate={{
            scaleX: isBlocking ? 0.9 : 1,
            rotate: isBlocking ? 5 : 0,
          }}
        >
          {/* Torso - более мускулистое */}
          <div
            className="w-24 h-36 rounded-2xl border-4 border-gray-900 relative shadow-2xl"
            style={{
              backgroundColor: fighter.outfit.shirt,
              background: `linear-gradient(135deg, ${fighter.outfit.shirt}, ${fighter.outfit.pants})`
            }}
          >
            {/* Тени для объема */}
            <div className="absolute inset-y-0 left-0 w-3 bg-black/20 rounded-l-2xl" />
            <div className="absolute inset-y-0 right-0 w-3 bg-white/10 rounded-r-2xl" />

            {/* Манасчи - орнаменты эпоса */}
            {fighter.id === 'manasch' && (
              <>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-2 bg-purple-200 rounded-full shadow-lg" />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-14 h-2 bg-purple-300 rounded-full" />
                <div className="absolute top-9 left-1/2 -translate-x-1/2 w-16 h-2 bg-purple-200 rounded-full" />
                <div className="absolute top-14 left-3 w-4 h-4 bg-yellow-400 rounded-lg rotate-45 border-2 border-purple-800" />
                <div className="absolute top-14 right-3 w-4 h-4 bg-yellow-400 rounded-lg rotate-45 border-2 border-purple-800" />
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-12 h-12 bg-purple-800/30 rounded-full" />
                <div className="absolute top-22 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-400 rounded-full border-3 border-purple-900" />
              </>
            )}

            {/* Комузчу - музыкальные паттерны */}
            {fighter.id === 'komuzchu' && (
              <>
                <div className="absolute top-4 left-3 w-3 h-3 bg-blue-200 rounded-full shadow-lg" />
                <div className="absolute top-4 right-3 w-3 h-3 bg-blue-200 rounded-full shadow-lg" />
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-14 h-3 bg-blue-200 rounded-full" />
                <div className="absolute top-15 left-4 w-2 h-6 bg-cyan-300 rounded-full rotate-12" />
                <div className="absolute top-15 right-4 w-2 h-6 bg-cyan-300 rounded-full -rotate-12" />
                <div className="absolute top-20 left-1/2 -translate-x-1/2 text-xl">♪</div>
                <div className="absolute top-24 left-6 w-4 h-4 bg-blue-300 rounded-lg border-2 border-blue-800" />
                <div className="absolute top-24 right-6 w-4 h-4 bg-blue-300 rounded-lg border-2 border-blue-800" />
              </>
            )}

            {/* Баатыр - боевая броня */}
            {fighter.id === 'baatyr' && (
              <>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-18 h-4 bg-yellow-400 rounded-lg border-3 border-yellow-700 shadow-xl" />
                <div className="absolute top-8 left-2 w-3 h-16 bg-red-800 border-2 border-red-950 rounded-lg" />
                <div className="absolute top-8 right-2 w-3 h-16 bg-red-800 border-2 border-red-950 rounded-lg" />
                <div className="absolute top-14 left-1/2 -translate-x-1/2 w-16 h-3 bg-yellow-500 rounded border-2 border-yellow-700" />
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-14 h-8 bg-red-900/50 rounded-lg" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-18 h-5 bg-red-950 rounded-lg border-3 border-gray-900" />
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-500 rounded-full border-3 border-red-900" />
              </>
            )}

            {/* Беркутчу - охотничья одежда */}
            {fighter.id === 'berkutchu' && (
              <>
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-800 rounded-lg border-3 border-amber-950 shadow-xl" />
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-6 h-6 bg-yellow-500 rounded-full border-3 border-yellow-700" />
                <div className="absolute top-20 left-3 w-4 h-8 bg-amber-700 rounded border-2 border-amber-900" />
                <div className="absolute top-20 right-3 w-4 h-8 bg-amber-700 rounded border-2 border-amber-900" />
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-900 rounded-lg border-2 border-amber-950" />
                <div className="absolute top-3 left-2 w-2 h-3 bg-amber-600 rounded" />
                <div className="absolute top-6 left-3 w-2 h-2 bg-amber-600 rounded" />
                <div className="absolute top-3 right-2 w-2 h-3 bg-amber-600 rounded" />
              </>
            )}

            {/* Мышцы */}
            <div className="absolute top-12 left-4 w-4 h-6 bg-black/10 rounded-full" />
            <div className="absolute top-12 right-4 w-4 h-6 bg-black/10 rounded-full" />
          </div>

          {/* Left Arm - более детализированная */}
          <motion.div
            className="absolute top-4 -left-10 origin-right"
            animate={{
              rotate: isAttacking ? -90 : isBlocking ? -45 : -20,
              x: isAttacking ? -10 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Плечо */}
            <div
              className="w-10 h-18 rounded-xl border-4 border-gray-900 shadow-xl relative"
              style={{
                backgroundColor: fighter.outfit.shirt,
                background: `linear-gradient(135deg, ${fighter.outfit.shirt}, ${fighter.outfit.pants})`
              }}
            >
              <div className="absolute inset-y-0 left-0 w-2 bg-black/20 rounded-l-xl" />
              <div className="absolute top-2 right-1 w-3 h-8 bg-black/10 rounded-full" />
            </div>
            {/* Предплечье */}
            <motion.div
              className="origin-top"
              animate={{
                rotate: isAttacking ? -45 : 0,
              }}
            >
              <div
                className="w-8 h-16 rounded-xl border-4 border-gray-900 ml-1 shadow-lg relative"
                style={{
                  backgroundColor: fighter.outfit.skin,
                  background: `linear-gradient(to bottom, ${fighter.outfit.skin}, #c4915f)`
                }}
              >
                <div className="absolute inset-y-0 left-0 w-2 bg-black/15 rounded-l-xl" />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-8 bg-black/10 rounded-full" />
              </div>
              {/* Кисть с пальцами */}
              <div
                className="w-8 h-8 rounded-lg border-4 border-gray-900 ml-1 shadow-lg relative"
                style={{
                  backgroundColor: fighter.outfit.skin,
                  background: `radial-gradient(circle, ${fighter.outfit.skin}, #b8865d)`
                }}
              >
                <div className="absolute -bottom-1 left-1 w-1 h-3 bg-gray-800/60 rounded" />
                <div className="absolute -bottom-1 left-3 w-1 h-3 bg-gray-800/60 rounded" />
                <div className="absolute -bottom-1 right-3 w-1 h-3 bg-gray-800/60 rounded" />
                <div className="absolute -bottom-1 right-1 w-1 h-3 bg-gray-800/60 rounded" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Arm - более детализированная */}
          <motion.div
            className="absolute top-4 -right-10 origin-left"
            animate={{
              rotate: isBlocking ? 45 : 20,
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Плечо */}
            <div
              className="w-10 h-18 rounded-xl border-4 border-gray-900 shadow-xl relative"
              style={{
                backgroundColor: fighter.outfit.shirt,
                background: `linear-gradient(135deg, ${fighter.outfit.shirt}, ${fighter.outfit.pants})`
              }}
            >
              <div className="absolute inset-y-0 right-0 w-2 bg-white/10 rounded-r-xl" />
              <div className="absolute top-2 left-1 w-3 h-8 bg-black/10 rounded-full" />
            </div>
            {/* Предплечье */}
            <div
              className="w-8 h-16 rounded-xl border-4 border-gray-900 ml-1 shadow-lg relative"
              style={{
                backgroundColor: fighter.outfit.skin,
                background: `linear-gradient(to bottom, ${fighter.outfit.skin}, #c4915f)`
              }}
            >
              <div className="absolute inset-y-0 right-0 w-2 bg-white/10 rounded-r-xl" />
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-8 bg-black/10 rounded-full" />
            </div>
            {/* Кисть с пальцами */}
            <div
              className="w-8 h-8 rounded-lg border-4 border-gray-900 ml-1 shadow-lg relative"
              style={{
                backgroundColor: fighter.outfit.skin,
                background: `radial-gradient(circle, ${fighter.outfit.skin}, #b8865d)`
              }}
            >
              <div className="absolute -bottom-1 left-1 w-1 h-3 bg-gray-800/60 rounded" />
              <div className="absolute -bottom-1 left-3 w-1 h-3 bg-gray-800/60 rounded" />
              <div className="absolute -bottom-1 right-3 w-1 h-3 bg-gray-800/60 rounded" />
              <div className="absolute -bottom-1 right-1 w-1 h-3 bg-gray-800/60 rounded" />
            </div>
          </motion.div>

          {/* Special feature (weapon, instrument, etc) */}
          {renderSpecialFeature()}
        </motion.div>

        {/* Legs - более детализированные */}
        <div className="relative mt-2 flex justify-center gap-3">
          {/* Left Leg */}
          <motion.div
            animate={{
              rotate: isKicking ? 45 : 0,
              x: isKicking ? 20 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="origin-top"
          >
            {/* Бедро */}
            <div
              className="w-10 h-24 rounded-xl border-4 border-gray-900 shadow-xl relative"
              style={{
                backgroundColor: fighter.outfit.pants,
                background: `linear-gradient(to bottom, ${fighter.outfit.pants}, #1a1a1a)`
              }}
            >
              <div className="absolute inset-y-0 left-0 w-2 bg-black/20 rounded-l-xl" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-12 bg-black/15 rounded-full" />
            </div>
            {/* Голень */}
            <motion.div
              animate={{
                rotate: isKicking ? 45 : 0,
              }}
              className="origin-top"
            >
              <div
                className="w-9 h-20 rounded-xl border-4 border-gray-900 shadow-lg relative"
                style={{
                  backgroundColor: fighter.outfit.pants,
                  background: `linear-gradient(to bottom, ${fighter.outfit.pants}, #0a0a0a)`
                }}
              >
                <div className="absolute inset-y-0 left-0 w-2 bg-black/20 rounded-l-xl" />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-10 bg-black/15 rounded-full" />
              </div>
              {/* Ботинок детализированный */}
              <div className="w-12 h-8 rounded-lg border-4 border-gray-900 bg-gradient-to-b from-gray-700 to-gray-900 -ml-1 shadow-2xl relative">
                <div className="absolute top-1 left-2 right-2 h-1 bg-gray-600 rounded" />
                <div className="absolute top-3 left-1 w-8 h-1 bg-gray-800" />
                <div className="absolute -right-1 top-2 w-3 h-4 bg-gray-600 rounded-r-lg border-l-2 border-gray-800" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Leg */}
          <motion.div className="origin-top">
            {/* Бедро */}
            <div
              className="w-10 h-24 rounded-xl border-4 border-gray-900 shadow-xl relative"
              style={{
                backgroundColor: fighter.outfit.pants,
                background: `linear-gradient(to bottom, ${fighter.outfit.pants}, #1a1a1a)`
              }}
            >
              <div className="absolute inset-y-0 right-0 w-2 bg-white/10 rounded-r-xl" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-12 bg-black/15 rounded-full" />
            </div>
            {/* Голень */}
            <div
              className="w-9 h-20 rounded-xl border-4 border-gray-900 shadow-lg relative"
              style={{
                backgroundColor: fighter.outfit.pants,
                background: `linear-gradient(to bottom, ${fighter.outfit.pants}, #0a0a0a)`
              }}
            >
              <div className="absolute inset-y-0 right-0 w-2 bg-white/10 rounded-r-xl" />
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-10 bg-black/15 rounded-full" />
            </div>
            {/* Ботинок детализированный */}
            <div className="w-12 h-8 rounded-lg border-4 border-gray-900 bg-gradient-to-b from-gray-700 to-gray-900 -ml-1 shadow-2xl relative">
              <div className="absolute top-1 left-2 right-2 h-1 bg-gray-600 rounded" />
              <div className="absolute top-3 left-1 w-8 h-1 bg-gray-800" />
              <div className="absolute -right-1 top-2 w-3 h-4 bg-gray-600 rounded-r-lg border-l-2 border-gray-800" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Attack Effects */}
      {isAttacking && !isSpecialAttack && (
        <motion.div
          className="absolute top-8 z-30"
          style={{ left: isPlayer1 ? '120%' : '-20%' }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {fighter.id === 'manasch' && <div className="text-4xl">📖</div>}
          {fighter.id === 'komuzchu' && <div className="text-4xl">♪</div>}
          {fighter.id === 'baatyr' && <div className="text-4xl">⚔️</div>}
          {fighter.id === 'berkutchu' && <div className="text-4xl">🪶</div>}
        </motion.div>
      )}

      {/* Kick Effect */}
      {isKicking && (
        <motion.div
          className="absolute bottom-20 z-30"
          style={{ left: isPlayer1 ? '120%' : '-20%' }}
          initial={{ scale: 0, opacity: 1, rotate: 0 }}
          animate={{ scale: 2, opacity: 0, rotate: 360 }}
          transition={{ duration: 0.4 }}
        >
          {fighter.id === 'manasch' && <div className="text-4xl">📜</div>}
          {fighter.id === 'komuzchu' && <div className="text-4xl">🎵</div>}
          {fighter.id === 'baatyr' && <div className="text-4xl">🔥</div>}
          {fighter.id === 'berkutchu' && <div className="text-4xl">💨</div>}
        </motion.div>
      )}

      {/* Special Attack Effects - Character Specific */}
      {isSpecialAttack && (
        <>
          {fighter.id === 'manasch' && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 z-30"
              style={{ left: isPlayer1 ? '100%' : '-100%' }}
              initial={{ scale: 0, opacity: 1, x: 0 }}
              animate={{ scale: 3, opacity: 0, x: direction * 100 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="text-6xl">📚</div>
                <motion.div
                  className="absolute top-0 left-0 text-3xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  ✨
                </motion.div>
              </div>
            </motion.div>
          )}

          {fighter.id === 'komuzchu' && (
            <>
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 z-30"
                style={{ left: isPlayer1 ? '100%' : '-100%' }}
                initial={{ scale: 0, opacity: 1, x: 0 }}
                animate={{ scale: 3, opacity: 0, x: direction * 100 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-6xl">🎶</div>
              </motion.div>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 z-30 text-4xl"
                  style={{ left: isPlayer1 ? '110%' : '-10%' }}
                  initial={{ scale: 0, opacity: 1, y: 0 }}
                  animate={{ 
                    scale: 2, 
                    opacity: 0, 
                    x: direction * (80 + i * 30),
                    y: (i - 1) * 40
                  }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  {i % 2 === 0 ? '♫' : '♪'}
                </motion.div>
              ))}
            </>
          )}

          {fighter.id === 'baatyr' && (
            <>
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 z-30"
                style={{ left: isPlayer1 ? '100%' : '-100%' }}
                initial={{ scale: 0, opacity: 1, x: 0, rotate: 0 }}
                animate={{ scale: 3, opacity: 0, x: direction * 100, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-6xl">⚡</div>
              </motion.div>
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 z-30"
                style={{ left: isPlayer1 ? '120%' : '-20%' }}
                initial={{ scale: 0, opacity: 1, rotate: -45 }}
                animate={{ scale: 2.5, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-5xl">🗡️</div>
              </motion.div>
            </>
          )}

          {fighter.id === 'berkutchu' && (
            <>
              <motion.div
                className="absolute top-0 z-30"
                style={{ left: isPlayer1 ? '110%' : '-10%' }}
                initial={{ y: -100, scale: 0.5, opacity: 1 }}
                animate={{ y: 50, scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-6xl">🦅</div>
              </motion.div>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 z-30 text-3xl"
                  style={{ left: isPlayer1 ? '105%' : '-5%' }}
                  initial={{ scale: 0, opacity: 1, y: -50 }}
                  animate={{ 
                    scale: 1.5, 
                    opacity: 0, 
                    x: direction * (60 + i * 20),
                    y: 80 + i * 15
                  }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  🪶
                </motion.div>
              ))}
            </>
          )}
        </>
      )}

      {/* Hit Effect */}
      {isHit && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-5xl">💢</div>
        </motion.div>
      )}

      {/* Fighter Name */}
      <p
        className="text-white font-bold mt-6 text-2xl px-4 py-2 rounded-lg"
        style={{
          backgroundColor: `${fighter.color}`,
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        }}
      >
        {fighter.name}
      </p>
    </motion.div>
  );
}