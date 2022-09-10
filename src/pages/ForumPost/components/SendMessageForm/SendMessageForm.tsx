import React, { SyntheticEvent, useEffect, useState } from 'react';
import { EmojiPicker } from '@/components/EmojiPicker';
import { Input } from '@/components/Input';
import forumService from '@/services/forumService';
import styles from './SendMessageForm.module.css';
import { Button } from '../../../../components/Button';
import { TProps } from './types';

const SendMessageForm: TProps = ({
  postId,
  commentId = null,
  sendCallback,
}) => {
  const [isNeedClearInput, setIsNeedClearInput] = useState(false);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const text = formData.get('text')?.toString();

    if (!text) {
      return;
    }

    forumService
      .createMessageForPost({ postId, commentId, text })
      .then((post) => {
        if (sendCallback) {
          sendCallback(post);
        }
        setIsNeedClearInput(true);
      });
  };

  useEffect(() => {
    if (isNeedClearInput) {
      setIsNeedClearInput(false);
    }
  }, [isNeedClearInput]);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <EmojiPicker
        isNeedClearInput={isNeedClearInput}
        darkButton={true}
        position="top"
      >
        <Input
          name="text"
          placeholder="Type your message"
          autoComplete="off"
          cls={styles.input}
          withoutMargin={true}
          withLabel={false}
        />
      </EmojiPicker>
      <Button cls={styles.button} text="Send" type="submit" />
    </form>
  );
};

export default SendMessageForm;
