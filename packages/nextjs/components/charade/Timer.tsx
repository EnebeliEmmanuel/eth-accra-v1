import React from "react";
import CountdownTimer from "./CountdownTimer";
import { useTeams } from "~~/hooks/charade/useTeams";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Timer = () => {
  const { currentTeam, teamInfo, teams } = useTeams();
  const { data: timer } = useScaffoldReadContract({
    contractName: "CharadeGame",
    functionName: "wordCheckTime",
    args: [currentTeam],
  });

  return (
    <>
      {teams.length > 0 && (
        <div className="flex mb-2 gap-2">
          {Number(currentTeam) === teamInfo?.id ? <p>Your team time</p> : <p>{teams[Number(currentTeam)].name}</p>}
          {Number(timer) > 0 ? <CountdownTimer targetTime={timer} /> : <p>00:00</p>}
        </div>
      )}
    </>
  );
};

export default Timer;
