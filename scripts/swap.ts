import { BigNumber } from "ethers";
import { ethers } from "hardhat";

async function main() {
  const router = await ethers.getContractAt(
    "ISwapRouter",
    "0xE592427A0AEce92De3Edee1F18E0157C05861564"
  );
  const token0 = "0x912CE59144191C1204E64559FE8253a0e49E6548"; //arb
  const token1 = "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"; //usdc
  const amountIn = ethers.utils.parseEther("1000");
  const amountOutMinimum = BigNumber.from("1000000000"); //1000

  const inputParams = {
    tokenIn: token0,
    tokenOut: token1,
    fee: 10000,
    recipient: "",
    deadline: 9999999999,
    amountIn: amountIn,
    amountOutMinimum: amountOutMinimum,
    sqrtPriceLimitX96: 0,
  };
  for (let i = 0; i < 100; i++) {
    await new Promise((f) => setTimeout(f, 250));
    try {
      const tx = await router.exactInputSingle(inputParams);
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
