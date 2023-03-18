import { ethers } from "hardhat";

async function main() {
  const goxed = "";
  const recovery = "";
  const token = "";

  const SweeperBot = await ethers.getContractFactory("SweeperBot");
  const sweeperBot = await SweeperBot.deploy(goxed, recovery, token);

  await sweeperBot.deployed();
  console.log("deployed to:", sweeperBot.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
