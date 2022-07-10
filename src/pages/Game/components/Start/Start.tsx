import { HEIGHT_GAME, WIDTH_GAME } from '../../const';

type StartProps = {
  onStart: () => void;
};

const Start = ({ onStart }: StartProps) => (
  <div
    className="mx-auto border-2 border-rose-500 rounded-lg flex justify-center items-center"
    style={{
      width: `${WIDTH_GAME + 4}px`,
      height: `${HEIGHT_GAME + 4}px`,
    }}
  >
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onStart}
    >
      Начать игру
    </button>
  </div>
);

export default Start;
