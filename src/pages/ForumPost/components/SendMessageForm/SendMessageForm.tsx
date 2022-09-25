import { SyntheticEvent, useEffect, useState } from 'react';
import { EmojiPicker } from '@/components/EmojiPicker';
import { Input } from '@/components/Input';
import forumService from '@/services/forumService';
import { useAppDispatch } from '@/hooks/store';
import { addMessageToPost } from '@/store/slices/forumSlice';
import { useAuth } from '@/hooks/useAuth';
import { useCSRFToken } from '@/hooks/useCSRFToken';
import styles from './SendMessageForm.module.css';
import { Button } from '../../../../components/Button';
import { TProps } from './types';

const SendMessageForm: TProps = ({ postId }) => {
  const [isNeedClearInput, setIsNeedClearInput] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAuth();
  const token = useCSRFToken();

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    if (target) {
      const formData = new FormData(target);
      const text = formData.get('text')?.toString();

      if (!text) {
        return;
      }

      forumService.setCSRFToken(token);

      forumService
        .createMessageForPost({
          postId,
          text,
        })
        .then((post) => {
          if (user) {
            dispatch(addMessageToPost({ ...post, user }));
            setIsNeedClearInput(true);
          }
        });
    }
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
          placeholder="Ваш комментарий..."
          autoComplete="off"
          cls={styles.input}
          withoutMargin={true}
          withLabel={false}
        />
      </EmojiPicker>
      <Button cls={styles.button} text="Отправить" type="submit" />
    </form>
  );
};

export default SendMessageForm;
