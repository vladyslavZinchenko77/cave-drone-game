import { FC } from 'react';

interface CaveProps {
  caveData: [number, number][];
  height: number;
  width: number;
  wallHeight: number;
}

const Cave: FC<CaveProps> = ({ caveData, height, width, wallHeight }) => {
  const isValidNumber = (value: number): boolean =>
    !isNaN(value) && isFinite(value);

  const transformCoordinates = (value: number) => (value + 250) * (width / 500);

  const pathData = caveData.reduce((path, [left, right], index) => {
    const isFirst = index === 0;
    const isLast = index === caveData.length - 1;
    const safeLeft = isValidNumber(left) ? left : 0;
    const safeRight = isValidNumber(right) ? right : width;
    const nextLeft = isLast ? width : caveData[index + 1][0];
    const nextRight = isLast ? width : caveData[index + 1][1];
    const safeNextLeft = isValidNumber(nextLeft) ? nextLeft : width;
    const safeNextRight = isValidNumber(nextRight) ? nextRight : width;
    const start = isFirst
      ? `M ${transformCoordinates(safeLeft)} ${height}`
      : '';
    const middle = `L ${transformCoordinates(
      safeRight
    )} ${height} L ${transformCoordinates(safeRight)} ${
      height - wallHeight
    } L ${transformCoordinates(safeNextRight)} ${
      height - wallHeight
    } L ${transformCoordinates(safeNextLeft)} ${height - wallHeight}`;
    const end = isLast ? `L ${transformCoordinates(safeLeft)} ${height} Z` : '';
    return path + start + middle + end;
  }, '');

  return (
    <svg
      className="cave"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <path d={pathData} fill="brown" />
    </svg>
  );
};

export default Cave;
