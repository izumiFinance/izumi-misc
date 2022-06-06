require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-contract-sizer');

const secret = require('./.secret.js');

const sk = secret.pk;
const sk2 = secret.pk2;
const sk3 = secret.pk3;
const apiKey = secret.apiKey;
const izumiRpcUrl = "http://47.241.103.6:9545";
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {

    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000
          }
        }
      },
    ]
  },

  networks: {
    izumiTest: {
      url: izumiRpcUrl,
      gas: 8000000,
      gasPrice: 20000000000,
      accounts: [sk, sk2, sk3]
    },
    arbitrum: {
      url: 'https://arb1.arbitrum.io/rpc',
      accounts: [sk]
    },
    polygon: {
      url: 'https://rpc-mainnet.maticvigil.com',
      accounts: [sk]
    },
    mumbai: {
      url: 'https://matic-testnet-archive-rpc.bwarelabs.com',
      accounts: [sk]
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      gas: 10000000,
      gasPrice: 2500000000,
      accounts: [sk]
    },
    ethereum: {
      url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      gas: 800000,
      gasPrice: 45000000000,
      accounts: [sk]
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      gas: 800000,
      gasPrice: 5000000000,
      accounts: [sk]
    },
    bscTest: {
      url: 'https://data-seed-prebsc-2-s2.binance.org:8545/',
      accounts: [sk],
      // gas: 90000000,
      gasPrice: 10000000000,
    },
  },
  etherscan: {
    apiKey: apiKey
  }
};
