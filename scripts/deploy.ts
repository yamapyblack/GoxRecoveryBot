import { ethers } from "hardhat";

async function main() {
  const goxed = "";
  const recovery = "";
  const token = "";

  const GoxRecoveryBot = await ethers.getContractFactory("GoxRecoveryBot");
  const sweeperBot = await GoxRecoveryBot.deploy(goxed, recovery, token);

  await sweeperBot.deployed();
  console.log("deployed to:", sweeperBot.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
