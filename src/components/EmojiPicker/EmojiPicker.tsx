import {
  ChangeEvent,
  cloneElement,
  FC,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import EmojiList from './EmojiList';
import styles from './EmojiPicker.module.css';

type TOwnProps = {
  darkButton?: boolean;
  position?: string;
  children: JSX.Element;
  isNeedClearInput?: boolean;
};

type TProps = FC<TOwnProps>;

const EmojiPicker: TProps = (props) => {
  const { darkButton, position = 'bottom', children, isNeedClearInput } = props;
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
    return EmojiList.map((emoji, index) => {
      return (
        <span className={styles.emoji} key={index} onClick={handlerEmojiClick}>
          {emoji}
        </span>
      );
    });
  };

  const renderChildren = () =>
    cloneElement(children, {
      value,
      onChange: handlerChangeInput,
    });

  useEffect(() => {
    if (isNeedClearInput) {
      setValue('');
    }
  }, [isNeedClearInput]);

  return (
    <div className={styles.emojis}>
      {renderChildren()}
      <button
        className={`${styles.button} ${
          darkButton ? styles['button-dark'] : ''
        }`}
        onClick={(e) => handlerButtonClick(e)}
        ref={emojisEl}
        type="button"
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
