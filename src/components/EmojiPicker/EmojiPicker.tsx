import {
  ChangeEvent,
  FC,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Input } from '../Input';
import styles from './EmojiPicker.module.css';

type TOwnProps = {
  inputName: string;
  inputPlaceholder?: string;
  inputClassName?: string;
  darkButton?: boolean;
  position?: string;
};

type TProps = FC<TOwnProps>;

const emojiList: string[] = [
  '🚀',
  '🧑‍🚀',
  '🌌',
  '🪐',
  '🌦',
  '🌟',
  '🌍',
  '🌎',
  '🌏',
  '💫',
  '✨',
  '🗺',
  '🌞',
  '🌙',
  '🌕',
  '🌓',
  '🌗',
  '🌖',
  '🌔',
  '🌘',
  '🌑',
  '⭐',
  '🗺️',
  '🌠',
  '🛸',
  '🔭',
  '🛰️',
  '🌐',
  '🌃',
];

const EmojiPicker: TProps = (props) => {
  const {
    inputName,
    inputPlaceholder,
    inputClassName,
    darkButton,
    position = 'bottom',
  } = props;
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const emojisEl = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onClick = ({ target }: Event): void => {
      if (!emojisEl.current?.contains(target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const handlerButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handlerEmojiClick = (e: MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLSpanElement;
    setValue((prev) => `${prev}${target.textContent}`);
  };

  const handlerChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  const renderEmojies = () => {
    return emojiList.map((emoji, index) => {
      return (
        <span className={styles.emoji} key={index} onClick={handlerEmojiClick}>
          {emoji}
        </span>
      );
    });
  };

  return (
    <div className={styles.emojis}>
      <Input
        name={inputName}
        placeholder={inputPlaceholder}
        autoComplete="off"
        cls={inputClassName}
        withoutMargin={true}
        withLabel={false}
        value={value}
        onChange={handlerChangeInput}
      />
      <button
        className={`${styles.button} ${
          darkButton ? styles['button-dark'] : ''
        }`}
        onClick={(e) => handlerButtonClick(e)}
        ref={emojisEl}
      ></button>
      <div
        className={`${styles.popup} ${isOpen ? styles['popup-open'] : ''} ${
          styles[`popup-${position}`]
        }`}
      >
        {renderEmojies()}
      </div>
    </div>
  );
};

export default EmojiPicker;
