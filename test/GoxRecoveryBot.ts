import { expect } from "chai";
import { ethers } from "hardhat";

describe("GoxRecoveryBot", function () {
  let alice;
  let bob;
  let carol;
  let bot;
  let token;
  let token2;
  let token3;
  beforeEach(async () => {
    //import
    [alice, bob, carol] = await ethers.getSigners();
    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    token = await ERC20Mock.deploy("Token", "Token", 18);
    token2 = await ERC20Mock.deploy("Token2", "Token2", 18);
    token3 = await ERC20Mock.deploy("Token3", "Token3", 18);

    const GoxRecoveryBot = await ethers.getContractFactory("GoxRecoveryBot");
    bot = await GoxRecoveryBot.deploy(alice.address, bob.address);
  });

  describe("Sweep", function () {
    it("Fail", async function () {
      expect(await token.balanceOf(bob.address)).equals(0);
    });
    it("Success", async function () {
      await bot.connect(bob).pushToken(token.address);
      await token.mint(alice.address, ethers.utils.parseEther("10"));
      await token
        .connect(alice)
        .approve(bot.address, ethers.utils.parseEther("10"));
      await bot.sweep();

      expect(await token.balanceOf(bob.address)).equals(
        ethers.utils.parseEther("10")
      );
    });
    it("Success2", async function () {
      await bot.connect(bob).pushToken(token.address);
      await bot.connect(bob).pushToken(token2.address);
      await token2.mint(alice.address, ethers.utils.parseEther("5"));
      await token2
        .connect(alice)
        .approve(bot.address, ethers.utils.parseEther("5"));
      await bot.sweep();

      expect(await token2.balanceOf(bob.address)).equals(
        ethers.utils.parseEther("5")
      );
    });
  });

  describe("Checker", function () {
    it("False", async function () {
      let canExec;
      [canExec] = await bot.checker();
      expect(canExec).equals(false);
    });
    it("Success", async function () {
      await bot.connect(bob).pushToken(token.address);
      await token.mint(alice.address, ethers.utils.parseEther("10"));
      let canExec;
      [canExec] = await bot.checker();
      expect(canExec).equals(true);
    });
  });

  describe("SetToken", function () {
    it("Fail", async function () {
      await expect(bot.pushToken(token.address)).to.reverted;
    });
    it("Success", async function () {
      await bot.connect(bob).pushToken(token.address);
      await bot.connect(bob).pushToken(token2.address);

      expect(await bot.tokens(0)).equals(token.address);
      expect(await bot.tokens(1)).equals(token2.address);
    });

    it("Success pop", async function () {
      await bot.connect(bob).pushToken(token.address);
      await bot.connect(bob).pushToken(token2.address);
      await bot.connect(bob).pushToken(token3.address);
      await bot.connect(bob).popToken(token2.address);

      expect(await bot.tokens(0)).equals(token.address);
      expect(await bot.tokens(1)).equals(token3.address);
    });
  });
});
