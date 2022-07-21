import { TProps } from './types';
import { UserOnPedestal } from '../UserOnPedestal';

const Pedestal: TProps = ({ first, second, third }) => {
  return (
    <div className="pedestal">
      <div className="pedestal-footing">
        {second && <UserOnPedestal userData={second} position={2} cls={'pedestal-footing-item'} />}
        {third && <UserOnPedestal userData={third} position={3} cls={'pedestal-footing-item'} />}
      </div>
      {first && <UserOnPedestal userData={first} position={1} cls={'pedestal-champion'} />}
    </div>
  );
};

export default Pedestal;
