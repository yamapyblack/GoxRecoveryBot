import { BigNumber } from "ethers";
import { ethers } from "hardhat";

async function main() {
  const token = "0x912CE59144191C1204E64559FE8253a0e49E6548"; //arb
  const to = "";

  const arb = await ethers.getContractAt(
    ["function transfer(address to, uint256 amount) returns (bool)"],
    token
  );
  // return;
  for (let i = 0; i < 50; i++) {
    try {
      const tx = await arb.transfer(to, ethers.utils.parseEther("8750"));
      console.log(tx);
    } catch (e) {
      console.log(e);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
