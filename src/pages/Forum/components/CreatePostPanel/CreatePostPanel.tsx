import './CreatePostPanel.css';
import { Avatar } from '../../../../components/Avatar';
import { Input } from '../../../../components/Input';
import { Button } from '../../../../components/Button';

const CreatePostPanel = () => {
  return (
    <div className="w-full flex flex-row items-center">
      <div className="w-2/12 flex justify-center">
        <Avatar className="" />
      </div>
      <div className="w-6/12 md:w-8/12 mx-2">
        <form className="create-post-form">
          <Input
            name="postTitle"
            placeholder="Let’s share what going on your mind..."
            autoComplete="off"
            cls="create-post-input"
          />
        </form>
      </div>
      <div className="w-4/12 md:w-2/12">
        <Button cls="create-post-button" text="Create post" />
      </div>
    </div>
  );
};

export default CreatePostPanel;
