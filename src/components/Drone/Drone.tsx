import { FC } from 'react';

import './Drone.scss';

interface DroneProps {
  x: number;
  y: number;
}

const Drone: FC<DroneProps> = ({ x, y }) => {
  return (
    <svg
      className="drone"
      viewBox="0 0 100 100"
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translateX(-50%) translateY(-50%)',
      }}
    >
      <polygon points="0,100 50,0 100,100" fill="green" />
    </svg>
  );
};

export default Drone;
