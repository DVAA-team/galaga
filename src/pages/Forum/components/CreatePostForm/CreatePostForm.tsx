import { EmojiPicker } from '@/components/EmojiPicker';
import styles from './CreatePostForm.module.css';
import { Avatar } from '../../../../components/Avatar';
import { Button } from '../../../../components/Button';

const CreatePostForm = () => {
  return (
    <div className="flex items-center w-full md:w-10/12">
      <Avatar className="" />
      <form className={styles.form}>
        <EmojiPicker
          inputName="postTitle"
          inputPlaceholder="Let’s share what going on your mind..."
          inputClassName={styles.input}
        />
        <Button
          cls={styles.button}
          text="Create post"
          type="submit"
          view="primary"
        />
      </form>
    </div>
  );
};

export default CreatePostForm;
