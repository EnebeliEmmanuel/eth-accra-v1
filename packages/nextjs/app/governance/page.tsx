"use client";

import Link from "next/link";
import { NextPage } from "next";

const Governance: NextPage = () => {
  return (
    <div className=" text-gray-300 min-h-screen p-8">
      {/* Header Section */}
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-gray-200">DAO Governance</h1>
        <p className="text-xl text-gray-400 mt-4">
          Participate in shaping the future of the DAO. Propose new ideas, vote on existing proposals, and make your
          voice heard.
        </p>
      </div>

      {/* Create Proposal Section */}

      {/* Create Proposal Form Section */}
      <div className="container mx-auto mt-12 p-4 bg-gray-800 rounded-md">
        <form className="space-y-6">
          <div>
            <label className="block text-gray-400 text-lg">Proposal Title</label>
            <input
              type="text"
              placeholder="Enter the title of your proposal"
              className="w-full p-3 mt-2 bg-gray-900 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-lg">Proposal Description</label>
            <textarea
              placeholder="Describe your proposal in detail"
              className="w-full p-3 mt-2 bg-gray-900 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
              rows={6}
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-400 text-lg">Voting Duration (in days)</label>
            <input
              type="number"
              placeholder="Enter the number of days the proposal will be open for voting"
              className="w-full p-3 mt-2 bg-gray-900 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-3 rounded-md hover:bg-gray-600 transition-colors"
          >
            Submit Proposal
          </button>
        </form>
      </div>

      {/* Active Proposals Section */}
      <div className="container mx-auto mt-12 p-4">
        <h2 className="text-3xl font-semibold text-gray-200">Active Proposals</h2>
        <div className="mt-6 space-y-6">
          {/* Proposal Card (Placeholder) */}
          <div className="bg-gray-800 p-6 rounded-md">
            <h3 className="text-2xl font-bold text-gray-200">Proposal Title #1</h3>
            <p className="text-gray-400 mt-2">
              This is a brief description of the proposal. It gives an overview of what the proposal aims to achieve.
            </p>
            <div className="mt-4 flex space-x-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">Vote Yes</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500">Vote No</button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500">Abstain</button>
            </div>
          </div>

          {/* Repeat the Proposal Card as needed */}
          <div className="bg-gray-800 p-6 rounded-md">
            <h3 className="text-2xl font-bold text-gray-200">Proposal Title #2</h3>
            <p className="text-gray-400 mt-2">
              This is a brief description of the proposal. It gives an overview of what the proposal aims to achieve.
            </p>
            <div className="mt-4 flex space-x-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">Vote Yes</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500">Vote No</button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500">Abstain</button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Link */}
      <div className="container mx-auto mt-12 p-4">
        <Link href="/" className="text-blue-400 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Governance;
