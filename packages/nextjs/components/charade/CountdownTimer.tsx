import React, { memo, useEffect, useState } from "react";
import { useTeams } from "~~/hooks/charade/useTeams";

type Props = {
  targetTime: bigint | undefined;
};
const CountdownTimer: React.FC<Props> = ({ targetTime }) => {
  const { timeLimit } = useTeams();
  // Ensure targetTime is correctly passed and add 3 minutes (180 seconds)
  const endTime = Number(targetTime) + timeLimit;

  const calculateTimeLeft = () => {
    const difference = endTime - Math.floor(Date.now() / 1000); // Calculate difference in seconds

    if (difference > 0) {
      return {
        minutes: Math.floor(difference / 60),
        seconds: Math.floor(difference % 60),
      };
    } else {
      return { minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [endTime]);

  return (
    <p className="flex gap-1">
      <span>{String(timeLeft.minutes).padStart(2, "0")}</span>:<span>{String(timeLeft.seconds).padStart(2, "0")}</span>
    </p>
  );
};

export default memo(CountdownTimer);
