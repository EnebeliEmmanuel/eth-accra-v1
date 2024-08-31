import { createContext, useState } from "react";

type GameContextType = {
  currentActiveGame: string | undefined;
  handleSetCurrentActiveGame: (game: string) => void;
};

export const GameContext = createContext<GameContextType | null>(null);

const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentActiveGame, setCurrentActiveGame] = useState<string | undefined>(undefined);
  const handleSetCurrentActiveGame = (game: string) => {
    setCurrentActiveGame(game);
  };
  return (
    <GameContext.Provider
      value={{
        currentActiveGame,
        handleSetCurrentActiveGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
