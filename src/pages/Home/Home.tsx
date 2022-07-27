import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const Home = () => {
  const userData = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (userData !== null) {
      setIsAuthorized(true);
    }
  }, [userData]);

  const renderNotAuthLinks = () => (
    <>
      <li>
        <Link className="font-bold underline" to="/sign-in">
          Sign-in page
        </Link>
      </li>
      <li>
        <Link className="font-bold underline" to="/sign-up">
          Sign-up page
        </Link>
      </li>
    </>
  );

  const renderAuthLinks = () => (
    <>
      <li>
        <Link className="font-bold underline" to="/profile">
          Profile
        </Link>
      </li>
      <li>
        <Link className="font-bold underline" to="/game">
          Game
        </Link>
      </li>
    </>
  );

  return (
    <div className="home container mx-auto flex flex-row justify-center content-center items-center flex-wrap h-full">
      <h1 className="w-full mt-3 mb-3 text-3xl text-center font-bold">
        Home page
      </h1>
      <nav>
        <ul className="text-center">
          {isAuthorized ? renderAuthLinks() : renderNotAuthLinks()}
          <li>
            <Link className="font-bold underline" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="font-bold underline" to="/leaderboard">
              Leaderboard
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
