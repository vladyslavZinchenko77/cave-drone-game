import React, { FC, useEffect } from 'react';

interface GameControlProps {
  setDroneSpeed: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}

const GameControl: FC<GameControlProps> = ({ setDroneSpeed }) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;

    switch (key) {
      case 'ArrowLeft':
        setDroneSpeed((prevSpeed) => ({
          ...prevSpeed,
          x: Math.max(-5, prevSpeed.x - 1),
        }));
        break;
      case 'ArrowRight':
        setDroneSpeed((prevSpeed) => ({
          ...prevSpeed,
          x: Math.min(5, prevSpeed.x + 1),
        }));
        break;
      case 'ArrowUp':
        setDroneSpeed((prevSpeed) => ({
          ...prevSpeed,
          y: Math.min(5, prevSpeed.y + 1),
        }));
        break;
      case 'ArrowDown':
        setDroneSpeed((prevSpeed) => ({
          ...prevSpeed,
          y: Math.max(-5, prevSpeed.y - 1),
        }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      handleKeyDown(event);
    };

    window.addEventListener('keydown', handleKeyDownEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, [handleKeyDown]);

  return null;
};

export default GameControl;
