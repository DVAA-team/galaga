import React, { useEffect, useState } from 'react';
import styles from './Message.module.css';
import { TProps } from './types';
import { PostUserInfo } from '../../../../components/PostUserInfo';
import { Comment } from '../Comment';
import { TOwnProps as TCommentProps } from '../Comment/types';

type TCommentData = TCommentProps & {
  id: number;
};

const Message: TProps = ({
  userDisplayName,
  userAvatarURL,
  date = '',
  text = '',
  commentsNumber = 0,
  isMine = false,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [comments, setComments] = useState<TCommentData[]>([]);

  const handleClick = () => {
    setIsActive((prev) => !prev);
  };

  const getBodyClasses = () => {
    return `${styles.body} ${isMine ? styles.mine : ''} ${
      isActive ? styles.active : ''
    }`;
  };

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

  return (
    <div className="mb-8" onClick={handleClick}>
      <PostUserInfo
        name={userDisplayName}
        avatarURL={userAvatarURL}
        date={date}
      />

      <div className={getBodyClasses()}>{text}</div>

      <div className={styles.footer}>
        <span>{commentsNumber} comments</span>
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
