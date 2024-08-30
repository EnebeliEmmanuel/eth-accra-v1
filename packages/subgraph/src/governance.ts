import {
  ProposalCreated,
  ProposalExecuted,
  VoteCast,
} from "../generated/BaseGovernor/BaseGovernor";
import { Proposal, Vote } from "../generated/schema";
import {
  CallExecuted,
  Cancelled,
  CallScheduled,
  RoleAdminChanged,
} from "../generated/GovernorTimelock/GovernorTimelock";
import { Timelock, QueuedTransaction } from "../generated/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";

export function handleCallExecuted(event: CallExecuted): void {
  let transaction = QueuedTransaction.load(event.params.id.toHex());
  if (transaction == null) return;

  transaction.executed = true;
  transaction.save();
}

export function handleCancelled(event: Cancelled): void {
  let transaction = QueuedTransaction.load(event.params.id.toHex());
  if (transaction == null) return;

  transaction.canceled = true;
  transaction.save();
}

export function handleCallScheduled(event: CallScheduled): void {
  let transaction = new QueuedTransaction(event.params.id.toHex());

  transaction.timelock = event.address.toHexString();
  transaction.target = event.params.target.toHexString();
  transaction.value = event.params.value;
  transaction.signature = ""; // Populate if the signature is provided
  transaction.calldata = event.params.data;

  transaction.executed = false;
  transaction.canceled = false;

  transaction.save();
}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {
  let timelock = Timelock.load(event.address.toHexString());
  if (timelock == null) {
    timelock = new Timelock(event.address.toHexString());
  }

  // Correct the parameter access according to the ABI
  timelock.admin = event.params.newAdminRole; // Use the correct property name here
  timelock.save();
}

export function handleProposalCreated(event: ProposalCreated): void {
  let proposal = new Proposal(event.params.proposalId.toHex());

  proposal.governor = event.address.toHexString();
  proposal.proposer = event.params.proposer;

  // Explicitly type the `target` as `Address`
  proposal.targets = event.params.targets.map<string>((target: Address) =>
    target.toHexString()
  );

  proposal.values = event.params.values;
  proposal.signatures = event.params.signatures;
  proposal.calldatas = event.params.calldatas;
  proposal.startBlock = event.block.number; // Example: use block number as start block
  proposal.endBlock = event.block.number.plus(BigInt.fromI32(100)); // Example: assume the voting period is 100 blocks
  proposal.description = event.params.description;
  proposal.state = "Pending"; // Set initial state

  proposal.save();
}

export function handleProposalExecuted(event: ProposalExecuted): void {
  let proposal = Proposal.load(event.params.proposalId.toHex());
  if (proposal == null) return;

  proposal.state = "Executed";
  proposal.save();
}

export function handleVoteCast(event: VoteCast): void {
  let voteId = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let vote = new Vote(voteId);

  vote.proposal = event.params.proposalId.toHex();
  vote.voter = event.params.voter;
  vote.support = event.params.support == 1; // Assuming 1 is true and 0 is false
  vote.voter = event.params.voter;
  vote.reason = event.params.reason;

  vote.save();
}
