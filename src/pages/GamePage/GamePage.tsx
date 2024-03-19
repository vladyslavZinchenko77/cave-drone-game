import { FC } from 'react';
import Cave from '../../components/Cave/Cave';
import Drone from '../../components/Drone/Drone';
import GameControl from '../../components/GameControl/GameControl';

const GamePage: FC = () => {
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
