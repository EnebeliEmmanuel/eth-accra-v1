import React from "react";
import { useAccount } from "wagmi";
import { useGame } from "~~/hooks/charade/useGame";
import { useScaffoldReadContract, useScaffoldWatchContractEvent } from "~~/hooks/scaffold-eth";
import { Team } from "~~/types/charade";
import { notification } from "~~/utils/scaffold-eth";

type Props = {
  children: React.ReactNode;
};
interface TeamContextValue {
  teams: Team[];
  teamInfo: Team | undefined;
  admin: string | undefined;
  currentTeam: bigint | undefined;
  timeLimit: number;
}
export const TeamContext = React.createContext<TeamContextValue | null>(null);

const TeamContextProvider: React.FC<Props> = ({ children }) => {
  const { address } = useAccount();
  const { currentActiveGame } = useGame();
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [teamInfo, setTeamInfo] = React.useState<Team>();

  useScaffoldWatchContractEvent({
    contractName: "CharadeGame",
    contractAddress: currentActiveGame,
    eventName: "RoundStarted",
    onLogs(logs) {
      logs.map(log => {
        console.log(log);
        //   const { round, team: emitedTeamId } = log.args;
        //   console.log(round, teamInfo, Number(emitedTeamId));
        //   if (teamInfo && teamInfo.id === Number(emitedTeamId)) {
        //     notification.info("its your team turn ");
        //   } else {
        //     notification.info("Round started for team " + teams[Number(emitedTeamId)].name);
        //   }
      });
    },
  });

  useScaffoldWatchContractEvent({
    contractName: "CharadeGame",
    contractAddress: currentActiveGame,
    eventName: "PlayerJoinedTeam",
    onLogs(logs) {
      logs.map(log => {
        // const { team, player } = log.args;
        console.log(log);
      });
    },
  });
  useScaffoldWatchContractEvent({
    contractName: "CharadeGame",
    contractAddress: currentActiveGame,
    eventName: "ScoreUpdated",
    onLogs(logs) {
      logs.map(log => {
        // const { team, score, word } = log.args;
        console.log(log);
      });
    },
  });

  useScaffoldWatchContractEvent({
    contractName: "CharadeGame",
    contractAddress: currentActiveGame,
    eventName: "GameStarted",
    onLogs(logs) {
      logs.map(log => {
        notification.info("Game Started");
        console.log("GameStarted", log);
      });
    },
  });

  const { data: totalTeams } = useScaffoldReadContract({
    contractName: "CharadeGame",
    contractAddress: currentActiveGame,
    functionName: "totalTeams",
  });
  const { data: admin } = useScaffoldReadContract({
    contractName: "CharadeGame",
    contractAddress: currentActiveGame,
    functionName: "admin",
  });
  const { data: timeLimit } = useScaffoldReadContract({
    contractName: "CharadeGame",
    contractAddress: currentActiveGame,
    functionName: "TIME_LIMIT",
  });

  const { data: currentTeam } = useScaffoldReadContract({
    contractName: "CharadeGame",
    contractAddress: currentActiveGame,
    functionName: "currentTeam",
  });
  const { data: allTeamData } = useScaffoldReadContract({
    contractName: "CharadeGame",
    contractAddress: currentActiveGame,
    functionName: "getAllTeams",
    query: {
      refetchOnWindowFocus: "always",
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
    },
  });

  React.useEffect(() => {
    //fetching team info

    if (totalTeams && allTeamData?.length && address) {
      for (let index = 0; index < Number(totalTeams); index++) {
        const team = allTeamData[index];
        setTeams(prevState => {
          //update the team if it allready exists
          return prevState.find(t => t.id === index)
            ? prevState.map(t => {
                if (t.id === index) {
                  return { name: team.name, id: index, score: Number(team.score), members: team.members as string[] };
                }
                return t;
              })
            : [
                ...prevState,
                { name: team.name, id: index, score: Number(team.score), members: team.members as string[] },
              ];
        });
        if (team?.members.length && team.members.includes(address)) {
          setTeamInfo({
            id: index,
            name: team.name,
            members: team.members as string[],
            score: Number(team.score),
          });
        }
      }
    }
  }, [totalTeams, address, allTeamData]);

  return (
    <TeamContext.Provider
      value={{
        teams,
        teamInfo,
        admin,
        currentTeam,
        timeLimit: Number(timeLimit),
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export default TeamContextProvider;
