require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    mainnet: {
      url: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Replace with your Infura or Alchemy endpoint
      accounts: [
        "0x4c0883a6910395b27e573c348de11747f3fba24c51d607381672c6bc1d2d55e8", // DO NOT hardcode private keys like this | should use instead accounts: [process.env.PRIVATE_KEY]
      ],
    },
    goerli: {
      url: "https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      accounts: [
        "0x4c0883a6910395b27e573c348de11747f3fba24c51d607381672c6bc1d2d55e8", // Same as above, avoid exposing private keys
      ],
    },
    polygon: {
      url: "https://polygon-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      accounts: [
        "0x4c0883a6910395b27e573c348de11747f3fba24c51d607381672c6bc1d2d55e8", // Example private key for demonstration
      ],
    },
  },
};
