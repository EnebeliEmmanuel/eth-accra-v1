export type Team = {
  id: number;
  name: string;
  members: string[];
  score: number;
};

export type Card = {
  id: number;
  encryptedWord: string;
  word: string;
  isUsed: boolean;
  isFlipped: boolean;
  teamId: number;
  player: string;
};
