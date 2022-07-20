import './Leaderboard.css';
import { Avatar } from '../../components/Avatar';
import fakeAvatar1 from '../../assets/images/jobs.png';

const Leaderboard = () => (
  <div className="container mx-auto flex flex-row justify-center items-center flex-wrap">
    <h1 className="w-full mt-3 text-3xl text-center font-bold">Leaderboard page</h1>
    <div className="pedestal">
      <div className="pedestal-footing">
        <div className="pedestal-footing-item">
          <Avatar
            src={fakeAvatar1}
            className="pedestal-avatar"
            alt="Jackson"
            borderType="blue"
            badge="2"
            size="xxl"
          />
          <p>Jackson</p>
          <p className="font-bold text-primary">1847</p>
          <p className="text-muted">@username</p>
        </div>
        <div className="pedestal-footing-item">
          <Avatar
            src={fakeAvatar1}
            className="pedestal-avatar"
            alt="Jackson"
            borderType="green"
            badge="3"
            size="xxl"
          />
          <p>Jackson</p>
          <p className="font-bold text-success">1847</p>
          <p className="text-muted">@username</p>
        </div>
      </div>
      <div className="pedestal-champion">
        <Avatar
          src={fakeAvatar1}
          className="pedestal-avatar"
          alt="Jackson"
          borderType="gold"
          size="xxl"
          badge="1"
        />
        <p>Jackson</p>
        <p className="font-bold text-gold">1847</p>
        <p className="text-muted">@username</p>
      </div>
    </div>
    <div className="champions-arena">
      <div className="champions-arena-item">
        <div className="flex items-center">
          <div className="mr-4 md:mr-10">
            <Avatar src={fakeAvatar1} />
          </div>
          <div>
            <div>Sebastian</div>
            <small className="text-muted">@username</small>
          </div>
        </div>
        <div>1024</div>
      </div>
      <div className="champions-arena-item">
        <div className="flex items-center">
          <div className="mr-4 md:mr-10">
            <Avatar src={fakeAvatar1} />
          </div>
          <div>
            <div>Sebastian</div>
            <small className="text-muted">@username</small>
          </div>
        </div>
        <div>1024</div>
      </div>
      <div className="champions-arena-item">
        <div className="flex items-center">
          <div className="mr-4 md:mr-10">
            <Avatar src={fakeAvatar1} />
          </div>
          <div>
            <div>Sebastian</div>
            <small className="text-muted">@username</small>
          </div>
        </div>
        <div>1024</div>
      </div>
      <div className="champions-arena-item">
        <div className="flex items-center">
          <div className="mr-4 md:mr-10">
            <Avatar src={fakeAvatar1} />
          </div>
          <div>
            <div>Sebastian</div>
            <small className="text-muted">@username</small>
          </div>
        </div>
        <div>1024</div>
      </div>
      <div className="champions-arena-item">
        <div className="flex items-center">
          <div className="mr-4 md:mr-10">
            <Avatar src={fakeAvatar1} />
          </div>
          <div>
            <div>Sebastian</div>
            <small className="text-muted">@username</small>
          </div>
        </div>
        <div>1024</div>
      </div>
      <div className="champions-arena-item">
        <div className="flex items-center">
          <div className="mr-4 md:mr-10">
            <Avatar src={fakeAvatar1} />
          </div>
          <div>
            <div>Sebastian</div>
            <small className="text-muted">@username</small>
          </div>
        </div>
        <div>1024</div>
      </div>
      <div className="champions-arena-item">
        <div className="flex items-center">
          <div className="mr-4 md:mr-10">
            <Avatar src={fakeAvatar1} />
          </div>
          <div>
            <div>Sebastian</div>
            <small className="text-muted">@username</small>
          </div>
        </div>
        <div>1024</div>
      </div>
    </div>
  </div>
);

export default Leaderboard;
