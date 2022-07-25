import React, { useCallback, useRef, useState } from 'react';
import styles from './SendMessagePanel.module.css';
import { Input } from '../../../../components/Input';
import { Button } from '../../../../components/Button';
import { TProps } from './types';

const SendMessagePanel: TProps = ({ handleClick }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState('');

  const handleChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
    },
    []
  );

  const btnClick = () => {
    if (handleClick) {
      handleClick()(text);
      if (inputRef && inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <div className="w-full flex justify-between items-center mt-6 mb-10">
      <form className={styles.form}>
        <Input
          ref={inputRef}
          name="postTitle"
          placeholder="Type your message"
          autoComplete="off"
          cls={styles.input}
          onChange={handleChangeInput}
        />
      </form>
      <Button cls={styles.button} text="Send" onClick={btnClick} />
    </div>
  );
};

export default SendMessagePanel;
