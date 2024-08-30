import { Transfer } from "../generated/BaseToken/BaseToken";
import {
  Token,
  Account,
  Transfer as TransferEntity,
} from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";
import { Approval } from "../generated/BaseToken/BaseToken";
import { Approval as ApprovalEntity } from "../generated/schema";

export function handleTransfer(event: Transfer): void {
  // Load the token entity
  let token = Token.load(event.address.toHexString());
  if (token == null) {
    token = new Token(event.address.toHexString());
    token.totalSupply = BigInt.fromI32(0); // Adjust based on actual supply
    token.save();
  }

  // Load or create the fromAccount entity
  let fromAccount = Account.load(event.params.from.toHexString());
  if (fromAccount == null) {
    fromAccount = new Account(event.params.from.toHexString());
    fromAccount.balance = BigInt.fromI32(0);
    fromAccount.token = token.id; // Set the token relationship
  }

  // Load or create the toAccount entity
  let toAccount = Account.load(event.params.to.toHexString());
  if (toAccount == null) {
    toAccount = new Account(event.params.to.toHexString());
    toAccount.balance = BigInt.fromI32(0);
    toAccount.token = token.id; // Set the token relationship
  }

  // Update balances
  fromAccount.balance = fromAccount.balance.minus(event.params.value);
  toAccount.balance = toAccount.balance.plus(event.params.value);

  // Save the account entities
  fromAccount.save();
  toAccount.save();

  // Create and save the transfer entity
  let transfer = new TransferEntity(event.transaction.hash.toHex());
  transfer.from = fromAccount.id;
  transfer.to = toAccount.id;
  transfer.value = event.params.value;
  transfer.blockNumber = event.block.number;
  transfer.timestamp = event.block.timestamp;
  transfer.save();
}

export function handleApproval(event: Approval): void {
  let approval = new ApprovalEntity(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  approval.owner = event.params.owner;
  approval.spender = event.params.spender;
  approval.value = event.params.value;
  approval.blockNumber = event.block.number;
  approval.timestamp = event.block.timestamp;

  approval.save();
}
