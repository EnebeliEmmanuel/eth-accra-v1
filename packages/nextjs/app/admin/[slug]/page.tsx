"use client";

import React, { useEffect, useState } from "react";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";
import DisplayCards from "~~/components/charade/DisplayCards";
import { AddressInput, InputBase } from "~~/components/scaffold-eth";
import { useGame } from "~~/hooks/charade/useGame";
import { useTeams } from "~~/hooks/charade/useTeams";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { decrypt, encrypt } from "~~/utils/charade/encryption";
import { notification } from "~~/utils/scaffold-eth";

const addressShorter = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
const Admin = ({ params }: { params: { slug: string } }) => {
  const { address } = useAccount();
  const { teams, admin } = useTeams();
  const { slug } = params;
  const { handleSetCurrentActiveGame } = useGame();
  useEffect(() => {
    handleSetCurrentActiveGame(slug);
  }, [slug]);

  const [newMember, setNewMember] = useState<string>("");
  const [newTeam, setNewTeam] = useState<{
    name: string;
    members: string[];
  }>({ name: "", members: [] });
  const [newWord, setNewWord] = useState<string>("");
  const [cardWords, setCardWords] = useState<string[]>([]);

  const { writeContractAsync } = useScaffoldWriteContract("CharadeGame", slug);

  const { data: currentTeam } = useScaffoldReadContract({
    contractName: "CharadeGame",
    contractAddress: slug,
    functionName: "currentTeam",
  });

  const { data: isGameStarted } = useScaffoldReadContract({
    contractName: "CharadeGame",
    contractAddress: slug,
    functionName: "isGameStarted",
  });

  const handleTeamTurn = async (teamId: number) => {
    await writeContractAsync({
      functionName: "nextTeamTurn",
      args: [parseUnits(teamId.toString(), 0)],
    });
  };
  const handleStartGame = async () => {
    console.log(isGameStarted);
    await writeContractAsync({
      functionName: "stateGame",
    });
  };
  const handleNewNameChange = (value: string) => {
    setNewTeam({ ...newTeam, name: value });
  };
  const handleTeamCreation = async () => {
    if (newTeam.name === "") {
      notification.error("Team name is required");
      return;
    }
    await writeContractAsync({
      functionName: "addTeam",
      args: [newTeam.name, newTeam.members as `0x${string}`[]],
    });
    setNewTeam({ name: "", members: [] });
  };
  const handleCardCreation = async () => {
    if (!cardWords.length) {
      notification.error("Add words to create cards");
      return;
    }
    await writeContractAsync({
      functionName: "addCard",
      args: [cardWords],
    });
    setCardWords([]);
  };
  if (address !== admin) {
    return <p>You are not the admin</p>;
  }
  return (
    <>
      {admin && admin === address && (
        <div className="flex gap-3 max-w-[1200px] flex-col items-center sm:items-start sm:flex-row mx-auto w-full p-4 text-white">
          <div className=" border rounded-xl border-gray-400 p-3 max-w-xs w-full">
            <div className="flex gap-2 justify-between mb-3">
              <h1 className="text-xl font-bold">Teams</h1>
              {!isGameStarted && (
                <button onClick={handleStartGame} className="bg-blue-500 text-sm px-2 rounded-xl text-white mt-2">
                  Start Game
                </button>
              )}
            </div>
            {teams && teams.length ? (
              <ul>
                {teams.map(team => (
                  <li key={team.id} className="flex mb-1 justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <p>
                        {team.name} |{" "}
                        <span className="bg-white text-black rounded-full px-1 ">{team.members.length}</span>
                      </p>
                      {isGameStarted && (
                        <>
                          {Number(currentTeam) === team.id ? (
                            <span className="text-xs">playing...</span>
                          ) : (
                            <button
                              onClick={() => handleTeamTurn(team.id)}
                              className="bg-blue-500 text-sm px-1 rounded-xl text-white"
                            >
                              Play
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    <p>{team.score}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No teams yet</p>
            )}
            <div className="mt-4">
              <p> Create a Team</p>
              <hr />
              <div className="mt-3">
                <label className="text-sm">
                  Team Name
                  <InputBase value={newTeam.name as any} onChange={handleNewNameChange} placeholder="Team Name" />
                </label>
                <div className="mt-2">
                  <label className="text-sm">
                    Members
                    <AddressInput value={newMember} onChange={setNewMember} placeholder="Member" />
                  </label>
                  <div className="text-end">
                    <button
                      onClick={() => {
                        if (newMember === "") return;
                        setNewTeam({ ...newTeam, members: [...newTeam.members, newMember] });
                        setNewMember("");
                      }}
                      className="text-xs"
                    >
                      + Add members
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newTeam.members.map((member, index) => (
                      <div
                        key={index}
                        role="button"
                        onClick={() => {
                          setNewTeam({ ...newTeam, members: newTeam.members.filter((_, i) => i !== index) });
                        }}
                      >
                        {addressShorter(member)}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleTeamCreation}
                    className="bg-blue-500 text-sm px-2 py-1 rounded-xl text-white mt-2"
                  >
                    Create Team
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <p>Create cards</p>
              <hr />
              <div className="mt-4">
                <label className="text-sm">
                  Card words
                  <InputBase value={newWord} onChange={setNewWord} placeholder="Word" />
                </label>
                <div className="text-end">
                  <button
                    onClick={() => {
                      if (newWord === "") return;
                      setCardWords([...cardWords, encrypt(newWord)]);
                      setNewWord("");
                    }}
                    className="text-xs"
                  >
                    + Add word
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cardWords.map((word, index) => (
                    <div
                      key={index}
                      role="button"
                      onClick={() => {
                        setCardWords(cardWords.filter((_, i) => i !== index));
                      }}
                    >
                      {decrypt(word)}
                    </div>
                  ))}
                </div>
                <button onClick={handleCardCreation} className="bg-blue-500 text-sm px-1 rounded-xl text-white mt-2">
                  Create Cards
                </button>
              </div>
            </div>
          </div>
          <DisplayCards />
        </div>
      )}
    </>
  );
};

export default Admin;
