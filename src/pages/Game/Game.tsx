import { useState } from 'react';

import { GameOver } from './components/GameOver';
import { Play } from './components/Play';
import { Start } from './components/Start';
import GameEngine from './GameEngine';

const Game = () => {
  const [gameMode, setGameMode] = useState('start');

  const startHandler = () => {
    setGameMode('play');
  };

  const [score, setScore] = useState(0);

  let gameEngine: GameEngine | null = null;

  const stopHandler = (newScore: number) => {
    gameEngine?.stop();
    setScore(newScore);
    setGameMode('game-over');
  };

  const startGame = (ctx: CanvasRenderingContext2D) => {
    gameEngine = new GameEngine(ctx);
    gameEngine.start();
  };

  switch (gameMode) {
    case 'start':
      return <Start onStart={startHandler} />;
    case 'play':
      return <Play onStartGame={startGame} onGameOver={stopHandler} />;
    case 'game-over':
      return <GameOver score={score} onRestart={startHandler} />;
    default:
      return <p>Unknown mode</p>;
  }
};

export default Game;
