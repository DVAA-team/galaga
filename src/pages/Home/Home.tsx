import { Link, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/hooks/store';
import userService from '@/services/userService';
import { setUserProfile } from '@/store/slices/userSlice';
import yandexOAuthService from '@/services/yandexOAuthService';
import { MainLayout } from '@/components/MainLayout';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import ship from '../../assets/images/ship.png';

const Home = () => {
  const userData = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    userService.getUserFromDB(2).then((profile) => {
      // eslint-disable-next-line no-console
      console.log(profile);
    });

    if (userData === null) {
      const authorizationCode = searchParams.get('code');
      if (authorizationCode) {
        yandexOAuthService.signIn(authorizationCode).then((data) => {
          if (data === 'OK') {
            userService.getUser().then((profile) => {
              if (profile !== null) {
                dispatch(setUserProfile(profile));
                searchParams.delete('code');
                setSearchParams(searchParams);
              }
            });
          }
        });
      }
    }
  }, [dispatch, searchParams, setSearchParams, userData]);

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
