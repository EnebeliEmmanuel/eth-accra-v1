// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class GameDeployed extends ethereum.Event {
  get params(): GameDeployed__Params {
    return new GameDeployed__Params(this);
  }
}

export class GameDeployed__Params {
  _event: GameDeployed;

  constructor(event: GameDeployed) {
    this._event = event;
  }

  get gameAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get admin(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get timeLimit(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get scorePoint(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class CharadeGameFactory extends ethereum.SmartContract {
  static bind(address: Address): CharadeGameFactory {
    return new CharadeGameFactory("CharadeGameFactory", address);
  }

  deployedGames(param0: BigInt): Address {
    let result = super.call(
      "deployedGames",
      "deployedGames(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );

    return result[0].toAddress();
  }

  try_deployedGames(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "deployedGames",
      "deployedGames(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getDeployedGames(): Array<Address> {
    let result = super.call(
      "getDeployedGames",
      "getDeployedGames():(address[])",
      [],
    );

    return result[0].toAddressArray();
  }

  try_getDeployedGames(): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall(
      "getDeployedGames",
      "getDeployedGames():(address[])",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }
}

export class CreateGameCall extends ethereum.Call {
  get inputs(): CreateGameCall__Inputs {
    return new CreateGameCall__Inputs(this);
  }

  get outputs(): CreateGameCall__Outputs {
    return new CreateGameCall__Outputs(this);
  }
}

export class CreateGameCall__Inputs {
  _call: CreateGameCall;

  constructor(call: CreateGameCall) {
    this._call = call;
  }

  get _admin(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _timeLimit(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _scorePoint(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class CreateGameCall__Outputs {
  _call: CreateGameCall;

  constructor(call: CreateGameCall) {
    this._call = call;
  }
}
