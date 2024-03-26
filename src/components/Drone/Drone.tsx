import { FC } from 'react';

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
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translateX(-50%) translateY(-50%) rotate(180deg)',
      }}
    >
      <polygon points="0,0 50,100 100,0" fill="green" />
    </svg>
  );
};

export default Drone;
