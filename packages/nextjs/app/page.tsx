"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const { address } = useAccount();
  return (
    <div className="text-gray-300 container mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12">
      <div className="h-10 md:h-20"></div>

      <p className="font-sans text-4xl font-bold text-gray-200 max-w-5xl lg:text-7xl lg:pr-24 md:text-6xl">
        Shape the Future with DAO Governance
      </p>
      <div className="h-10"></div>
      <p className="max-w-2xl font-serif text-xl text-gray-400 md:text-2xl mb-6">
        Join our Decentralized Autonomous Organization (DAO) and help drive meaningful decisions that impact the entire
        community. Participate in proposals, cast your vote, and be part of a transparent, on-chain governance system.
      </p>
      {address ? (
        <Link className="bg-white px-4 py-1 rounded-2xl text-black" href="/governance">
          Explore Governance
        </Link>
      ) : (
        <p>Connect your wallet to participate in governance</p>
      )}

      <div className="h-32 md:h-40"></div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <p className="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-600">
            Decentralized and Transparent
          </p>
          <h2 className="text-4xl font-bold">Your Voice Matters</h2>
          <div className="h-6"></div>
          <p className="font-serif text-xl text-gray-400 md:pr-10">
            In our DAO, every decision is made collectively by the members. Whether it&quot;s setting new rules or
            deciding on new features, your vote makes a difference.
          </p>
          <div className="h-8"></div>
          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-800">
            <div>
              <p className="font-semibold text-gray-400">Community-Driven Decisions</p>
              <div className="h-4"></div>
              <p className="font-serif text-gray-400">
                Propose changes, discuss ideas, and vote on important issues that shape the future of the DAO.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-400">On-Chain Transparency</p>
              <div className="h-4"></div>
              <p className="font-serif text-gray-400">
                All decisions and votes are recorded on the blockchain, ensuring complete transparency and fairness.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="-mr-24 rounded-lg md:rounded-l-full bg-gradient-to-br from-gray-900 to-black h-96"></div>
        </div>
      </div>

      <div className="h-32 md:h-40"></div>

      <p className="font-serif text-4xl">
        <span className="text-gray-400">Empower Your Voice</span>
        <span className="text-gray-600"> in a Decentralized Community-Driven Organization</span>
      </p>

      <div className="h-32 md:h-40"></div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-br from-gray-900 to-black">
          <p className="flex items-center justify-center text-4xl font-semibold text-green-400 bg-green-800 rounded-full shadow-lg w-14 h-14">
            1
          </p>
          <div className="h-6"></div>
          <p className="font-serif text-3xl">Participate in Governance</p>
        </div>
        <div className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-b from-gray-900 to-black">
          <p className="flex items-center justify-center text-4xl font-semibold text-indigo-400 bg-indigo-800 rounded-full shadow-lg w-14 h-14">
            2
          </p>
          <div className="h-6"></div>
          <p className="font-serif text-3xl">Make Proposals and Vote</p>
        </div>
        <div className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-bl from-gray-900 to-black">
          <p className="flex items-center justify-center text-4xl font-semibold text-teal-400 bg-teal-800 rounded-full shadow-lg w-14 h-14">
            3
          </p>
          <div className="h-6"></div>
          <p className="font-serif text-3xl">Be Part of a Transparent Future</p>
        </div>
      </div>

      <div className="h-40"></div>

      {/* Charades Game Section */}
      <div className="text-gray-300 container mx-auto p-8 md:rounded-lg md:p-10 lg:p-12">
        <h2 className="text-4xl font-bold text-gray-200">Have Fun with On-Chain Charades</h2>
        <p className="max-w-2xl font-serif text-xl text-gray-400 md:text-2xl mb-6">
          While governance is serious business, our DAO also knows how to have fun. Join our on-chain charades game,
          where laughter and fun are guaranteed!
        </p>
        {address ? (
          <Link className="bg-white px-4 py-1 rounded-2xl text-black" href="/gameplay">
            Play Charades
          </Link>
        ) : (
          <p>Connect your wallet to start playing</p>
        )}

        <div className="h-32 md:h-40"></div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-600">
              A Game for Everyone
            </p>
            <h2 className="text-4xl font-bold">Fun and Laughter On-Chain</h2>
            <div className="h-6"></div>
            <p className="font-serif text-xl text-gray-400 md:pr-10">
              Engage in a hilarious game of charades, fully on-chain! It&quot;s not just about winning—it&quot;s about
              having a great time with your fellow DAO members.
            </p>
            <div className="h-8"></div>
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-800">
              <div>
                <p className="font-semibold text-gray-400">Blockchain-Backed Fun</p>
                <div className="h-4"></div>
                <p className="font-serif text-gray-400">
                  Enjoy a game where every move is secure and every laugh is genuine, thanks to the power of blockchain.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-400">Play Anytime, Anywhere</p>
                <div className="h-4"></div>
                <p className="font-serif text-gray-400">
                  Our on-chain charades game is accessible from anywhere—just connect your wallet and start playing.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="-mr-24 rounded-lg md:rounded-l-full bg-gradient-to-br from-gray-900 to-black h-96"></div>
          </div>
        </div>

        <div className="h-32 md:h-40"></div>
      </div>
      {/* FAQ Section */}
      <div className="container mx-auto mt-12 p-4">
        <h2 className="text-3xl font-semibold text-gray-200">Frequently Asked Questions</h2>
        <div className="mt-6 bg-gray-800 rounded-md p-4 space-y-4">
          <div>
            <h3 className="text-xl text-gray-200">How do I join a game?</h3>
            <p className="text-gray-400 mt-2">
              To join a game, simply click on the &quot;Join Game&quot; button next to an available game in the
              &quot;Available Games&quot; section. Make sure your wallet is connected.
            </p>
          </div>
          <div>
            <h3 className="text-xl text-gray-200">How are scores calculated?</h3>
            <p className="text-gray-400 mt-2">
              Scores are calculated based on the number of correct guesses made by your team within the time limit. The
              more correct guesses, the higher your score.
            </p>
          </div>
          <div>
            <h3 className="text-xl text-gray-200">Can I create my own game?</h3>
            <p className="text-gray-400 mt-2">
              Yes! You can create a new game by filling out the form in the &quot;Create a New Game&quot; section.
              You&quot;ll need to provide a game name and set the maximum number of players.
            </p>
          </div>
          <div>
            <h3 className="text-xl text-gray-200">What are the rules of the game?</h3>
            <p className="text-gray-400 mt-2">
              The rules of the game are listed in the &quot;Game Rules&quot; section. Make sure to read them carefully
              before playing to ensure a fair and fun experience for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 mt-12 p-6">
        <div className="container mx-auto">
          <div className="flex justify-between">
            <div className="space-y-4">
              <Link href="/governance" className="text-gray-400 hover:underline block">
                Governance
              </Link>
              <Link href="/game" className="text-gray-400 hover:underline block">
                Game
              </Link>
              <Link href="/faq" className="text-gray-400 hover:underline block">
                FAQ
              </Link>
            </div>
            <div className="text-gray-400">
              <p>&copy; 2024 DAO Charades. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
