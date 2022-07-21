import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
  WheelEventHandler,
} from 'react';
import { Button } from '../../../components/Button';

export type TOnSaveHandler = (image: Blob) => void;

type TCropAvatarProps = {
  image: ImageBitmap;
  border: number;
  size: number;
  onSave: TOnSaveHandler;
};

const CropAvatar: FC<TCropAvatarProps> = ({ image, border, size, onSave }) => {
  const CANVAS_WIDTH = size + border * 2;
  const CANVAS_HEIGHT = size + border * 2;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drag, setDrag] = useState(false);
  const [imageOptions, setImageOptions] = useState(() => {
    const ratio = image.height / image.width;
    let imgHeight = CANVAS_HEIGHT;
    let imgWidth = CANVAS_WIDTH;
    let imgX = 0;
    let imgY = 0;
    if (ratio > 1) {
      imgHeight = CANVAS_HEIGHT;
      imgWidth = imgHeight / ratio;
      imgY = 0;
      imgX = CANVAS_WIDTH / 2 - imgWidth / 2;
    } else {
      imgWidth = CANVAS_WIDTH;
      imgHeight = imgWidth * ratio;
      imgY = CANVAS_HEIGHT / 2 - imgHeight / 2;
      imgX = 0;
    }

    return {
      x: imgX,
      y: imgY,
      width: imgWidth,
      height: imgHeight,
      ratio,
      scale: 1,
    };
  });

  const drawOverlay = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.beginPath();
      ctx.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, size / 2, 0, Math.PI * 2);
      ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fill('evenodd');
      ctx.restore();
    },
    [CANVAS_HEIGHT, CANVAS_WIDTH, size]
  );

  const drawImage = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      offset: { x: number; y: number } = { x: 0, y: 0 }
    ) => {
      ctx.save();
      ctx.scale(imageOptions.scale, imageOptions.scale);
      ctx.drawImage(
        image,
        imageOptions.x + offset.x,
        imageOptions.y + offset.y,
        imageOptions.width,
        imageOptions.height
      );
      ctx.restore();
    },
    [
      image,
      imageOptions.height,
      imageOptions.scale,
      imageOptions.width,
      imageOptions.x,
      imageOptions.y,
    ]
  );

  const MouseMoveHandler: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (!drag) {
      return;
    }
    event.preventDefault();

    setImageOptions({
      ...imageOptions,
      x: imageOptions.x + event.movementX,
      y: imageOptions.y + event.movementY,
    });
  };

  const MouseDownHandler: MouseEventHandler<HTMLCanvasElement> = (event) => {
    event.preventDefault();

    event.currentTarget.classList.remove('cursor-pointer');
    event.currentTarget.classList.add('cursor-move');
    setDrag(true);
  };
  const MouseUpHandler: MouseEventHandler<HTMLCanvasElement> = (event) => {
    event.currentTarget.classList.remove('cursor-move');
    event.currentTarget.classList.add('cursor-pointer');
    setDrag(false);
  };
  const WheelHandler: WheelEventHandler<HTMLCanvasElement> = (event) => {
    setImageOptions({
      ...imageOptions,
      scale: (imageOptions.scale += Math.sign(event.deltaY) * 0.1),
    });
  };

  const saveHandler = () => {
    const canvas = document.createElement('canvas');

    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Error get context');
    }
    ctx.clearRect(0, 0, size, size);
    ctx.translate(-border, -border);
    drawImage(ctx);

    canvas.toBlob((res) => {
      if (res) onSave(res);
    });
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) {
      throw new Error('Error get context');
    }
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawImage(ctx);
    drawOverlay(ctx);
  }, [CANVAS_HEIGHT, CANVAS_WIDTH, drawImage, drawOverlay, imageOptions]);

  return (
    <div className="fixed flex flex-row justify-center items-center w-full h-full backdrop-blur-md top-0 left-0 overflow-scroll py-5 box-border">
      <div className="m-auto p-4 rounded-lg bg-white flex flex-col justify-center items-center max-w-min">
        <canvas
          ref={canvasRef}
          className="cursor-pointer"
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onMouseDown={MouseDownHandler}
          onMouseUp={MouseUpHandler}
          onMouseMove={MouseMoveHandler}
          onWheel={WheelHandler}
        />
        <p className="text-gray-500 text-sm text-center m-auto">
          Перетаскивайте изображение с помощью мыши.
        </p>
        <p className="text-gray-500 text-sm text-center m-auto">
          Используйте колесико мышии чтобы изменить масштаб.
        </p>
        <Button text="Применить" cls="mt-4" onClick={saveHandler} />
      </div>
    </div>
  );
};

export default CropAvatar;
