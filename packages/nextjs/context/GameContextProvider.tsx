import { createContext, useEffect, useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type GameContextType = {
  currentActiveGame: string | undefined;
  handleSetCurrentActiveGame: (game: string) => void;
  createdGames: string[];
};

export const GameContext = createContext<GameContextType | null>(null);

const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentActiveGame, setCurrentActiveGame] = useState<string | undefined>(undefined);
  const [createdGames, setCreatedGames] = useState<string[]>([]);

  // const { data: queryGames } = useQuery(GET_GAMES);

  const handleSetCurrentActiveGame = (game: string) => {
    setCurrentActiveGame(game);
  };

  const { data: games } = useScaffoldReadContract({
    contractName: "CharadeGameFactory",
    functionName: "getDeployedGames",
  });

  useEffect(() => {
    if (games && games.length) {
      setCreatedGames(games.map(game => game.toString()));
    }
  }, [games]);
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
