import { createContext, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { GET_ALL_GAMES } from "~~/queries";

type GameContextType = {
  currentActiveGame: string | undefined;
  handleSetCurrentActiveGame: (game: string) => void;
  createdGames: Game[];
};

type Game = {
  __typename: string;
  id: string;
  admin: string;
  timeLimit: string;
  scorePoint: string;
  isGameStarted: false;
  currentTeam: number;
  currentRound: number;
  url: string;
};

export const GameContext = createContext<GameContextType | null>(null);

const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentActiveGame, setCurrentActiveGame] = useState<string | undefined>(undefined);
  const ALL_GAMES = gql(GET_ALL_GAMES);
  const { data: gameData } = useQuery(ALL_GAMES);

  const [createdGames, setCreatedGames] = useState<Game[]>([]);

  const handleSetCurrentActiveGame = (game: string) => {
    setCurrentActiveGame(game);
  };

  const { data: games } = useScaffoldReadContract({
    contractName: "CharadeGameFactory",
    functionName: "getDeployedGames",
  });

  useEffect(() => {
    console.log(gameData);
    if (gameData && games && gameData.games) {
      setCreatedGames(
        gameData.games.map((game: Game, index: number) => ({
          ...game,
          url: games[index].toString(),
        })),
      );
    }
  }, [games, gameData]);
  return (
    <GameContext.Provider
      value={{
        currentActiveGame,
        handleSetCurrentActiveGame,
        createdGames,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
