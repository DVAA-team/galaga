import { Avatar } from '../Avatar';
import { TProps } from './types';
import styles from './PostUserInfo.module.css';

const PostUserInfo: TProps = ({ name, date, avatarURL }) => {
  return (
    <div className="flex items-center">
      <Avatar src={avatarURL} className="mr-4" />
      <div>
        <div className={styles.username}>{name}</div>
        <span className={styles.date}>{date}</span>
      </div>
    </div>
  );
};

export default PostUserInfo;
