import React from "react";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";
import { useGame } from "~~/hooks/charade/useGame";
import { useTeams } from "~~/hooks/charade/useTeams";
import {
  useScaffoldReadContract,
  useScaffoldWatchContractEvent,
  useScaffoldWriteContract,
} from "~~/hooks/scaffold-eth";
import { Card } from "~~/types/charade";
import { decrypt } from "~~/utils/charade/encryption";

interface CardContextValue {
  cards: Card[];
  handlePlayerCardClick: (index: number) => Promise<void>;
  handleAdminCardClick: (index: number) => Promise<void>;
}

export const CardContext = React.createContext<CardContextValue | null>(null);

const CardContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentActiveGame } = useGame();
  const { writeContractAsync } = useScaffoldWriteContract("CharadeGame", currentActiveGame);
  const [cards, setCards] = React.useState<Card[]>([]);
  const { admin } = useTeams();
  const { address } = useAccount();
  useScaffoldWatchContractEvent({
    contractName: "CharadeGame",
    contractAddress: currentActiveGame,
    eventName: "WordChecked",
    onLogs(logs) {
      logs.map(log => {
        console.log(log);
      });
    },
  });
  useScaffoldWatchContractEvent({
    contractName: "CharadeGame",
    contractAddress: currentActiveGame,
    eventName: "CardAdded",
    onLogs(logs) {
      logs.map(log => {
        console.log(log.args);
      });
    },
  });

  const { data: cardsData } = useScaffoldReadContract({
    contractName: "CharadeGame",
    contractAddress: currentActiveGame,
    functionName: "getAllCards",
    query: {
      refetchOnWindowFocus: "always",
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
    },
  });

  React.useEffect(() => {
    if (cardsData) {
      for (let index = 0; index < cardsData.length; index++) {
        const card = cardsData[index];
        setCards(prevState => {
          const existingCardIndex = prevState.findIndex(c => c.id === index);

          const newCard = {
            id: index,
            encryptedWord: card.encryptedWord,
            word: card.word,
            isUsed: card.isUsed,
            isFlipped: card.player === address || card.word !== "" || (admin === address && card.isUsed),
            teamId: Number(card.teamId),
            player: card.player,
          };

          if (existingCardIndex !== -1) {
            // Update the existing card
            return prevState.map((c, i) => (i === existingCardIndex ? newCard : c));
          }

          // Add the new card
          return [...prevState, newCard];
        });
      }
    }
  }, [cardsData, address, admin]);

  const handlePlayerCardClick = async (index: number) => {
    await writeContractAsync(
      {
        functionName: "checkWord",
        args: [parseUnits(index.toString(), 0)],
      },
      {
        onSuccess() {
          const newCards = [...cards];
          newCards[index].word = decrypt(newCards[index].encryptedWord);
          newCards[index].isFlipped = !newCards[index].isFlipped;
          setCards(newCards);
        },
      },
    );
  };

  const handleAdminCardClick = async (index: number) => {
    await writeContractAsync({
      functionName: "updateScore",
      args: [
        parseUnits(cards[index].teamId.toString(), 0),
        parseUnits(index.toString(), 0),
        decrypt(cards[index].encryptedWord),
      ],
    });
  };
  return (
    <CardContext.Provider
      value={{
        cards,
        handlePlayerCardClick,
        handleAdminCardClick,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
export default CardContextProvider;
