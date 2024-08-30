import { GameDeployed } from "../generated/CharadeGameFactory/CharadeGameFactory";
import { CharadeGameTemplate } from "../generated/templates";
import { Game, Team, Card, Player } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";
import {
  RoundStarted,
  WordChecked,
  ScoreUpdated,
  PlayerJoinedTeam,
  GameStarted,
  CardAdded,
} from "../generated/templates/CharadeGameTemplate/CharadeGame";

export function handleGameDeployed(event: GameDeployed): void {
  // Create a new Game entity with the ID being the game address
  let game = new Game(event.params.gameAddress.toHexString());

  // Set the fields of the Game entity
  game.admin = event.params.admin;
  game.timeLimit = event.params.timeLimit;
  game.scorePoint = event.params.scorePoint;
  game.isGameStarted = false;
  game.currentTeam = 0;
  game.currentRound = 0;

  // Save the Game entity
  game.save();

  // Start indexing the new CharadeGame contract
  CharadeGameTemplate.create(event.params.gameAddress);
}

export function handleRoundStarted(event: RoundStarted): void {
  let game = Game.load(event.address.toHexString());
  if (game == null) return;

  // Update the current round and team in the Game entity
  game.currentRound = event.params.round.toI32();
  game.currentTeam = event.params.team.toI32();
  game.save();
}

export function handleWordChecked(event: WordChecked): void {
  let game = Game.load(event.address.toHexString());
  if (game == null) return;

  let cardId = event.params.encryptedWord + "-" + event.address.toHexString();
  let card = Card.load(cardId);

  if (card == null) {
    card = new Card(cardId);
    card.game = game.id;
    card.encryptedWord = event.params.encryptedWord;
    card.isUsed = false;
  }

  card.player = event.params.player;
  card.save();
}

export function handleScoreUpdated(event: ScoreUpdated): void {
  let game = Game.load(event.address.toHexString());
  if (game == null) return;

  let team = Team.load(
    event.params.team.toString() + "-" + event.address.toHexString()
  );
  if (team == null) return;

  // Update the team's score
  team.score = event.params.score;
  team.save();
}

export function handlePlayerJoinedTeam(event: PlayerJoinedTeam): void {
  let teamId = event.params.team.toString() + "-" + event.address.toHexString();
  let team = Team.load(teamId);

  if (team == null) {
    team = new Team(teamId);
    team.game = event.address.toHexString();
    team.score = BigInt.fromI32(0);
  }

  let playerId = event.params.player.toHexString();
  let player = Player.load(playerId);

  if (player == null) {
    player = new Player(playerId);
    player.team = team.id;
    player.address = event.params.player;
    player.save();
  }

  // Add the player to the team
  let members = team.members;
  members.push(event.params.player);
  team.members = members;
  team.save();
}

export function handleGameStarted(event: GameStarted): void {
  let game = Game.load(event.address.toHexString());
  if (game == null) return;

  // Update the isGameStarted field
  game.isGameStarted = true;
  game.save();
}

export function handleCardAdded(event: CardAdded): void {
  let game = Game.load(event.address.toHexString());
  if (game == null) return;

  // Create a unique ID for the Card entity using a combination of the game address and an index or unique identifier
  let cardId = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new Card entity
  let card = new Card(cardId);

  // Set the fields of the Card entity
  card.game = game.id;
  card.encryptedWord = ""; // Since the event doesn't include the word directly, initialize it empty or update as necessary
  card.word = ""; // Initialize with an empty string, to be updated when the word is revealed
  card.isUsed = false; // Initialize as not used
  card.team = game.currentTeam.toString() + "-" + event.address.toHexString(); // Associate with the current team
  card.player = event.transaction.from; // Set the player to the one who added the card

  // Save the Card entity
  card.save();
}
