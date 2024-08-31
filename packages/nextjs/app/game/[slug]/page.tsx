"use client";

import React from "react";
import { parseUnits } from "viem";
import DisplayCards from "~~/components/charade/DisplayCards";
import { Address } from "~~/components/scaffold-eth";
import { useTeams } from "~~/hooks/charade/useTeams";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Gameplay = ({ params }: { params: { slug: string } }) => {
  const { teams, teamInfo } = useTeams();
  const { slug } = params;
  console.log(slug);

  const { writeContractAsync } = useScaffoldWriteContract("CharadeGame");
  //   useScaffoldWatchContractEvent({
  //     contractName: "CharadeGame",
  //     eventName: "PlayerJoinedTeam",
  //     onLogs(logs) {
  //       logs.map(log => {
  //         const { team, player } = log.args;
  //         console.log(team, player);
  //       });
  //     },
  //   });

  return (
    <div className="flex gap-3 max-w-[1200px] mx-auto w-full p-4 text-white">
      <div className=" border rounded-xl border-gray-400 p-3 max-w-xs w-full">
        {teamInfo ? (
          <div>
            <h1>Team Name: {teamInfo.name}</h1>
            <p>Score: {teamInfo.score}</p>
            <div>
              <p>Members:</p>
              <div className="flex flex-wrap gap-3 ">
                {teamInfo.members.map((member, index) => (
                  <Address key={index} address={member as `0x${string}`} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {teams.length && !teamInfo ? (
              <div>
                <h1>Click to Join a team</h1>
                <div className="flex flex-wrap gap-3 ">
                  {teams.map(team => (
                    <button
                      key={team.id}
                      onClick={async () => {
                        await writeContractAsync({
                          functionName: "joinTeam",
                          args: [parseUnits(team.id.toString(), 0)],
                        });
                      }}
                      className="bg-blue-500 px-2 rounded-xl"
                    >
                      {team.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p>No team found</p>
            )}
          </>
        )}
      </div>
      <DisplayCards />
    </div>
  );
};

export default Gameplay;
