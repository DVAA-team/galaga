import styles from './CreatePostForm.module.css';
import { Avatar } from '../../../../components/Avatar';
import { Input } from '../../../../components/Input';
import { Button } from '../../../../components/Button';

const CreatePostForm = () => {
  return (
    <div className="flex items-center w-full md:w-10/12">
      <Avatar className="" />
      <form className={styles.form}>
        <Input
          name="postTitle"
          placeholder="Let’s share what going on your mind..."
          autoComplete="off"
          cls={styles.input}
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
