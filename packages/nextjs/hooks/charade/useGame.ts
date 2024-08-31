import { useContext } from "react";
import { GameContext } from "~~/context/GameContextProvider";

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === null) {
    throw new Error("useGame must be used within a GameContextProvider");
  }
  return context;
};
