import { Header } from '@/components/Header';
import { MainLayout } from '@/components/MainLayout';
import { useEffect, useState } from 'react';
import leaderboardService from '@/services/leaderboardService';
import { TLeaderboardData } from '@/api/types';
import { ChampionsArenaItem } from './components/ChampionsArenaItem';
import { Pedestal } from './components/Pedestal';
import './Leaderboard.css';
import { IUserData } from './types';

const Leaderboard = () => {
  const [champions, setChampions] = useState<IUserData[]>([]);
  const [users, setUsers] = useState<IUserData[]>([]);

  useEffect(() => {
    leaderboardService.getAllLeaders().then((leaders) => {
      if (leaders && leaders.length) {
        const firstThreeLeaders = leaders.splice(0, 3);
        setChampions(
          firstThreeLeaders.map((item: TLeaderboardData) => {
            return {
              username: item.user.login,
              displayName: item.user.display_name,
              score: item.score,
              avatar: item.user.avatar,
            };
          })
        );
        setUsers(
          leaders.map((item: TLeaderboardData) => {
            return {
              username: item.user.login,
              displayName: item.user.display_name,
              score: item.score,
              avatar: item.user.avatar,
            };
          })
        );
      }
    });
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
          {users && users.length > 0 ? (
            users.map((user) => (
              <ChampionsArenaItem key={user.username} userData={user} />
            ))
          ) : (
            <div className="text-center">Здесь пока никого нет</div>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Leaderboard;
