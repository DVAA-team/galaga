import React, { useEffect, useState } from 'react';
import { TForumUser } from '@/services/types';
import { serverToClientNaming } from '@/utils/convertNaming';
import userService from '@/services/userService';
import styles from './Comment.module.css';
import { TProps } from './types';
import { PostUserInfo } from '../../../../components/PostUserInfo';

const Comment: TProps = ({ user, createdAt, text = '' }) => {
  const [author] = useState<TForumUser>(serverToClientNaming(user));
  const [avatar, setAvatar] = useState<Blob>();

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
          }
        });
      }
    }
  }, [author]);

  const getAvatarUrl = () => {
    const { avatarUrl } = author;

    if (avatarUrl) {
      return avatarUrl;
    }

    return avatar ? URL.createObjectURL(avatar) : null;
  };

  return (
    <div className="flex flex-col items-end mt-6">
      <PostUserInfo
        name={author.displayName || author.login}
        avatarURL={getAvatarUrl()}
        date={createdAt || ''}
      />
      <div className={styles.comment}>{text}</div>
    </div>
  );
};

export default React.memo(Comment);
