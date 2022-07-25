import React from 'react';
import styles from './Comment.module.css';
import { TProps } from './types';
import { PostUserInfo } from '../../../../components/PostUserInfo';

const Comment: TProps = ({
  userDisplayName,
  userAvatarURL,
  date = '',
  text = '',
}) => {
  return (
    <div className="flex flex-col items-end mt-6">
      <PostUserInfo
        name={userDisplayName}
        date={date}
        avatarURL={userAvatarURL}
      />
      <div className={styles.comment}>{text}</div>
    </div>
  );
};

export default React.memo(Comment);
