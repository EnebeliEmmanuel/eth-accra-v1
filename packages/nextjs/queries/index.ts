import { gql } from "@apollo/client";

// Query to get detailed information about a specific game
export const GET_GAME_DETAILS = gql`
  query GetGameDetails($gameId: ID!) {
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

// Query to get a list of all games
export const GET_ALL_GAMES = gql`
  query GetAllGames {
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

// Query to get all teams associated with a specific game
export const GET_TEAMS = gql`
  query GetTeams($gameId: ID!) {
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

// Query to get all cards associated with a specific game
export const GET_CARDS = gql`
  query GetCards($gameId: ID!) {
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

// Query to get various game-related events
export const GET_GAME_EVENTS = gql`
  query GetGameEvents($gameId: ID!) {
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
