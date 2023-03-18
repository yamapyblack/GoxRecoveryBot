import { expect } from "chai";
import { ethers } from "hardhat";

describe("SweeperBot", function () {
  let alice;
  let bob;
  let carol;
  let bot;
  let token;
  before(async () => {
    //import
    [alice, bob, carol] = await ethers.getSigners();
    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    token = await ERC20Mock.deploy("Token", "Token", 18);

    const SweeperBot = await ethers.getContractFactory("SweeperBot");
    bot = await SweeperBot.deploy(alice.address, bob.address, token.address);
  });

  describe("Sweep", function () {
    it("Fail", async function () {
      await expect(bot.sweep()).to.reverted;
    });
    it("Success", async function () {
      await token.mint(alice.address, ethers.utils.parseEther("10"));
      await token
        .connect(alice)
        .approve(bot.address, ethers.utils.parseEther("10"));
      await bot.sweep();

      expect(await token.balanceOf(bob.address)).equals(
        ethers.utils.parseEther("10")
      );
    });
  });

  describe("SetToken", function () {
    it("Fail", async function () {
      await expect(bot.setToken(token.address)).to.reverted;
    });
    it("Success", async function () {
      const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
      const token2 = await ERC20Mock.deploy("Token2", "Token2", 18);
      await bot.connect(bob).setToken(token2.address);

      expect(await bot.token()).equals(token2.address);
    });
  });
});
