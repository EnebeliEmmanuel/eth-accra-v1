import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import { ethers } from "hardhat";
import { Contract } from "ethers";

const addressZero = "0x0000000000000000000000000000000000000000";

const setupContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre;
  const { log } = deployments;
  const { deployer } = await getNamedAccounts();

  const timeLock = await hre.ethers.getContract<Contract>("GovernorTimelock");

  const governorContract = await ethers.getContract<Contract>("BaseGovernor");
  const governorAdress = await governorContract.getAddress();

  log("----------------------------------------------------");
  log("Setting up contracts for roles...");
  // would be great to use multicall here...
  const proposerRole = await timeLock.PROPOSER_ROLE();
  const executorRole = await timeLock.EXECUTOR_ROLE();
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

  const proposerTx = await timeLock.grantRole(proposerRole, governorAdress);
  await proposerTx.wait(1);
  const executorTx = await timeLock.grantRole(executorRole, addressZero);
  await executorTx.wait(1);
  const revokeTx = await timeLock.revokeRole(adminRole, deployer);
  await revokeTx.wait(1);
  // Guess what? Now, anything the timelock wants to do has to go through the governance process!
};

export default setupContracts;
setupContracts.tags = ["all", "setup"];
