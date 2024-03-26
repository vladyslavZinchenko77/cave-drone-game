import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getPlayerToken } from '../../services/gameService';
import Cave from '../../components/Cave/Cave';
import Drone from '../../components/Drone/Drone';
import GameControl from '../../components/GameControl/GameControl';
import { Modal } from 'antd';
import Loader from '../../components/Loader/Loader';

interface GamePageParams {
  playerId: string;
}

interface DronePosition {
  x: number;
  y: number;
}

interface DroneSpeed {
  x: number;
  y: number;
}

const GamePage = () => {
  const { playerId } = useParams<GamePageParams>();
  const [caveData, setCaveData] = useState<[number, number][]>([]);
  const [dronePosition, setDronePosition] = useState<DronePosition>({
    x: 50,
    y: 10,
  });
  const [droneSpeed, setDroneSpeed] = useState<DroneSpeed>({ x: 0, y: 0 });
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);
  const [complexity, setComplexity] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
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

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (playerId) {
        setIsLoading(true);
        try {
          const token = await getPlayerToken(playerId);
          const newSocket = new WebSocket(
            `wss://cave-drone-server.shtoa.xyz/cave`
          );
          setSocket(newSocket);

          newSocket.onopen = () => {
            newSocket.send(`player:${playerId}-${token}`);
          };

          newSocket.onmessage = (event) => {
            if (event.data === 'finished') {
              newSocket.close();
            } else {
              const [left, right] = event.data.split(',').map(Number);
              setCaveData((prevData) => [...prevData, [left, right]]);
            }
          };

          newSocket.onclose = () => {
            setSocket(null);
          };
        } catch (error) {
          console.error('Error fetching game data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [playerId]);

  useEffect(() => {
    const updateGame = () => {
      const newX = dronePosition.x + droneSpeed.x;
      const newY = dronePosition.y + droneSpeed.y;
      setDronePosition({ x: newX, y: newY });

      const collision = detectCollision(newX, newY, caveData);
      if (collision) {
        setGameOver(true);
        return;
      }

      if (newY > window.innerHeight - 100) {
        setWin(true);
        return;
      }

      const scoreMultiplier = 10;
      const newScore = score + scoreMultiplier * (droneSpeed.y + complexity);
      setScore(newScore);
    };

    const gameLoop = setInterval(updateGame, 100);
    return () => clearInterval(gameLoop);
  }, [dronePosition, droneSpeed, caveData, complexity, score]);

  const detectCollision = (
    x: number,
    y: number,
    caveData: [number, number][]
  ) => {
    const droneWidth = 50;
    const droneHeight = 30;
    const wallHeight = 100;

    for (let i = 0; i < caveData.length; i++) {
      const [leftWall, rightWall] = caveData[i];

      if (
        y >= window.innerHeight - wallHeight &&
        y <= window.innerHeight &&
        ((x >= leftWall && x <= leftWall + wallHeight) ||
          (x + droneWidth >= rightWall - wallHeight &&
            x + droneWidth <= rightWall))
      ) {
        return true;
      }

      if (
        y >= window.innerHeight - wallHeight - droneHeight &&
        y <= window.innerHeight - wallHeight &&
        x + droneWidth > leftWall &&
        x < rightWall
      ) {
        return true;
      }
    }

    return false;
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Game is starting</h2>
          <div style={{ width: '600px', height: '600px' }}>
            <Cave
              wallHeight={10}
              caveData={caveData}
              height={window.innerHeight}
              width={window.innerWidth}
            />
            <Drone x={dronePosition.x} y={dronePosition.y} />
            <GameControl setDroneSpeed={setDroneSpeed} />
          </div>
          <Modal
            open={gameOver}
            title="Game Over"
            onCancel={() => setGameOver(false)}
            onOk={() => window.location.reload()}
          >
            <p>Game Over! Your final score is: {score}</p>
          </Modal>
          <Modal
            open={win}
            title="Congratulations!"
            onCancel={() => setWin(false)}
            onOk={() => window.location.reload()}
          >
            <p>Congratulations! You've won! Your final score is: {score}</p>
          </Modal>
        </>
      )}
    </>
  );
};

export default GamePage;
