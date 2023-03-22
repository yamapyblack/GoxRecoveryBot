import { ethers } from "hardhat";

async function main() {
  const goxed = "";
  const recovery = "";

  const GoxRecoveryBot = await ethers.getContractFactory("GoxRecoveryBot");
  const goxRecoveryBot = await GoxRecoveryBot.deploy(goxed, recovery);

  await goxRecoveryBot.deployed();
  console.log("deployed to:", goxRecoveryBot.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
