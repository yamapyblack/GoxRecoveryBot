import { HardhatUserConfig } from "hardhat/config";
import { HttpNetworkAccountsConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";

const accounts = (): HttpNetworkAccountsConfig => {
  if (!process.env.PRIV_KEY) {
    return "remote";
  }
  return [process.env.PRIV_KEY!];
};

const config: HardhatUserConfig = {
  networks: {
    hardhat: {},
    arb: {
      url: `${process.env.ARB_URL!}`,
      accounts: accounts(),
    },
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;
