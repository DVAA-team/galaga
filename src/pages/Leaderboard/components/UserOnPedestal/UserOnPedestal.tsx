import { TProps } from './types';
import { Avatar } from '../../../../components/Avatar';

const UserOnPedestal: TProps = ({ userData, cls, position }) => {
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
    <div className={cls}>
      <Avatar
        src={userData.avatarURL}
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
