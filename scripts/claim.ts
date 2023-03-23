import { ethers } from "hardhat";

async function main() {
  const arbAirdrop = await ethers.getContractAt(
    ["function claim()"],
    "0x67a24ce4321ab3af51c2d0a4801c3e111d88c9d9"
  );
  // return;
  for (let i = 0; i < 100; i++) {
    try {
      const tx = await arbAirdrop.claim();
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
