import { EmojiPicker } from '@/components/EmojiPicker';
import { SyntheticEvent, useEffect, useState } from 'react';
import forumService from '@/services/forumService';
import { Input } from '@/components/Input';
import { useAppDispatch } from '@/hooks/store';
import { addPosts } from '@/store/slices/forumSlice';
import { useAuth } from '@/hooks/useAuth';
import { useCSRFToken } from '@/hooks/useCSRFToken';
import styles from './CreatePostForm.module.css';
import { Button } from '../../../../components/Button';

const CreatePostForm = () => {
  const [isNeedClearInput, setIsNeedClearInput] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAuth();
  const token = useCSRFToken();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const title = formData.get('title')?.toString();

    if (!title) {
      return;
    }

    forumService.setCSRFToken(token);

    forumService.createPost({ title }).then((post) => {
      dispatch(addPosts({ ...post, user }));
      setIsNeedClearInput(true);
    });
  };

  useEffect(() => {
    if (isNeedClearInput) {
      setIsNeedClearInput(false);
    }
  }, [isNeedClearInput]);

  return (
    <div className="flex items-center w-full md:w-10/12">
      <form className={styles.form} onSubmit={onSubmit}>
        <EmojiPicker isNeedClearInput={isNeedClearInput}>
          <Input
            name="title"
            placeholder="Напишите что-нибудь, пожалуйста..."
            autoComplete="off"
            cls={styles.input}
            withoutMargin={true}
            withLabel={false}
          />
        </EmojiPicker>
        <Button cls={styles.button} text="Создать пост" type="submit" />
      </form>
    </div>
  );
};

export default CreatePostForm;
