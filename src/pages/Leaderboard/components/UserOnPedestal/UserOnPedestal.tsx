import userService from '@/services/userService';
import { useEffect, useState } from 'react';
import { TProps } from './types';
import { Avatar } from '../../../../components/Avatar';

const UserOnPedestal: TProps = ({ userData, cls, position }) => {
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

  const getBorderType = () => {
    switch (position) {
      case 1:
        return 'gold';
      case 2:
        return 'blue';
      case 3:
        return 'green';
      default:
        return 'gold';
    }
  };
  return (
    <div className={`text-white ${cls}`}>
      <Avatar
        src={getAvatarUrl()}
        className="pedestal-avatar"
        alt={userData.username}
        borderType={getBorderType()}
        badge={`${position}`}
        size="xxl"
      />
      <p>{userData.displayName}</p>
      <p className="font-bold text-primary">{userData.score}</p>
      <p className="text-muted">@{userData.username}</p>
    </div>
  );
};

export default UserOnPedestal;
