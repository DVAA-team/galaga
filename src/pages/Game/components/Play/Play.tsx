import { useCallback, useEffect, useState } from 'react';
import { HEIGHT_GAME, WIDTH_GAME } from '../../const';

type PlayProps = {
  onStartGame: (ctx: CanvasRenderingContext2D) => void;
  onGameOver: (score: number) => void;
};

const Play = ({ onGameOver, onStartGame }: PlayProps) => {
  const [canvasNode, setCanvasNode] = useState<HTMLCanvasElement | null>(null);
  const onCanvasRefChange = useCallback(setCanvasNode, []);
  useEffect(() => {
    if (canvasNode !== null) {
      const ctx = canvasNode.getContext('2d');
      if (ctx == null) throw new Error('Could not get 2d context');
      onStartGame(ctx);
    }
  }, [canvasNode]);

  return (
    <>
      <canvas
        ref={onCanvasRefChange}
        className="mx-auto border-2 border-rose-500 rounded-lg"
        width={WIDTH_GAME}
        height={HEIGHT_GAME}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => onGameOver(2000)}
      >
        Закончить игру
      </button>
    </>
  );
};

export default Play;
