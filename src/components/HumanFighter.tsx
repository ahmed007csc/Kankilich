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
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="text-3xl">📜</div>
          </div>
        );
      case 'komuzchu':
        return (
          <div className="absolute top-16 -right-16 -rotate-45">
            {/* Komuz (traditional instrument) */}
            <div className="relative">
              <div className="w-6 h-20 bg-amber-700 border-2 border-amber-900 rounded-lg" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-600 rounded-full border-2 border-amber-900" />
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-1 h-10 bg-gray-800" />
              <div className="absolute top-9 left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-800" style={{ left: '60%' }} />
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-1 h-6 bg-gray-800" style={{ left: '40%' }} />
            </div>
          </div>
        );
      case 'baatyr':
        return (
          <div className="absolute top-16 -right-14">
            {/* Traditional sword (Kylych) */}
            <div className="relative">
              <div className="w-3 h-24 bg-gray-400 border-2 border-gray-700 rounded-t-sm" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-8 bg-amber-800 border-2 border-amber-900 rounded" />
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-700" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-2 bg-yellow-400 rounded-t" />
            </div>
          </div>
        );
      case 'berkutchu':
        return (
          <div className="absolute -top-12 -right-12">
            {/* Eagle perched */}
            <div className="text-5xl animate-pulse">🦅</div>
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
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-10 rounded-t-full border-4 border-gray-800"
              style={{ backgroundColor: fighter.outfit.hat }}
            />
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-6 h-8 bg-white rounded-full border-2 border-gray-800" />
          </>
        );
      case 'komuzchu':
        return (
          <>
            <div
              className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-8 rounded-t-full border-4 border-gray-800"
              style={{ backgroundColor: fighter.outfit.hat }}
            />
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-16 h-2 bg-yellow-400 rounded-full" />
          </>
        );
      case 'baatyr':
        return (
          <div
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-22 h-12 rounded-t-lg border-4 border-gray-900"
            style={{ backgroundColor: '#8B0000' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-6 bg-yellow-400 rounded-sm" />
          </div>
        );
      case 'berkutchu':
        return (
          <>
            <div
              className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-14 rounded-full border-4 border-gray-800"
              style={{ backgroundColor: '#92400e' }}
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-4 bg-amber-600 rounded-full" />
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
            className="w-16 h-20 rounded-full border-4 border-gray-800 relative"
            style={{ backgroundColor: fighter.outfit.skin }}
          >
            {/* Eyes */}
            <div className="absolute top-6 left-2 w-3 h-3 bg-gray-900 rounded-full" />
            <div className="absolute top-6 right-2 w-3 h-3 bg-gray-900 rounded-full" />
            {/* Nose */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-2 h-3 bg-gray-700/30 rounded-full" />
            {/* Mustache for Baatyr and Berkutchu */}
            {(fighter.id === 'baatyr' || fighter.id === 'berkutchu') && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-10 h-2 bg-gray-900 rounded-full" />
            )}
            {/* Mouth */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-6 h-1 bg-gray-800 rounded-full" />
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
          {/* Torso */}
          <div
            className="w-20 h-28 rounded-lg border-4 border-gray-800 relative"
            style={{ backgroundColor: fighter.outfit.shirt }}
          >
            {/* Unique patterns for each character */}
            {fighter.id === 'manasch' && (
              <>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-purple-300 rounded" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-1 bg-purple-300 rounded" />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-12 h-1 bg-purple-300 rounded" />
              </>
            )}
            {fighter.id === 'komuzchu' && (
              <>
                <div className="absolute top-3 left-2 w-2 h-2 bg-blue-300 rounded-full" />
                <div className="absolute top-3 right-2 w-2 h-2 bg-blue-300 rounded-full" />
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-10 h-2 bg-blue-300 rounded" />
              </>
            )}
            {fighter.id === 'baatyr' && (
              <>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-2 bg-yellow-400 rounded" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-3 bg-red-900 rounded" />
              </>
            )}
            {fighter.id === 'berkutchu' && (
              <>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-700 rounded" />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-500 rounded-full" />
              </>
            )}
          </div>

          {/* Left Arm */}
          <motion.div
            className="absolute top-2 -left-8 origin-right"
            animate={{
              rotate: isAttacking ? -90 : isBlocking ? -45 : -20,
              x: isAttacking ? -10 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="w-8 h-16 rounded-lg border-4 border-gray-800"
              style={{ backgroundColor: fighter.outfit.shirt }}
            />
            <motion.div
              className="origin-top"
              animate={{
                rotate: isAttacking ? -45 : 0,
              }}
            >
              <div
                className="w-6 h-14 rounded-lg border-4 border-gray-800 ml-1"
                style={{ backgroundColor: fighter.outfit.skin }}
              />
              <div
                className="w-6 h-6 rounded border-4 border-gray-800 ml-1"
                style={{ backgroundColor: fighter.outfit.skin }}
              />
            </motion.div>
          </motion.div>

          {/* Right Arm */}
          <motion.div
            className="absolute top-2 -right-8 origin-left"
            animate={{
              rotate: isBlocking ? 45 : 20,
            }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="w-8 h-16 rounded-lg border-4 border-gray-800"
              style={{ backgroundColor: fighter.outfit.shirt }}
            />
            <div
              className="w-6 h-14 rounded-lg border-4 border-gray-800 ml-1"
              style={{ backgroundColor: fighter.outfit.skin }}
            />
            <div
              className="w-6 h-6 rounded border-4 border-gray-800 ml-1"
              style={{ backgroundColor: fighter.outfit.skin }}
            />
          </motion.div>

          {/* Special feature (weapon, instrument, etc) */}
          {renderSpecialFeature()}
        </motion.div>

        {/* Legs */}
        <div className="relative mt-1 flex justify-center gap-2">
          {/* Left Leg */}
          <motion.div
            animate={{
              rotate: isKicking ? 45 : 0,
              x: isKicking ? 20 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="origin-top"
          >
            <div
              className="w-8 h-20 rounded-lg border-4 border-gray-800"
              style={{ backgroundColor: fighter.outfit.pants }}
            />
            <motion.div
              animate={{
                rotate: isKicking ? 45 : 0,
              }}
              className="origin-top"
            >
              <div
                className="w-7 h-18 rounded-lg border-4 border-gray-800"
                style={{ backgroundColor: fighter.outfit.pants }}
              />
              <div className="w-10 h-6 rounded border-4 border-gray-800 bg-gray-700 -ml-1" />
            </motion.div>
          </motion.div>

          {/* Right Leg */}
          <motion.div className="origin-top">
            <div
              className="w-8 h-20 rounded-lg border-4 border-gray-800"
              style={{ backgroundColor: fighter.outfit.pants }}
            />
            <div
              className="w-7 h-18 rounded-lg border-4 border-gray-800"
              style={{ backgroundColor: fighter.outfit.pants }}
            />
            <div className="w-10 h-6 rounded border-4 border-gray-800 bg-gray-700 -ml-1" />
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