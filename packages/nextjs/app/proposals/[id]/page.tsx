"use client";

import Link from "next/link";
import { useAccount } from "wagmi";

const ProposalDetails = ({ params }: { params: { id: string } }) => {
  const { address } = useAccount();
  const { id } = params;

  return (
    <div className=" text-gray-300 min-h-screen flex flex-col items-center justify-center p-8">
      {/* Header Section */}
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-200">Proposal Details</h1>
        <p className="text-xl text-gray-400 mt-4">
          Here you can find all the details about this proposal, including the current voting status and results.
        </p>
      </div>

      {/* Proposal Information Section */}
      <div className="w-full max-w-3xl mt-12 p-8 bg-gray-800 rounded-md text-center">
        <h2 className="text-3xl font-bold text-gray-200">Proposal Title #{id}</h2>
        <p className="text-gray-400 mt-4">
          This section will display a detailed description of the proposal. The description will outline the purpose of
          the proposal, the problem it addresses, and the proposed solution.
        </p>

        <div className="mt-8 text-left">
          <h3 className="text-2xl font-semibold text-gray-200">Proposal Status</h3>
          <p className="text-gray-400 mt-2">
            Current status: <span className="text-green-400">Active</span> {/* Example status */}
          </p>
          <p className="text-gray-400 mt-2">Voting ends in: 3 days {/* Example duration */}</p>
        </div>

        {/* Voting Section */}
        {address ? (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-200">Cast Your Vote</h3>
            <div className="mt-4 flex justify-center space-x-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">Vote Yes</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500">Vote No</button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500">Abstain</button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 mt-8">Connect your wallet to cast your vote.</p>
        )}

        {/* Voting Results Section */}
        <div className="mt-12 text-left">
          <h3 className="text-2xl font-semibold text-gray-200">Voting Results</h3>
          <div className="mt-4">
            <p className="text-gray-400">Yes: 60% {/* Example result */}</p>
            <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: "60%" }}></div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-400">No: 30% {/* Example result */}</p>
            <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: "30%" }}></div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-400">Abstain: 10% {/* Example result */}</p>
            <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
              <div className="bg-gray-600 h-2 rounded-full" style={{ width: "10%" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="w-full max-w-3xl mt-12 p-4 text-center">
        <Link href="/governance" className="text-blue-400 hover:underline">
          Back to Governance
        </Link>
      </div>
    </div>
  );
};

export default ProposalDetails;
