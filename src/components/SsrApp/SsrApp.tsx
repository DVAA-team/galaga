import '../../assets/styles/main.css';
import './SsrApp.css';

import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';
import { isUserAuthorized } from '@/utils/guards';
import ym from 'react-yandex-metrika';
import { useEffect } from 'react';
import { Home } from '../../pages/Home';
import { SignIn } from '../../pages/SignIn';
import { SignUp } from '../../pages/SignUp';
import { Profile } from '../../pages/Profile';
import { Dashboard } from '../../pages/Dashboard';
import { Game } from '../../pages/Game';
import { Leaderboard } from '../../pages/Leaderboard';
import { NotFound } from '../../pages/NotFound';
import { Forum } from '../../pages/Forum';
import { ForumPost } from '../../pages/ForumPost';
import { ProtectedRoute } from '../ProtectedRoute';

const SsrApp = () => {
  const userData = useAuth();
  const location = useLocation();

  useEffect(() => {
    ym('hit', location.pathname);
  }, [location]);
  const guardConditionUserAuth = isUserAuthorized(userData);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={
            <ProtectedRoute
              redirectPath="/profile"
              isAllowed={!guardConditionUserAuth}
            >
              <SignIn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <ProtectedRoute
              redirectPath="/profile"
              isAllowed={!guardConditionUserAuth}
            >
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              redirectPath="/sign-in"
              isAllowed={guardConditionUserAuth}
              notify="Вам нужно авторизоваться!"
            >
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/game" element={<Game />} />
        <Route path="/forum">
          <Route path="" element={<Forum />} />
          <Route path="posts/:postId" element={<ForumPost />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer theme={'colored'} />
    </>
  );
};

export default SsrApp;
