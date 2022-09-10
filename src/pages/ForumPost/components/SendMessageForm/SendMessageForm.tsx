import React, { useRef } from 'react';
import { EmojiPicker } from '@/components/EmojiPicker';
import styles from './SendMessageForm.module.css';
import { Button } from '../../../../components/Button';
import { TProps } from './types';

const SendMessageForm: TProps = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { current: form } = formRef;

    if (form) {
      const data = new FormData(form);

      // eslint-disable-next-line no-console
      console.log(data);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
      <EmojiPicker
        inputName="postTitle"
        inputPlaceholder="Type your message"
        inputClassName={styles.input}
        darkButton={true}
        position="top"
      />
      <Button cls={styles.button} text="Send" type="submit" />
    </form>
  );
};

export default SendMessageForm;
