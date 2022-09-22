import { useEffect, useState } from 'react';
import userService from '@/services/userService';
import { Avatar } from '../../../../components/Avatar';
import { TProps } from './types';

const ChampionsArenaItem: TProps = ({ userData }) => {
  const [avatar, setAvatar] = useState<Blob>();

  useEffect(() => {
    const { avatar: userAvatar } = userData;

    if (userAvatar) {
      userService.getAvatar(userAvatar).then((res) => {
        if (res) {
          setAvatar(res);
        }
      });
    }
  }, [userData]);

  const getAvatarUrl = () => {
    return avatar ? URL.createObjectURL(avatar) : undefined;
  };

  return (
    <div className="champions-arena-item">
      <div className="flex items-center">
        <div className="mr-4 md:mr-10">
          <Avatar src={getAvatarUrl()} />
        </div>
        <div>
          <div>{userData.displayName}</div>
          <small className="text-muted">@{userData.username}</small>
        </div>
      </div>
      <div>{userData.score}</div>
    </div>
  );
};

export default ChampionsArenaItem;
