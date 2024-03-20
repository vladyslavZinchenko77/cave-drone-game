import { FC } from 'react';

import './Cave.scss';

interface CaveProps {
  caveData: [number, number][];
  height: number;
  width: number;
}

const Cave: FC<CaveProps> = ({ caveData, height, width }) => {
  return (
    <svg
      className="cave"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <path
        d={`M 0 ${height} ${caveData
          .map(([left, right]) => `L ${left} ${right}`)
          .join(' ')} L ${width} ${height} Z`}
        fill="brown"
      />
    </svg>
  );
};

export default Cave;
