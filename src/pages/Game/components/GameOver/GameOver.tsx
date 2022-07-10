import { HEIGHT_GAME, WIDTH_GAME } from '../../const';

type GameOverProps = {
  score: number;
  onRestart: () => void;
};

const GameOver = ({ onRestart, score }: GameOverProps) => (
  <div
    className="mx-auto border-2 border-rose-500 rounded-lg flex flex-col justify-center items-center"
    style={{
      width: `${WIDTH_GAME + 4}px`,
      height: `${HEIGHT_GAME + 4}px`,
    }}
  >
    <h1 className="py-2 text-lg font-bold">Игра окончена</h1>
    <h1 className="py-2 text-lg font-semibold">
      Вы набрали: <span className="text-red-500 font-extrabold">{score}</span>
    </h1>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onRestart}
    >
      Играть еще раз
    </button>
  </div>
);

export default GameOver;
