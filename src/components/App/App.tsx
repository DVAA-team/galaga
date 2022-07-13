import '../../assets/styles/main.css';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Dashboard } from '../../pages/Dashboard';
import { GamePage } from '../../pages/Game';
import { Home } from '../../pages/Home';
import { Leaderboard } from '../../pages/Leaderboard';
import { NotFound } from '../../pages/NotFound';
import { Profile } from '../../pages/Profile';
import { SignIn } from '../../pages/SignIn';
import { SignUp } from '../../pages/SignUp';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
export default App;
