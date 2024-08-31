"use client";

import Link from "next/link";
import { NextPage } from "next";
import { useAccount } from "wagmi";

const GamePage: NextPage = () => {
  const { address } = useAccount();

  return (
    <div className="bg-black text-gray-300 min-h-screen p-8">
      {/* Header Section */}
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-gray-200">On-Chain Charades Game</h1>
        <p className="text-xl text-gray-400 mt-4">
          Welcome to the Charades game! Play, compete, and enjoy the fun with fellow DAO members.
        </p>
      </div>

      {/* Leaderboard Section */}
      <div className="container mx-auto mt-12 p-4">
        <h2 className="text-3xl font-semibold text-gray-200">Leaderboards</h2>
        <div className="mt-6 bg-gray-800 rounded-md p-4 space-y-4">
          {/* Placeholder for leaderboard entries */}
          <div className="flex justify-between bg-gray-900 p-3 rounded-md">
            <span className="text-gray-200">Player1</span>
            <span className="text-gray-400">1000 points</span>
          </div>
          <div className="flex justify-between bg-gray-900 p-3 rounded-md">
            <span className="text-gray-200">Player2</span>
            <span className="text-gray-400">950 points</span>
          </div>
          <div className="flex justify-between bg-gray-900 p-3 rounded-md">
            <span className="text-gray-200">Player3</span>
            <span className="text-gray-400">900 points</span>
          </div>
        </div>
      </div>

      {/* Available Games Section */}
      <div className="container mx-auto mt-12 p-4">
        <h2 className="text-3xl font-semibold text-gray-200">Available Games</h2>
        <div className="mt-6 space-y-4">
          {/* Placeholder for available games */}
          <div className="bg-gray-800 p-4 rounded-md">
            <h3 className="text-2xl text-gray-200">Game 1</h3>
            <p className="text-gray-400">Status: Waiting for players</p>
            <div className="mt-4">
              <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">
                Join Game
              </button>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-md">
            <h3 className="text-2xl text-gray-200">Game 2</h3>
            <p className="text-gray-400">Status: In Progress</p>
            <div className="mt-4">
              <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">
                Join Game
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Game Section */}
      <div className="container mx-auto mt-12 p-4 bg-gray-800 rounded-md">
        <h2 className="text-3xl font-semibold text-gray-200">Create a New Game</h2>
        {address ? (
          <form className="mt-6 space-y-4">
            <div>
              <label className="block text-gray-400 text-lg">Game Name</label>
              <input
                type="text"
                placeholder="Enter a name for the game"
                className="w-full p-3 mt-2 bg-gray-900 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-lg">Max Players</label>
              <input
                type="number"
                placeholder="Enter the maximum number of players"
                className="w-full p-3 mt-2 bg-gray-900 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-3 rounded-md hover:bg-gray-600 transition-colors"
            >
              Create Game
            </button>
          </form>
        ) : (
          <p className="text-gray-400 mt-4">Connect your wallet to create a new game.</p>
        )}
      </div>

      {/* Game Rules Section */}
      <div className="container mx-auto mt-12 p-4">
        <h2 className="text-3xl font-semibold text-gray-200">Game Rules</h2>
        <div className="mt-6 bg-gray-800 rounded-md p-4 space-y-4">
          <p className="text-gray-400">
            1. The game is played in teams. Each team takes turns guessing the word or phrase being acted out by one of
            their teammates.
          </p>
          <p className="text-gray-400">
            2. The actor must not speak, point to objects, or make any noises. They can only use gestures and body
            language.
          </p>
          <p className="text-gray-400">
            3. The team has a limited amount of time (e.g., 60 seconds) to guess the word. If they guess correctly, they
            score a point.
          </p>
          <p className="text-gray-400">
            4. The game continues until all words or phrases have been guessed, or a set number of rounds have been
            completed.
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="container mx-auto mt-12 p-4">
        <Link href="/governance" className="text-gray-400 hover:underline">
          Back to Governance
        </Link>
      </div>
    </div>
  );
};

export default GamePage;
