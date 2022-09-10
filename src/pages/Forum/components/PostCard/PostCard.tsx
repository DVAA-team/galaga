import { useEffect, useState } from 'react';
import userService from '@/services/userService';
import { TUser } from '@/services/types';
import forumService from '@/services/forumService';
import { PostUserInfo } from '@/components/PostUserInfo';
import { Link } from 'react-router-dom';
import styles from './PostCard.module.css';
import { TProps } from './types';

const PostCard: TProps = ({ id, title, userId }) => {
  const [author, setAuthor] = useState<TUser | null>(null);
  const [avatar, setAvatar] = useState<Blob>();
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    userService.getUserFromDB(userId).then((profile) => {
      if (profile !== null) {
        setAuthor(profile);

        const { avatar: userAvatar } = profile;

        if (userAvatar) {
          userService.getAvatar(userAvatar).then((res) => {
            if (res) {
              setAvatar(res);
            }
          });
        }
      }
    });
  }, [userId]);

  useEffect(() => {
    forumService.getMessagesForPost(id).then((comments) => {
      setCommentsCount(comments.length);
    });
  }, [id]);

  const renderCard = () => (
    <div className={styles.card}>
      <h3 className={styles.card_title}>{title}</h3>
      {author && (
        <div className={styles.card_body}>
          <PostUserInfo
            name={author.displayName || author.login}
            avatarURL={avatar ? URL.createObjectURL(avatar) : null}
          />
          <div className="flex flex-wrap justify-end items-center">
            <span className={styles.card_infotext}>
              {commentsCount} комментариев
            </span>
          </div>
        </div>
      )}
    </div>
  );

  return <Link to={`posts/${id}`}>{renderCard()}</Link>;
};

export default PostCard;
