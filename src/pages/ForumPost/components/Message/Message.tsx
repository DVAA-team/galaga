import React, { useEffect, useState } from 'react';
import userService from '@/services/userService';

import { TForumUser } from '@/services/types';
import { serverToClientNaming } from '@/utils/convertNaming';
import { useAppDispatch } from '@/hooks/store';
import { addUserAvatarToMessage } from '@/store/slices/forumSlice';
import { useAuth } from '@/hooks/useAuth';
import convertNumWords from '@/utils/convertNumWords';
import styles from './Message.module.css';
import { TProps } from './types';
import { PostUserInfo } from '../../../../components/PostUserInfo';
import { Comment } from '../Comment';

import { TOwnProps as TCommentProps } from '../Comment/types';

type TCommentData = TCommentProps & {
  id: number;
};

const Message: TProps = ({ id, postId, createdAt, text = '', user }) => {
  const [isActive, setIsActive] = useState(false);
  const currentUser = useAuth();
  const [author] = useState<TForumUser>(serverToClientNaming(user));
  const [avatar, setAvatar] = useState<Blob>();
  const [currentUserId, setCurrentUserId] = useState(0);
  const [comments, setComments] = useState<TCommentData[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser) {
      const { id: userId } = currentUser;
      setCurrentUserId(userId);
    }
  }, [currentUser]);

  useEffect(() => {
    if (author) {
      const { avatar: userAvatar, avatarUrl } = author;

      if (avatarUrl) {
        return;
      }

      if (userAvatar) {
        userService.getAvatar(userAvatar).then((res) => {
          if (res) {
            setAvatar(res);
            dispatch(
              addUserAvatarToMessage({
                id,
                postId,
                avatarUrl: URL.createObjectURL(res),
              })
            );
          }
        });
      }
    }
  }, [author, dispatch, id, postId]);

  useEffect(() => {
    setComments([
      {
        id: 1,
        userDisplayName: 'Bob',
        date: '01.01.2001',
        text: 'Коммент какого-то юзера',
      },
      {
        id: 2,
        userDisplayName: 'Alice',
        date: '01.01.2001',
        text: 'Прикольно',
      },
      {
        id: 3,
        userDisplayName: 'Pol',
        date: '01.01.2001',
        text: 'Я поддерживаю!',
      },
    ]);
  }, []);

  const handleClick = () => {
    setIsActive((prev) => !prev);
  };

  const getBodyClasses = () => {
    return `${styles.body} ${currentUserId === author.id ? styles.mine : ''} ${
      isActive ? styles.active : ''
    }`;
  };

  const getAvatarUrl = () => {
    const { avatarUrl } = author;

    if (avatarUrl) {
      return avatarUrl;
    }

    return avatar ? URL.createObjectURL(avatar) : null;
  };

  return (
    <div className="mb-8" onClick={handleClick}>
      {author && (
        <PostUserInfo
          name={author.displayName || author.login}
          avatarURL={getAvatarUrl()}
          date={createdAt || ''}
        />
      )}

      <div className={getBodyClasses()}>{text}</div>

      <div className={styles.footer}>
        <span>
          {comments.length}{' '}
          {convertNumWords(comments.length, [
            'комментарий',
            'комментария',
            'комментариев',
          ])}
        </span>
      </div>

      {isActive && (
        <div className="flex flex-col items-end mt-4">
          {comments.map((item) => (
            <Comment key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(Message);
