import React, { useEffect, useState } from 'react';
import userService from '@/services/userService';

import { TUser } from '@/services/types';
import styles from './Message.module.css';
import { TProps } from './types';
import { PostUserInfo } from '../../../../components/PostUserInfo';
import { Comment } from '../Comment';

import { TOwnProps as TCommentProps } from '../Comment/types';

type TCommentData = TCommentProps & {
  id: number;
};

const Message: TProps = ({ userId, date = '', text = '', isMine = false }) => {
  const [isActive, setIsActive] = useState(false);

  const [author, setAuthor] = useState<TUser | null>(null);
  const [avatar, setAvatar] = useState<Blob>();

  const [comments, setComments] = useState<TCommentData[]>([]);

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
    return `${styles.body} ${isMine ? styles.mine : ''} ${
      isActive ? styles.active : ''
    }`;
  };

  return (
    <div className="mb-8" onClick={handleClick}>
      {author && (
        <PostUserInfo
          name={author.displayName || author.login}
          avatarURL={avatar ? URL.createObjectURL(avatar) : null}
          date={date}
        />
      )}

      <div className={getBodyClasses()}>{text}</div>

      <div className={styles.footer}>
        <span>{comments.length} комментариев</span>
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
