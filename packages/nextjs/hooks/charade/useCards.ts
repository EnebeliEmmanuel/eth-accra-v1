import React from "react";
import { CardContext } from "~~/context/CardContextProvider";

export const useCards = () => {
  const cardContext = React.useContext(CardContext);
  if (!cardContext) {
    throw new Error("useCards must be used within a CardContextProvider");
  }
  return cardContext;
};
