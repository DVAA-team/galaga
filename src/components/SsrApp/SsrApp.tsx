import '../../assets/styles/main.css';
import './SsrApp.css';
// import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';

import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '@/store/slices/userSlice';
import { StaticRouter } from 'react-router-dom/server';
import { SignUp } from '@/pages/SignUp';
import { Profile } from '@/pages/Profile';
import { Dashboard } from '@/pages/Dashboard';
import { Leaderboard } from '@/pages/Leaderboard';
import { Forum } from '@/pages/Forum';
import { ForumPost } from '@/pages/ForumPost';
import { Home } from '@/pages/Home';
import { SignIn } from '../../pages/SignIn';
import userService from '../../services/userService';

type TOwnProps = {
  location?: string;
};

type TProps = FC<TOwnProps>;

const SsrApp: TProps = ({ ...props }) => {
  const { location = '/' } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    userService.getUser().then((profile) => {
      if (profile !== null) {
        dispatch(setUserProfile(profile));
      }
    });
  }, [dispatch]);

  return (
    <StaticRouter location={location}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/forum">
          <Route path="" element={<Forum />} />
          <Route path="posts/:postId" element={<ForumPost />} />
        </Route>
      </Routes>
    </StaticRouter>
  );
};

export default SsrApp;
