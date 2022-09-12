import { Header } from '@/components/Header';
import { MainLayout } from '@/components/MainLayout';
import { useEffect, useState } from 'react';
import { ChampionsArenaItem } from './components/ChampionsArenaItem';
import { Pedestal } from './components/Pedestal';
import './Leaderboard.css';
import { IUserData } from './types';

const Leaderboard = () => {
  const [champions, setChampions] = useState<IUserData[]>([]);
  const [users, setUsers] = useState<IUserData[]>([]);

  useEffect(() => {
    setChampions([
      { username: 'fu1000', displayName: 'First user', score: 3000 },
      { username: 'fu2000', displayName: 'Second user', score: 2000 },
      { username: 'fu3000', displayName: 'Third user', score: 1000 },
    ]);

    setUsers([
      { username: 'usr1', displayName: 'User 1', score: 500 },
      { username: 'usr2', displayName: 'User 2', score: 400 },
      { username: 'usr3', displayName: 'User 3', score: 300 },
      { username: 'usr4', displayName: 'User 4', score: 200 },
      { username: 'usr5', displayName: 'User 5', score: 100 },
    ]);
  }, []);

  return (
    <>
      <Header title="Лучшие игроки" />
      <MainLayout>
        <Pedestal
          first={champions[0]}
          second={champions[1]}
          third={champions[2]}
        />

        <div className="champions-arena text-white">
          {users.map((user) => (
            <ChampionsArenaItem key={user.username} userData={user} />
          ))}
        </div>
      </MainLayout>
    </>
  );
};

export default Leaderboard;
