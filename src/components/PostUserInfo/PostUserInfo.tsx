import { Avatar } from '../Avatar';
import { TProps } from './types';
import styles from './PostUserInfo.module.css';
import defaultAvatar from '../../assets/images/ico/avatar.svg';

const PostUserInfo: TProps = ({ name, date, avatarURL }) => {
  return (
    <div className="flex items-center">
      <Avatar src={avatarURL || defaultAvatar} className="mr-4" />
      <div>
        <div className={styles.username}>{name}</div>
        {date && <span className={styles.date}>{date}</span>}
      </div>
    </div>
  );
};

export default PostUserInfo;
