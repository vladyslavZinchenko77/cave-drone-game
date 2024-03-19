import { FC } from 'react';
import { useParams } from 'react-router';
import Cave from '../../components/Cave/Cave';
import Drone from '../../components/Drone/Drone';
import GameControl from '../../components/GameControl/GameControl';

const GamePage: FC = () => {
  const { playerId } = useParams<{ playerId: string }>();

  console.log(playerId);

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
