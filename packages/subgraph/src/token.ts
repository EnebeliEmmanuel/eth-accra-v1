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
  let fromAccount = Account.load(event.params.from.toHexString());
  if (fromAccount == null) {
    fromAccount = new Account(event.params.from.toHexString());
    fromAccount.balance = BigInt.fromI32(0);
  }

  let toAccount = Account.load(event.params.to.toHexString());
  if (toAccount == null) {
    toAccount = new Account(event.params.to.toHexString());
    toAccount.balance = BigInt.fromI32(0);
  }

  let token = Token.load(event.address.toHexString());
  if (token == null) {
    token = new Token(event.address.toHexString());
    token.totalSupply = BigInt.fromI32(0); // Adjust based on actual supply
  }

  fromAccount.balance = fromAccount.balance.minus(event.params.value);
  toAccount.balance = toAccount.balance.plus(event.params.value);

  fromAccount.save();
  toAccount.save();

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
