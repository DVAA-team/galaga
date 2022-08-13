import { useEffect, useState } from 'react';

import { Button } from '../../components/Button';
import { GameEngine, GAME_HEIGHT, GAME_WIDTH, Player, Swarm } from './Engine';

import styles from './GamePage.module.css';

const GAME_AREA = {
  width: `${GAME_WIDTH}px`,
  height: `${GAME_HEIGHT}px`,
};

let gameEngine: GameEngine | null;

const enum Status {
  start = 'start',
  gameOver = 'game-over',
  run = 'run',
}

const Game = () => {
  const [gameStatus, setGameStatus] = useState(Status.start);

  const [score, setScore] = useState(0);

  const gameStart = () => {
    setScore(0);
    setGameStatus(Status.run);
    if (!gameEngine) throw new Error('Игра еще не инициализирована');
    gameEngine.start();
  };

  useEffect(() => {
    const canvasNode = document.querySelector<HTMLCanvasElement>('#game');
    if (canvasNode !== null) {
      const ctx = canvasNode.getContext('2d');
      if (ctx == null) throw new Error('Could not get 2d context');
      gameEngine = new GameEngine({
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        debug: false,
        onScoreUpdate: setScore,
        onGameOver(newScore) {
          setGameStatus(Status.gameOver);
          setScore(newScore);
        },
      });
      gameEngine.registerObject([Player, Swarm]);
      if (gameEngine) gameEngine.init(ctx);
    }

    return () => {
      if (!gameEngine) throw new Error('Игра еще не инициализирована');
      gameEngine.emergencyStop();
      gameEngine = null;
    };
  }, []);

  const renderGameOverlay = () => (
    <div className={styles.game_overlay}>
      <h1 className={styles.game_text}>
        {gameStatus === Status.gameOver
          ? 'Игра окончена'
          : 'Управляйте клавишами "a" и "d" или стрелками, стрельба "space"'}
      </h1>
      {gameStatus === Status.gameOver && (
        <h1 className={styles.game_text}>
          Вы набрали:{' '}
          <span className="text-red-500 font-extrabold">{score}</span>
        </h1>
      )}

      <Button
        text={gameStatus === Status.start ? 'Начать игру' : 'Играть ещё раз'}
        cls="z-10"
        onClick={gameStart}
      />
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.spacer} />
      <div className={styles.game}>
        <div className={styles.spacer} />
        <div className={styles.game_area} style={GAME_AREA}>
          <p className={styles.game_score}>{score}</p>
          <canvas id="game" width={GAME_WIDTH} height={GAME_HEIGHT} />
          {gameStatus !== Status.run && renderGameOverlay()}
        </div>
        <div className={styles.spacer} />
      </div>
      <div className={styles.spacer} />
    </div>
  );
};

export default Game;
