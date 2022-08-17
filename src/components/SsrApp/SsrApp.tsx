import '../../assets/styles/main.css';
import './SsrApp.css';

// FIXME: ругается на ReactToastify.css
// import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '@/store/slices/userSlice';
import userService from '../../services/userService';
import { Home } from '../../pages/Home';
import { SignIn } from '../../pages/SignIn';
import { SignUp } from '../../pages/SignUp';
import { Profile } from '../../pages/Profile';
import { Dashboard } from '../../pages/Dashboard';

// FIXME: ругается на Audiocontext - его нет на сервере.
//  Добавил утилиту isServerEnvCheker.ts - её можно использовать для определения того где мы находимся
// import { Game } from '../../pages/Game';

import { Leaderboard } from '../../pages/Leaderboard';
import { NotFound } from '../../pages/NotFound';
import { Forum } from '../../pages/Forum';
import { ForumPost } from '../../pages/ForumPost';

const SsrApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    userService.getUser().then((profile) => {
      if (profile !== null) {
        dispatch(setUserProfile(profile));
      }
    });
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />

        {/* FIXME: ругается на Audiocontext - его нет на сервере. */}
        {/* <Route path="/game" element={<Game />} /> */}

        <Route path="/forum">
          <Route path="" element={<Forum />} />
          <Route path="posts/:postId" element={<ForumPost />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default SsrApp;
