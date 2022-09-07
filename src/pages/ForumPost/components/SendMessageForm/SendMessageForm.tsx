import React, { useCallback, useRef, useState } from 'react';
import styles from './SendMessageForm.module.css';
import { Input } from '../../../../components/Input';
import { Button } from '../../../../components/Button';
import { TProps } from './types';

const SendMessageForm: TProps = ({ emitSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState('');

  const handleChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
    },
    []
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text) {
      emitSubmit(text);
      if (inputRef && inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        name="postTitle"
        placeholder="Type your message"
        autoComplete="off"
        cls={styles.input}
        onChange={handleChangeInput}
      />
      <Button cls={styles.button} text="Send" type="submit" view="primary" />
    </form>
  );
};

export default SendMessageForm;
