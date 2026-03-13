import { useState } from 'react';
import { MainMenu } from './components/MainMenu';
import { CharacterSelect } from './components/CharacterSelect';
import { FightArena } from './components/FightArena';
import { FighterData } from './components/HumanFighter';

export default function App() {
  const [gameState, setGameState] = useState<'menu' | 'select' | 'fight'>('menu');
  const [player1, setPlayer1] = useState<FighterData | null>(null);
  const [player2, setPlayer2] = useState<FighterData | null>(null);
  const [isBotMode, setIsBotMode] = useState(false);

  const handleModeSelect = (mode: 'pvp' | 'bot') => {
    setIsBotMode(mode === 'bot');
    setGameState('select');
  };

  const handleSelectComplete = (p1: FighterData, p2: FighterData, botMode: boolean) => {
    setPlayer1(p1);
    setPlayer2(p2);
    setIsBotMode(botMode);
    setGameState('fight');
  };

  const handleRestart = () => {
    setGameState('menu');
    setPlayer1(null);
    setPlayer2(null);
    setIsBotMode(false);
  };

  const handleBackToMenu = () => {
    setGameState('menu');
    setPlayer1(null);
    setPlayer2(null);
  };

  return (
    <>
      {gameState === 'menu' && <MainMenu onStartGame={handleModeSelect} />}
      {gameState === 'select' && <CharacterSelect onSelectComplete={handleSelectComplete} initialBotMode={isBotMode} onBack={handleBackToMenu} />}
      {gameState === 'fight' && player1 && player2 && (
        <FightArena player1={player1} player2={player2} onRestart={handleRestart} isBotMode={isBotMode} />
      )}
    </>
  );
}
