import { EmojiPicker } from '@/components/EmojiPicker';
import { SyntheticEvent, useEffect, useState } from 'react';
import forumService from '@/services/forumService';
import { Input } from '@/components/Input';
import styles from './CreatePostForm.module.css';
import { Button } from '../../../../components/Button';
import { TProps } from './types';

const CreatePostForm: TProps = ({ addNewPost }) => {
  const [isNeedClearInput, setIsNeedClearInput] = useState(false);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const title = formData.get('title')?.toString();

    if (!title) {
      return;
    }

    forumService.createPost({ title }).then((post) => {
      addNewPost(post);
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
            placeholder="Let’s share what going on your mind..."
            autoComplete="off"
            cls={styles.input}
            withoutMargin={true}
            withLabel={false}
          />
        </EmojiPicker>
        <Button cls={styles.button} text="Create post" type="submit" />
      </form>
    </div>
  );
};

export default CreatePostForm;
