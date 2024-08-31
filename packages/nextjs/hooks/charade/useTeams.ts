import React from "react";
import { TeamContext } from "~~/context/TeamContextProvider";

export const useTeams = () => {
  const teamContext = React.useContext(TeamContext);
  if (!teamContext) {
    throw new Error("useTeam must be used within a TeamContextProvider");
  }
  return teamContext;
};
