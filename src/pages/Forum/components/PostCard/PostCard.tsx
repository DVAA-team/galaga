import styles from './PostCard.module.css';
import { TProps } from './types';
import { PostUserInfo } from '../../../../components/PostUserInfo';

const PostCard: TProps = ({
  title,
  userDisplayName,
  userAvatarURL,
  date,
  messagesNumber,
  membersNumber,
}) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.card_title}>{title}</h3>
      <div className={styles.card_body}>
        <PostUserInfo
          name={userDisplayName}
          avatarURL={userAvatarURL}
          date={date}
        />
        <div className="flex flex-wrap justify-end items-center">
          <span className={styles.card_infotext}>
            {messagesNumber} messages
          </span>
          <span className={styles.card_infotext}>{membersNumber} members</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
