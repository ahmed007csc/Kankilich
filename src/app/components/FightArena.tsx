import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { HumanFighter, FighterData } from './HumanFighter';
import { HealthBar } from './HealthBar';
import { Controls } from './Controls';
import { Trophy, RotateCcw } from 'lucide-react';
import { BotDifficulty } from '../App';

interface FightArenaProps {
  player1: FighterData;
  player2: FighterData;
  onRestart: () => void;
  isBotMode: boolean;
  botDifficulty?: BotDifficulty;
}

const MAX_HEALTH = 200; // Increased HP
const ROUND_TIME = 99;
const ATTACK_COOLDOWN = 500;
const ATTACK_RANGE = 350; // Increased attack range
const MOVE_SPEED = 10;
const ARENA_WIDTH = 1000;
const MAX_ENERGY = 100;
const ENERGY_GAIN_PER_HIT = 15;
const ENERGY_GAIN_PER_DAMAGE = 10;
const ULTIMATE_COST = 100;

export function FightArena({ player1, player2, onRestart, isBotMode, botDifficulty = 'medium' }: FightArenaProps) {
  const [health1, setHealth1] = useState(MAX_HEALTH);
  const [health2, setHealth2] = useState(MAX_HEALTH);
  const [energy1, setEnergy1] = useState(0);
  const [energy2, setEnergy2] = useState(0);
  const [timer, setTimer] = useState(ROUND_TIME);
  const [winner, setWinner] = useState<string | null>(null);

  // Position states
  const [position1, setPosition1] = useState(150);
  const [position2, setPosition2] = useState(ARENA_WIDTH - 150);

  // Attack states
  const [isAttacking1, setIsAttacking1] = useState(false);
  const [isAttacking2, setIsAttacking2] = useState(false);
  const [isKicking1, setIsKicking1] = useState(false);
  const [isKicking2, setIsKicking2] = useState(false);
  const [isBlocking1, setIsBlocking1] = useState(false);
  const [isBlocking2, setIsBlocking2] = useState(false);
  const [isSpecial1, setIsSpecial1] = useState(false);
  const [isSpecial2, setIsSpecial2] = useState(false);
  const [isUltimate1, setIsUltimate1] = useState(false);
  const [isUltimate2, setIsUltimate2] = useState(false);
  const [isHit1, setIsHit1] = useState(false);
  const [isHit2, setIsHit2] = useState(false);
  const [isJumping1, setIsJumping1] = useState(false);
  const [isJumping2, setIsJumping2] = useState(false);
  const [isDodging1, setIsDodging1] = useState(false);
  const [isDodging2, setIsDodging2] = useState(false);

  // Movement states
  const [movingLeft1, setMovingLeft1] = useState(false);
  const [movingRight1, setMovingRight1] = useState(false);
  const [movingLeft2, setMovingLeft2] = useState(false);
  const [movingRight2, setMovingRight2] = useState(false);

  const lastAttack1 = useRef(0);
  const lastAttack2 = useRef(0);
  const botThinkTimer = useRef(0);
  const lastPlayerAttack = useRef(0);

  // Bot difficulty settings
  const getBotSettings = () => {
    switch (botDifficulty) {
      case 'easy':
        return {
          reactionTime: 500,
          attackChance: 0.4,
          kickChance: 0.6,
          specialChance: 0.2,
          ultimateChance: 0.1,
          blockChance: 0.3,
          dodgeChance: 0.2,
          jumpChance: 0.1,
          aggressionLevel: 0.6,
          distanceManagement: 0.8,
          predictionAbility: 0.2,
        };
      case 'medium':
        return {
          reactionTime: 250,
          attackChance: 0.6,
          kickChance: 0.8,
          specialChance: 0.8,
          ultimateChance: 0.3,
          blockChance: 0.8,
          dodgeChance: 0.5,
          jumpChance: 0.3,
          aggressionLevel: 0.85,
          distanceManagement: 0.9,
          predictionAbility: 0.4,
        };
      case 'hard':
        return {
          reactionTime: 100,
          attackChance: 0.8,
          kickChance: 0.95,
          specialChance: 0.95,
          ultimateChance: 0.5,
          blockChance: 0.95,
          dodgeChance: 0.85,
          jumpChance: 0.7,
          aggressionLevel: 0.95,
          distanceManagement: 0.98,
          predictionAbility: 0.9,
        };
    }
  };

  const botSettings = getBotSettings();

  // Calculate distance between fighters
  const getDistance = () => {
    return Math.abs(position2 - position1);
  };

  // Track player attacking for prediction
  useEffect(() => {
    if (isAttacking1 || isKicking1 || isSpecial1) {
      lastPlayerAttack.current = Date.now();
    }
  }, [isAttacking1, isKicking1, isSpecial1]);

  // Bot AI
  useEffect(() => {
    if (!isBotMode || winner) return;

    const botAI = setInterval(() => {
      const distance = getDistance();
      const now = Date.now();
      const timeSincePlayerAttack = now - lastPlayerAttack.current;

      // Stop all movements first
      setMovingLeft2(false);
      setMovingRight2(false);

      // Check if player is attacking and bot can predict
      const playerIsAttacking = isAttacking1 || isKicking1 || isSpecial1;
      const canPredict = Math.random() < botSettings.predictionAbility;

      // DEFENSIVE REACTIONS (hard bot reacts to player attacks)
      if (playerIsAttacking && distance <= ATTACK_RANGE && canPredict) {
        const defensiveAction = Math.random();

        if (defensiveAction < botSettings.dodgeChance) {
          handleDodge(2);
          return;
        } else if (defensiveAction < botSettings.dodgeChance + botSettings.jumpChance) {
          handleJump(2);
          return;
        } else if (defensiveAction < botSettings.dodgeChance + botSettings.jumpChance + botSettings.blockChance) {
          setIsBlocking2(true);
          setTimeout(() => setIsBlocking2(false), 600);
          return;
        }
      }

      // DISTANCE MANAGEMENT
      const optimalDistance = ATTACK_RANGE - 30; // Slightly inside attack range
      const distanceQuality = Math.random() < botSettings.distanceManagement;

      if (distanceQuality) {
        // Smart distance management
        if (distance > optimalDistance + 80) {
          setMovingLeft2(true);
        } else if (distance < optimalDistance - 80) {
          setMovingRight2(true);
        }
      } else {
        // Simple distance check (for easier bots)
        if (distance > ATTACK_RANGE + 100) {
          setMovingLeft2(true);
        } else if (distance < ATTACK_RANGE - 100) {
          setMovingRight2(true);
        }
      }

      // OFFENSIVE ACTIONS (when in range)
      if (distance <= ATTACK_RANGE + 50) {
        const action = Math.random();
        const healthRatio = health2 / MAX_HEALTH;
        const isLowHealth = healthRatio < 0.3;
        const isPlayerLowHealth = health1 / MAX_HEALTH < 0.3;

        // Adjust aggression based on health
        const aggressionModifier = isLowHealth ? 0.7 : isPlayerLowHealth ? 1.3 : 1;
        const effectiveAggression = botSettings.aggressionLevel * aggressionModifier;

        // Use ultimate if available and conditions are right
        if (energy2 >= ULTIMATE_COST && action < botSettings.ultimateChance * 1.5) {
          handleUltimate(2);
        }
        // Special attack
        else if (action < botSettings.specialChance && now - lastAttack2.current > ATTACK_COOLDOWN + 800) {
          handleAttack(2, 25, true);
        }
        // Kick
        else if (action < botSettings.specialChance + botSettings.kickChance && now - lastAttack2.current > ATTACK_COOLDOWN) {
          handleAttack(2, 12, false, true);
        }
        // Normal attack
        else if (action < botSettings.specialChance + botSettings.kickChance + botSettings.attackChance && now - lastAttack2.current > ATTACK_COOLDOWN) {
          handleAttack(2, 10);
        }
        // Block (especially when player just attacked)
        else if (action < botSettings.specialChance + botSettings.kickChance + botSettings.attackChance + botSettings.blockChance && timeSincePlayerAttack < 1000) {
          setIsBlocking2(true);
          setTimeout(() => setIsBlocking2(false), 700);
        }
        // Dodge
        else if (action < botSettings.specialChance + botSettings.kickChance + botSettings.attackChance + botSettings.blockChance + botSettings.dodgeChance) {
          handleDodge(2);
        }
        // Jump
        else if (action < botSettings.specialChance + botSettings.kickChance + botSettings.attackChance + botSettings.blockChance + botSettings.dodgeChance + botSettings.jumpChance) {
          handleJump(2);
        }
        // Random movement for unpredictability
        else if (action > 0.85) {
          if (Math.random() < 0.5) {
            setMovingLeft2(true);
          } else {
            setMovingRight2(true);
          }
        }
      }
      // OUT OF RANGE BEHAVIOR
      else {
        // Occasionally use defensive moves even out of range (creates unpredictability)
        if (Math.random() < 0.1) {
          const randomAction = Math.random();
          if (randomAction < 0.33) {
            handleJump(2);
          } else if (randomAction < 0.66) {
            handleDodge(2);
          }
        }
      }
    }, botSettings.reactionTime);

    return () => clearInterval(botAI);
  }, [isBotMode, winner, position1, position2, energy2, health1, health2, isAttacking1, isKicking1, isSpecial1, botDifficulty]);

  // Movement loop
  useEffect(() => {
    if (winner) return;

    const interval = setInterval(() => {
      if (movingLeft1 && position1 > 0) {
        setPosition1((prev) => Math.max(0, prev - MOVE_SPEED));
      }
      if (movingRight1 && position1 < position2 - 100) {
        setPosition1((prev) => Math.min(position2 - 100, prev + MOVE_SPEED));
      }
      if (movingLeft2 && position2 > position1 + 100) {
        setPosition2((prev) => Math.max(position1 + 100, prev - MOVE_SPEED));
      }
      if (movingRight2 && position2 < ARENA_WIDTH) {
        setPosition2((prev) => Math.min(ARENA_WIDTH, prev + MOVE_SPEED));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [winner, movingLeft1, movingRight1, movingLeft2, movingRight2, position1, position2]);

  // Timer countdown
  useEffect(() => {
    if (winner) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (health1 > health2) {
            setWinner(player1.name);
          } else if (health2 > health1) {
            setWinner(player2.name);
          } else {
            setWinner('НИЧЬЯ');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [winner, health1, health2, player1.name, player2.name]);

  // Check for winner
  useEffect(() => {
    if (health1 <= 0) {
      setWinner(player2.name);
    } else if (health2 <= 0) {
      setWinner(player1.name);
    }
  }, [health1, health2, player1.name, player2.name]);

  // Handle attacks
  const handleAttack = (attacker: 1 | 2, damage: number, isSpecial = false, isKick = false) => {
    const now = Date.now();
    const lastAttack = attacker === 1 ? lastAttack1 : lastAttack2;

    if (now - lastAttack.current < ATTACK_COOLDOWN) return;

    const distance = getDistance();
    
    if (attacker === 1) {
      lastAttack1.current = now;
      
      if (isKick) {
        setIsKicking1(true);
        setTimeout(() => setIsKicking1(false), 400);
      } else {
        setIsAttacking1(true);
        if (isSpecial) setIsSpecial1(true);
        setTimeout(() => {
          setIsAttacking1(false);
          setIsSpecial1(false);
        }, 300);
      }

      // Check if in range to deal damage
      if (distance <= ATTACK_RANGE) {
        // Dodging or jumping avoids damage
        if (isDodging2 || isJumping2) {
          // Miss!
          setEnergy1((prev) => Math.min(MAX_ENERGY, prev + 2));
        } else if (!isBlocking2) {
          setHealth2((prev) => Math.max(0, prev - damage));
          setIsHit2(true);
          setTimeout(() => setIsHit2(false), 300);
          // Gain energy on successful hit
          setEnergy1((prev) => Math.min(MAX_ENERGY, prev + ENERGY_GAIN_PER_HIT));
        }
        // Gain less energy when blocked
        else {
          setEnergy1((prev) => Math.min(MAX_ENERGY, prev + 5));
        }
      }
      // Gain energy when taking damage
      if (isHit1) {
        setEnergy1((prev) => Math.min(MAX_ENERGY, prev + ENERGY_GAIN_PER_DAMAGE));
      }
    } else {
      lastAttack2.current = now;
      
      if (isKick) {
        setIsKicking2(true);
        setTimeout(() => setIsKicking2(false), 400);
      } else {
        setIsAttacking2(true);
        if (isSpecial) setIsSpecial2(true);
        setTimeout(() => {
          setIsAttacking2(false);
          setIsSpecial2(false);
        }, 300);
      }

      // Check if in range to deal damage
      if (distance <= ATTACK_RANGE) {
        // Dodging or jumping avoids damage
        if (isDodging1 || isJumping1) {
          // Miss!
          setEnergy2((prev) => Math.min(MAX_ENERGY, prev + 2));
        } else if (!isBlocking1) {
          setHealth1((prev) => Math.max(0, prev - damage));
          setIsHit1(true);
          setTimeout(() => setIsHit1(false), 300);
          // Gain energy on successful hit
          setEnergy2((prev) => Math.min(MAX_ENERGY, prev + ENERGY_GAIN_PER_HIT));
        }
        // Gain less energy when blocked
        else {
          setEnergy2((prev) => Math.min(MAX_ENERGY, prev + 5));
        }
      }
      // Gain energy when taking damage
      if (isHit2) {
        setEnergy2((prev) => Math.min(MAX_ENERGY, prev + ENERGY_GAIN_PER_DAMAGE));
      }
    }
  };

  // Handle Jump
  const handleJump = (player: 1 | 2) => {
    const isJumping = player === 1 ? isJumping1 : isJumping2;
    if (isJumping) return;

    if (player === 1) {
      setIsJumping1(true);
      setTimeout(() => setIsJumping1(false), 600);
    } else {
      setIsJumping2(true);
      setTimeout(() => setIsJumping2(false), 600);
    }
  };

  // Handle Dodge
  const handleDodge = (player: 1 | 2) => {
    const isDodging = player === 1 ? isDodging1 : isDodging2;
    if (isDodging) return;

    if (player === 1) {
      setIsDodging1(true);
      setTimeout(() => setIsDodging1(false), 400);
    } else {
      setIsDodging2(true);
      setTimeout(() => setIsDodging2(false), 400);
    }
  };

  // Handle Ultimate Attack
  const handleUltimate = (attacker: 1 | 2) => {
    const energy = attacker === 1 ? energy1 : energy2;
    
    if (energy < ULTIMATE_COST) return;

    const distance = getDistance();
    
    if (attacker === 1) {
      setEnergy1(0);
      setIsUltimate1(true);
      setIsAttacking1(true);
      setIsSpecial1(true);
      
      setTimeout(() => {
        setIsUltimate1(false);
        setIsAttacking1(false);
        setIsSpecial1(false);
      }, 1200);

      // Ultimate deals massive damage and ignores some blocking
      if (distance <= ATTACK_RANGE + 100) {
        const ultimateDamage = isBlocking2 ? 25 : 45;
        setHealth2((prev) => Math.max(0, prev - ultimateDamage));
        setIsHit2(true);
        setTimeout(() => setIsHit2(false), 600);
      }
    } else {
      setEnergy2(0);
      setIsUltimate2(true);
      setIsAttacking2(true);
      setIsSpecial2(true);
      
      setTimeout(() => {
        setIsUltimate2(false);
        setIsAttacking2(false);
        setIsSpecial2(false);
      }, 1200);

      // Ultimate deals massive damage and ignores some blocking
      if (distance <= ATTACK_RANGE + 100) {
        const ultimateDamage = isBlocking1 ? 25 : 45;
        setHealth1((prev) => Math.max(0, prev - ultimateDamage));
        setIsHit1(true);
        setTimeout(() => setIsHit1(false), 600);
      }
    }
  };

  // Keyboard controls
  useEffect(() => {
    if (winner) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // Player 1 controls (J K for movement, ASD for attacks, Q for ultimate, W for jump, E for dodge)
      if (key === 'j') {
        setMovingLeft1(true);
      } else if (key === 'k') {
        setMovingRight1(true);
      } else if (key === 'w') {
        handleJump(1);
      } else if (key === 'e') {
        handleDodge(1);
      } else if (key === 'a') {
        handleAttack(1, 10);
      } else if (key === 's') {
        handleAttack(1, 12, false, true);
      } else if (key === 'd') {
        setIsBlocking1(true);
      } else if (key === 'q') {
        handleUltimate(1);
      }

      // Player 2 controls (only in PvP mode)
      if (!isBotMode) {
        if (key === 'arrowleft') {
          setMovingLeft2(true);
        } else if (key === 'arrowright') {
          setMovingRight2(true);
        } else if (key === 'arrowup') {
          handleJump(2);
        } else if (key === 'arrowdown') {
          handleDodge(2);
        } else if (key === '1') {
          handleAttack(2, 10);
        } else if (key === '2') {
          handleAttack(2, 12, false, true);
        } else if (key === '3') {
          setIsBlocking2(true);
        } else if (key === '4') {
          handleUltimate(2);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // Player 1
      if (key === 'd') {
        setIsBlocking1(false);
      } else if (key === 'j') {
        setMovingLeft1(false);
      } else if (key === 'k') {
        setMovingRight1(false);
      }
      
      // Player 2 (only in PvP mode)
      if (!isBotMode) {
        if (key === '3') {
          setIsBlocking2(false);
        } else if (key === 'arrowleft') {
          setMovingLeft2(false);
        } else if (key === 'arrowright') {
          setMovingRight2(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [winner, isBlocking1, isBlocking2, position1, position2, isBotMode]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-orange-800 via-red-800 to-red-900">
      {/* Kygyz ornament pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,250,.05) 70px)`,
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start p-8">
        <div className="flex flex-col gap-2">
          <HealthBar health={health1} maxHealth={MAX_HEALTH} playerName={player1.name} isPlayer1={true} />
          {/* Energy Bar Player 1 */}
          <div className="w-64">
            <motion.div
              className="h-6 bg-black/60 rounded-full border-2 border-blue-400 overflow-hidden"
              animate={{ scale: energy1 >= ULTIMATE_COST ? [1, 1.05, 1] : 1 }}
              transition={{ repeat: energy1 >= ULTIMATE_COST ? Infinity : 0, duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${energy1}%` }}
                transition={{ duration: 0.3 }}
              >
                {energy1 >= ULTIMATE_COST && (
                  <motion.div
                    className="h-full w-full bg-white/30"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  />
                )}
              </motion.div>
            </motion.div>
            <p className={`text-center text-sm mt-1 font-bold ${energy1 >= ULTIMATE_COST ? 'text-cyan-300 animate-pulse' : 'text-blue-300'}`}>
              {energy1 >= ULTIMATE_COST ? '🔥 УЛЬТА ГОТОВА! [Q]' : `Энергия: ${Math.round(energy1)}%`}
            </p>
          </div>
        </div>
        
        {/* Timer */}
        <motion.div
          className="bg-black/80 border-4 border-yellow-600 rounded-full w-24 h-24 flex items-center justify-center"
          animate={{ scale: timer <= 10 ? [1, 1.1, 1] : 1 }}
          transition={{ repeat: timer <= 10 ? Infinity : 0, duration: 0.5 }}
        >
          <p className={`text-4xl font-bold ${timer <= 10 ? 'text-red-500' : 'text-yellow-400'}`}>
            {timer}
          </p>
        </motion.div>

        <div className="flex flex-col gap-2">
          <HealthBar
            health={health2}
            maxHealth={MAX_HEALTH}
            playerName={isBotMode ? `БОТ ${player2.name} ${botDifficulty === 'easy' ? '😊' : botDifficulty === 'hard' ? '😈' : '😐'}` : player2.name}
            isPlayer1={false}
          />
          {/* Energy Bar Player 2 */}
          <div className="w-64">
            <motion.div
              className="h-6 bg-black/60 rounded-full border-2 border-purple-400 overflow-hidden"
              animate={{ scale: energy2 >= ULTIMATE_COST ? [1, 1.05, 1] : 1 }}
              transition={{ repeat: energy2 >= ULTIMATE_COST ? Infinity : 0, duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-400"
                initial={{ width: 0 }}
                animate={{ width: `${energy2}%` }}
                transition={{ duration: 0.3 }}
              >
                {energy2 >= ULTIMATE_COST && (
                  <motion.div
                    className="h-full w-full bg-white/30"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  />
                )}
              </motion.div>
            </motion.div>
            <p className={`text-center text-sm mt-1 font-bold ${energy2 >= ULTIMATE_COST ? 'text-pink-300 animate-pulse' : 'text-purple-300'}`}>
              {energy2 >= ULTIMATE_COST ? '🔥 УЛЬТА ГОТОВА! [4]' : `Энергия: ${Math.round(energy2)}%`}
            </p>
          </div>
        </div>
      </div>

      {/* Distance and Difficulty indicator */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <div className="bg-black/60 px-4 py-2 rounded-lg">
          <p className="text-white text-sm">
            Дистанция: {Math.round(getDistance())} / {ATTACK_RANGE}
            {getDistance() <= ATTACK_RANGE && <span className="text-green-400 ml-2">✓ В радиусе атаки</span>}
          </p>
        </div>
        {isBotMode && (
          <motion.div
            className={`px-4 py-2 rounded-lg border-2 ${
              botDifficulty === 'easy'
                ? 'bg-green-900/80 border-green-400 text-green-300'
                : botDifficulty === 'hard'
                ? 'bg-red-900/80 border-red-400 text-red-300'
                : 'bg-yellow-900/80 border-yellow-400 text-yellow-300'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm font-bold">
              {botDifficulty === 'easy' && '😊 ЛЕГКИЙ'}
              {botDifficulty === 'medium' && '😐 СРЕДНИЙ'}
              {botDifficulty === 'hard' && '😈 СЛОЖНЫЙ'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Fight Arena */}
      <div className="relative z-10 h-[600px] mt-8">
        <div className="relative w-full h-full max-w-6xl mx-auto">
          {/* Ultimate Screen Flash Player 1 - Character Specific */}
          {isUltimate1 && (
            <motion.div
              className="absolute inset-0 z-40 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1, 0] }}
              transition={{ duration: 1.2 }}
            >
              {/* Manasch - Purple scrolls and wisdom */}
              {player1.id === 'manasch' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/70 to-indigo-600/70" />
                  <motion.div
                    className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 3, rotate: 360 }}
                    transition={{ duration: 1.2 }}
                  >
                    <div className="text-9xl">📜</div>
                  </motion.div>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-6xl"
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{ 
                        x: Math.cos(i * 72 * Math.PI / 180) * 300,
                        y: Math.sin(i * 72 * Math.PI / 180) * 300,
                        opacity: 0 
                      }}
                      transition={{ duration: 1.2 }}
                      style={{ left: '25%', top: '50%' }}
                    >
                      📖
                    </motion.div>
                  ))}
                  <motion.p
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl font-bold text-purple-200"
                    initial={{ scale: 0, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    МАНАС ЭПОС!
                  </motion.p>
                </>
              )}
              
              {/* Komuzchu - Blue music notes and sound waves */}
              {player1.id === 'komuzchu' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/70 to-cyan-500/70" />
                  <motion.div
                    className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 4, 3], rotate: [0, 180, 360] }}
                    transition={{ duration: 1.2 }}
                  >
                    <div className="text-9xl">🎵</div>
                  </motion.div>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-5xl"
                      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                      animate={{ 
                        x: [0, (i % 2 ? 1 : -1) * (i * 80)],
                        y: [0, -200 + i * 40],
                        opacity: [1, 0],
                        scale: [0, 1.5]
                      }}
                      transition={{ duration: 1.2, delay: i * 0.1 }}
                      style={{ left: '25%', top: '50%' }}
                    >
                      {i % 3 === 0 ? '♪' : i % 3 === 1 ? '♫' : '🎶'}
                    </motion.div>
                  ))}
                  <motion.p
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl font-bold text-cyan-200"
                    initial={{ scale: 0, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    КОМУЗ МЕЛОДИЯ!
                  </motion.p>
                </>
              )}
              
              {/* Baatyr - Red warrior strike with swords */}
              {player1.id === 'baatyr' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/70 to-orange-600/70" />
                  <motion.div
                    className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 4, rotate: 45 }}
                    transition={{ duration: 1.2 }}
                  >
                    <div className="text-9xl">⚔️</div>
                  </motion.div>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-6xl"
                      initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                      animate={{ 
                        x: Math.cos(i * 45 * Math.PI / 180) * 350,
                        y: Math.sin(i * 45 * Math.PI / 180) * 350,
                        opacity: 0,
                        rotate: 720
                      }}
                      transition={{ duration: 1.2 }}
                      style={{ left: '25%', top: '50%' }}
                    >
                      🗡️
                    </motion.div>
                  ))}
                  <motion.p
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl font-bold text-red-200"
                    initial={{ scale: 0, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    БААТЫР УДАР!
                  </motion.p>
                </>
              )}
              
              {/* Berkutchu - Brown eagle dive attack */}
              {player1.id === 'berkutchu' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-700/70 to-yellow-600/70" />
                  <motion.div
                    className="absolute top-0 left-1/4 -translate-x-1/2"
                    initial={{ y: -200, scale: 1 }}
                    animate={{ y: 300, scale: 4 }}
                    transition={{ duration: 1.2 }}
                  >
                    <div className="text-9xl">🦅</div>
                  </motion.div>
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-7xl"
                      initial={{ y: -100 - i * 50, x: -50 + i * 30, opacity: 0 }}
                      animate={{ 
                        y: 400,
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 1.2, delay: i * 0.15 }}
                      style={{ left: '20%' }}
                    >
                      🪶
                    </motion.div>
                  ))}
                  <motion.p
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl font-bold text-amber-200"
                    initial={{ scale: 0, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    БЕРКУТ АТАКА!
                  </motion.p>
                </>
              )}
            </motion.div>
          )}

          {/* Ultimate Screen Flash Player 2 - Character Specific */}
          {isUltimate2 && (
            <motion.div
              className="absolute inset-0 z-40 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1, 0] }}
              transition={{ duration: 1.2 }}
            >
              {/* Manasch */}
              {player2.id === 'manasch' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-l from-purple-600/70 to-indigo-600/70" />
                  <motion.div
                    className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 3, rotate: -360 }}
                    transition={{ duration: 1.2 }}
                  >
                    <div className="text-9xl">📜</div>
                  </motion.div>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-6xl"
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{ 
                        x: Math.cos(i * 72 * Math.PI / 180) * -300,
                        y: Math.sin(i * 72 * Math.PI / 180) * 300,
                        opacity: 0 
                      }}
                      transition={{ duration: 1.2 }}
                      style={{ right: '25%', top: '50%' }}
                    >
                      📖
                    </motion.div>
                  ))}
                  <motion.p
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl font-bold text-purple-200"
                    initial={{ scale: 0, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    МАНАС ЭПОС!
                  </motion.p>
                </>
              )}
              
              {/* Komuzchu */}
              {player2.id === 'komuzchu' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-l from-blue-500/70 to-cyan-500/70" />
                  <motion.div
                    className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 4, 3], rotate: [0, -180, -360] }}
                    transition={{ duration: 1.2 }}
                  >
                    <div className="text-9xl">🎵</div>
                  </motion.div>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-5xl"
                      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                      animate={{ 
                        x: [0, (i % 2 ? -1 : 1) * (i * 80)],
                        y: [0, -200 + i * 40],
                        opacity: [1, 0],
                        scale: [0, 1.5]
                      }}
                      transition={{ duration: 1.2, delay: i * 0.1 }}
                      style={{ right: '25%', top: '50%' }}
                    >
                      {i % 3 === 0 ? '♪' : i % 3 === 1 ? '♫' : '🎶'}
                    </motion.div>
                  ))}
                  <motion.p
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl font-bold text-cyan-200"
                    initial={{ scale: 0, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    КОМУЗ МЕЛОДИЯ!
                  </motion.p>
                </>
              )}
              
              {/* Baatyr */}
              {player2.id === 'baatyr' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-l from-red-600/70 to-orange-600/70" />
                  <motion.div
                    className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0, rotate: 45 }}
                    animate={{ scale: 4, rotate: -45 }}
                    transition={{ duration: 1.2 }}
                  >
                    <div className="text-9xl">⚔️</div>
                  </motion.div>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-6xl"
                      initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                      animate={{ 
                        x: Math.cos(i * 45 * Math.PI / 180) * -350,
                        y: Math.sin(i * 45 * Math.PI / 180) * 350,
                        opacity: 0,
                        rotate: -720
                      }}
                      transition={{ duration: 1.2 }}
                      style={{ right: '25%', top: '50%' }}
                    >
                      🗡️
                    </motion.div>
                  ))}
                  <motion.p
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl font-bold text-red-200"
                    initial={{ scale: 0, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    БААТЫР УДАР!
                  </motion.p>
                </>
              )}
              
              {/* Berkutchu */}
              {player2.id === 'berkutchu' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-l from-amber-700/70 to-yellow-600/70" />
                  <motion.div
                    className="absolute top-0 right-1/4 translate-x-1/2"
                    initial={{ y: -200, scale: 1 }}
                    animate={{ y: 300, scale: 4 }}
                    transition={{ duration: 1.2 }}
                  >
                    <div className="text-9xl">🦅</div>
                  </motion.div>
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-7xl"
                      initial={{ y: -100 - i * 50, x: 50 - i * 30, opacity: 0 }}
                      animate={{ 
                        y: 400,
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 1.2, delay: i * 0.15 }}
                      style={{ right: '20%' }}
                    >
                      🪶
                    </motion.div>
                  ))}
                  <motion.p
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl font-bold text-amber-200"
                    initial={{ scale: 0, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    БЕРКУТ АТАКА!
                  </motion.p>
                </>
              )}
            </motion.div>
          )}

          <HumanFighter
            fighter={player1}
            isPlayer1={true}
            isAttacking={isAttacking1}
            isKicking={isKicking1}
            isBlocking={isBlocking1}
            isSpecialAttack={isSpecial1}
            isHit={isHit1}
            isJumping={isJumping1}
            isDodging={isDodging1}
            health={health1}
            position={position1}
          />

          <HumanFighter
            fighter={player2}
            isPlayer1={false}
            isAttacking={isAttacking2}
            isKicking={isKicking2}
            isBlocking={isBlocking2}
            isSpecialAttack={isSpecial2}
            isHit={isHit2}
            isJumping={isJumping2}
            isDodging={isDodging2}
            health={health2}
            position={position2}
          />
        </div>
      </div>

      {/* Winner Screen */}
      {winner && (
        <motion.div
          className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="text-center"
          >
            <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-8" />
            <h2 className="text-6xl font-bold text-yellow-300 mb-4">
              {winner === 'НИЧЬЯ' ? winner : `${winner} ПОБЕЖДАЕТ!`}
            </h2>
            <motion.button
              onClick={onRestart}
              className="mt-8 px-8 py-4 bg-yellow-500 text-black text-2xl font-bold rounded-xl hover:bg-yellow-400 transition-colors flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-6 h-6" />
              ИГРАТЬ СНОВА
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Controls */}
      {!winner && <Controls isBotMode={isBotMode} />}
    </div>
  );
}