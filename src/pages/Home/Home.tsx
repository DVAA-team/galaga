import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/MainLayout';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import ship from '../../assets/images/ship.png';

const Home = () => {
  return (
    <>
      <Header />
      <MainLayout>
        <div className="home flex w-full">
          <div className="home__image w-1/2 flex">
            <div className="w-2/3 m-auto">
              <img src={ship} alt="" />
            </div>
          </div>
          <div className="home__content w-1/2 text-center flex flex-col justify-center flex-wrap dark:text-white">
            <h3 className="text-5xl font-bold mb-3">Galaga</h3>
            <p className="text-2xl">Ретро космический шутер</p>
            <div className="flex flex-row flex-wrap mt-5 justify-center">
              <Link to="/game">
                <Button text="🚀&#160;&#160;Играть" view="primary" />
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
