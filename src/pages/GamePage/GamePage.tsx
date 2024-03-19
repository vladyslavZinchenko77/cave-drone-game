import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getPlayerToken, getCaveData } from '../../services/gameService';

import Cave from '../../components/Cave/Cave';
import Drone from '../../components/Drone/Drone';
import GameControl from '../../components/GameControl/GameControl';

const GamePage: FC = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const [playerToken, setPlayerToken] = useState('');
  const [caveData, setCaveData] = useState<[number, number][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (playerId) {
        try {
          const token = await getPlayerToken(playerId);
          setPlayerToken(token);

          const caveData = await getCaveData(playerId, token);
          setCaveData(caveData);
        } catch (error) {
          console.error('Error fetching game data:', error);
        }
      }
    };

    fetchData();
  }, [playerId]);

  return (
    <div>
      <h2>Game is starting</h2>
      <Cave />
      <Drone />
      <GameControl />
    </div>
  );
};

export default GamePage;
