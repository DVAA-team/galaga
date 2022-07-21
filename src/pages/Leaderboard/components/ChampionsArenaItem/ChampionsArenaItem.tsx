import { Avatar } from '../../../../components/Avatar';
import { TProps } from './types';

const ChampionsArenaItem: TProps = ({ userData }) => {
  return (
    <div className="champions-arena-item">
      <div className="flex items-center">
        <div className="mr-4 md:mr-10">
          <Avatar src={userData.avatarURL} />
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
