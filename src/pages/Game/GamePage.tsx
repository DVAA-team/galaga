import { useCallback, useState } from 'react';

import { Button } from '../../components/Button';
import { GameEngine, GAME_HEIGHT, GAME_WIDTH, Player, Swarm } from './Engine';

let gameEngine: GameEngine;

const GamePage = () => {
  const [gameMode, setGameMode] = useState('start');

  const [score, setScore] = useState(0);

  const gameStart = () => {
    setScore(0);
    setGameMode('run');
    gameEngine.start();
  };

  const onCanvasRefChange = useCallback(
    (canvasNode: HTMLCanvasElement | null) => {
      if (canvasNode !== null) {
        const ctx = canvasNode.getContext('2d');
        if (ctx == null) throw new Error('Could not get 2d context');

        gameEngine = new GameEngine({
          ctx,
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          debug: true,
          onScoreUpdate: setScore,
          onGameOver(newScore) {
            setGameMode('game-over');
            setScore(newScore);
          },
        });
        gameEngine.registerObject([Player, Swarm]);
        gameEngine.init();
      }
    },
    []
  );

  return (
    <div
      className="mx-auto border border-rose-500 rounded-lg flex flex-col justify-center items-center relative p-2"
      style={{
        width: `calc(${GAME_WIDTH}px + 0.75rem)`,
        height: `calc(${GAME_HEIGHT}px + 0.75rem)`,
      }}
    >
      <p className="absolute text-white top-1 left-2 text-lg">{score}</p>

      <canvas
        ref={onCanvasRefChange}
        className="absolute top-1 left-1"
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
      />
      {gameMode === 'start' && (
        <>
          <p>Управляйте клавишами "a" и "d" или стрелками, стрельба "space"</p>
          <Button text="Начать игру" cls="z-10" onClick={gameStart} />
        </>
      )}
      {gameMode === 'game-over' && (
        <>
          <h1 className="py-2 text-lg font-bold">Игра окончена</h1>
          <h1 className="py-2 text-lg font-semibold">
            Вы набрали:{' '}
            <span className="text-red-500 font-extrabold">{score}</span>
          </h1>

          <Button text="Играть ещё раз" cls="z-10" onClick={gameStart} />
        </>
      )}
    </div>
  );
};

export default GamePage;
