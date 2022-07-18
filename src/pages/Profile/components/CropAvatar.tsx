import {
  FC,
  MouseEventHandler,
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drag, setDrag] = useState(false);
  const [imageOptions, setImageOptions] = useState(() => {
    const ratio = image.height / image.width;
    let imgHeight = size + border * 2;
    let imgWidth = size + border * 2;
    let imgX = 0;
    let imgY = 0;
    if (ratio > 1) {
      imgHeight = size + border * 2;
      imgWidth = imgHeight / ratio;
      imgY = 0;
      imgX = (size + border * 2) / 2 - imgWidth / 2;
    } else {
      imgWidth = size + border * 2;
      imgHeight = imgWidth * ratio;
      imgY = (size + border * 2) / 2 - imgHeight / 2;
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

  const drawOverlay = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.arc(
      (size + border * 2) / 2,
      (size + border * 2) / 2,
      size / 2,
      0,
      Math.PI * 2
    );
    ctx.rect(0, 0, size + border * 2, size + border * 2);
    ctx.fill('evenodd');
    ctx.restore();
  };

  const drawImage = (
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
  };

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
    ctx.clearRect(0, 0, size + border * 2, size + border * 2);

    drawImage(ctx);
    drawOverlay(ctx);
  }, [imageOptions]);

  return (
    <div className="fixed flex justify-center items-center w-full h-full backdrop-blur-md">
      <div className="p-4 rounded-lg bg-white flex flex-col justify-center items-center max-w-min">
        <canvas
          ref={canvasRef}
          className="cursor-pointer"
          width={size + border * 2}
          height={size + border * 2}
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
