export const GET_GAME_DETAILS = `
{
  game(id: $gameId) {
    id
    admin
    timeLimit
    scorePoint
    isGameStarted
    currentTeam
    currentRound
    teams {
      id
      name
      members
      score
      players {
        id
        address
      }
    }
    cards {
      id
      encryptedWord
      word
      isUsed
      team {
        id
        name
      }
      player
    }
  }
}
`;

export const GET_ALL_GAMES = `
{
  games {
    id
    admin
    timeLimit
    scorePoint
    isGameStarted
    currentTeam
    currentRound
  }
}
`;

export const GET_TEAMS = `
{
  teams(where: { game: $gameId }) {
    id
    name
    members
    score
    players {
      id
      address
    }
  }
}
`;

export const GET_CARDS = `
{
  cards(where: { game: $gameId }) {
    id
    encryptedWord
    word
    isUsed
    team {
      id
      name
    }
    player
  }
}
`;

export const GET_GAME_EVENTS = `
{
  roundStartedEvents: roundStarteds(where: { team: { game: $gameId } }) {
    id
    round
    team {
      id
      name
    }
  }
  wordCheckedEvents: wordCheckeds(where: { team: { game: $gameId } }) {
    id
    team {
      id
      name
    }
    player
    encryptedWord
  }
  scoreUpdatedEvents: scoreUpdateds(where: { team: { game: $gameId } }) {
    id
    team {
      id
      name
    }
    score
    word
  }
  playerJoinedTeamEvents: playerJoinedTeams(where: { team: { game: $gameId } }) {
    id
    team {
      id
      name
    }
    player
  }
  gameStartedEvents: gameStarteds(where: { id: $gameId }) {
    id
  }
  cardAddedEvents: cardAddeds(where: { id: $gameId }) {
    id
  }
}
`;
