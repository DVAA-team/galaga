import { useEffect, useState } from 'react';
import forumService from '@/services/forumService';
import { PostUserInfo } from '@/components/PostUserInfo';
import { Link } from 'react-router-dom';
import { serverToClientNaming } from '@/utils/convertNaming';
import { TForumUser } from '@/services/types';
import { useAppDispatch } from '@/hooks/store';
import { addAllMessagesToPost } from '@/store/slices/forumSlice';
import convertNumWords from '@/utils/convertNumWords';
import styles from './PostCard.module.css';
import { TProps } from './types';

const PostCard: TProps = ({ id, title, user, createdAt, messages }) => {
  const [author] = useState<TForumUser>(serverToClientNaming(user));
  const [messagesCount, setMessagesCount] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (messages) {
      setMessagesCount(messages.length);
    } else {
      forumService.getMessagesForPost(id).then((res) => {
        setMessagesCount(res.length);
        dispatch(addAllMessagesToPost({ messages: res, postId: id }));
      });
    }
  }, [messages, dispatch, id]);

  const renderCard = () => (
    <div className={styles.card}>
      <h3 className={styles.card_title}>{title}</h3>
      {author && (
        <div className={styles.card_body}>
          <PostUserInfo
            name={author.displayName || author.login}
            avatarURL={author.avatar}
            date={createdAt || ''}
          />
          <div className="flex flex-wrap justify-end items-center">
            <span className={styles.card_infotext}>
              {messagesCount}{' '}
              {convertNumWords(messagesCount, [
                'комментарий',
                'комментария',
                'комментариев',
              ])}
            </span>
          </div>
        </div>
      )}
    </div>
  );

  return <Link to={`posts/${id}`}>{renderCard()}</Link>;
};

export default PostCard;
