import { Header } from '@/components/Header';
import { MainLayout } from '@/components/MainLayout';
import { useEffect, useState, useRef } from 'react';

import { Button } from '../../components/Button';
import { GameEngine, Player, Swarm, Star } from './Engine';

import styles from './GamePage.module.css';

const GAME_AREA_STYLE = {
  aspectRatio: (
    GameEngine.gameAreaWidth / GameEngine.gameAreaHeight
  ).toString(),
};

let gameEngine: GameEngine | null = null;

const enum Status {
  start = 'start',
  gameOver = 'game-over',
  run = 'run',
}

const Game = () => {
  const [gameStatus, setGameStatus] = useState(Status.start);
  const [score, setScore] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  const gameStart = () => {
    setScore(0);
    setGameStatus(Status.run);
    if (!gameEngine) {
      throw new Error('Игра еще не инициализирована');
    }
    gameEngine.start();
  };

  useEffect(() => {
    const { current: canvasNode } = canvasRef;
    const { current: gameNode } = gameRef;
    if (!canvasNode || !gameNode) {
      throw new Error('Could not get canvas node');
    }

    const ctx = canvasNode.getContext('2d');
    if (ctx == null) {
      throw new Error('Could not get 2d context');
    }

    gameEngine = new GameEngine({
      ctx,
      debug: false,
      onScoreUpdate: setScore,
      onGameOver(newScore) {
        setGameStatus(Status.gameOver);
        setScore(newScore);
      },
    });
    gameEngine.registerObject([Player, Swarm, Star]);
    gameEngine.init();

    const keyUpHandler: (
      this: Document,
      ev: DocumentEventMap['keyup']
    ) => void = ({ code }) => {
      if (code === 'KeyF') {
        if (!document.fullscreenElement) {
          gameNode.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    };

    document.addEventListener('keyup', keyUpHandler);

    return () => {
      if (gameEngine) {
        gameEngine.emergencyStop();
        gameEngine = null;
      }
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, [canvasRef, gameRef]);

  const className = (...args: string[]) => {
    return args.join(' ');
  };

  const renderGameOverlay = () => (
    <div className={styles.game_overlay}>
      <h1 className={styles.game_text}>
        {gameStatus === Status.gameOver ? (
          'Игра окончена'
        ) : (
          <>
            <p>Управляйте клавишами "a" и "d" или стрелками</p>
            <p>стрельба "space"</p>
            <p>развернуть в полный экран "f"</p>
          </>
        )}
      </h1>
      {gameStatus === Status.gameOver && (
        <h1 className={styles.game_text}>
          Вы набрали:{' '}
          <span
            className={className(
              styles['score-text'],
              styles['score-text__red']
            )}
          >
            {score}
          </span>
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
    <>
      <Header />
      <MainLayout>
        <div ref={gameRef} className={styles.game}>
          <div className={styles.game_area} style={GAME_AREA_STYLE}>
            <div className={className(styles.game_score, styles['score-text'])}>
              {score}
            </div>
            <canvas ref={canvasRef} />
            {gameStatus !== Status.run && renderGameOverlay()}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Game;
