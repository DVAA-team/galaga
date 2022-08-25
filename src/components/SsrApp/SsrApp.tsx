import '../../assets/styles/main.css';
import './SsrApp.css';
import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
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

const SsrApp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/game" element={<Game />} />
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
