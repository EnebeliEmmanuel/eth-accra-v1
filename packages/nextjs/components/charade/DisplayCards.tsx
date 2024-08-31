import React from "react";
import Timer from "./Timer";
import { useAccount } from "wagmi";
import { useCards } from "~~/hooks/charade/useCards";
import { useTeams } from "~~/hooks/charade/useTeams";
import { decrypt } from "~~/utils/charade/encryption";

const DisplayCards = () => {
  const { address } = useAccount();
  const { admin } = useTeams();
  const { cards, handlePlayerCardClick, handleAdminCardClick } = useCards();

  return (
    <div className=" border rounded-xl border-gray-400 p-3 w-full h-full">
      <Timer />
      {cards && cards.length ? (
        <div className="flex flex-wrap justify-center gap-4">
          {cards.map((card, index) => (
            <div
              role="button"
              key={index}
              className={`card transform transition duration-300  ${cards[index].isFlipped ? "flipped" : ""} ${
                index % 2 === 0 ? " hover:rotate-180" : "hover:translate-x-4"
              }`}
              onClick={() => (admin === address ? handleAdminCardClick(index) : handlePlayerCardClick(index))}
            >
              <div className="card-inner ">
                <div className="card-front flex justify-center bg-white/50 items-center border shadow-sm shadow-white rounded-xl">
                  {index}
                </div>
                <div className="card-back flex justify-center items-center border  shadow-sm shadow-white rounded-xl">
                  {card.word === "" ? decrypt(card.encryptedWord) : card.word}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid place-content-center h-full">
          <p>No cards minted yet</p>
        </div>
      )}
    </div>
  );
};

export default DisplayCards;
