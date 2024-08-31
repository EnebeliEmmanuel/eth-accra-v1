"use client";

import Link from "next/link";
import { NextPage } from "next";

const ProposalsPage: NextPage = () => {
  return (
    <div className="bg-black text-gray-300 min-h-screen p-8">
      {/* Header Section */}
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-gray-200">DAO Proposals</h1>
        <p className="text-xl text-gray-400 mt-4">
          Browse all the proposals submitted by DAO members. You can view details, discuss, and vote on active
          proposals.
        </p>
      </div>

      {/* Proposals List Section */}
      <div className="container mx-auto mt-12 p-4">
        <h2 className="text-3xl font-semibold text-gray-200">All Proposals</h2>
        <div className="mt-6 space-y-6">
          {/* Placeholder for proposals */}
          <div className="bg-gray-800 p-6 rounded-md">
            <h3 className="text-2xl font-bold text-gray-200">Proposal Title #1</h3>
            <p className="text-gray-400 mt-2">
              This is a brief description of the proposal. It provides an overview of what the proposal is about.
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-gray-400">
                Status: <span className="text-green-400">Active</span>
              </span>
              <Link
                href={`/proposals/1`}
                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-md">
            <h3 className="text-2xl font-bold text-gray-200">Proposal Title #2</h3>
            <p className="text-gray-400 mt-2">
              This is a brief description of the proposal. It provides an overview of what the proposal is about.
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-gray-400">
                Status: <span className="text-yellow-400">Pending</span>
              </span>
              <Link
                href={`/proposals/2`}
                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-md">
            <h3 className="text-2xl font-bold text-gray-200">Proposal Title #3</h3>
            <p className="text-gray-400 mt-2">
              This is a brief description of the proposal. It provides an overview of what the proposal is about.
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-gray-400">
                Status: <span className="text-red-400">Closed</span>
              </span>
              <Link
                href={`/proposals/3`}
                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Repeat the proposal block as needed */}
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

export default ProposalsPage;
