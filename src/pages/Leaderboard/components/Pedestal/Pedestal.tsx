import { UserOnPedestal } from '../UserOnPedestal';
import { TProps } from './types';

const Pedestal: TProps = ({ first, second, third }) => {
  return (
    <div className="pedestal">
      <div className="pedestal-footing">
        <UserOnPedestal
          userData={second}
          position={2}
          cls={'pedestal-footing-item'}
        />
        <UserOnPedestal
          userData={third}
          position={3}
          cls={'pedestal-footing-item'}
        />
      </div>
      <UserOnPedestal userData={first} position={1} cls={'pedestal-champion'} />
    </div>
  );
};

export default Pedestal;
