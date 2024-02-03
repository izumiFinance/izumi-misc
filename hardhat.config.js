require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-contract-sizer');
require("@cronos-labs/hardhat-cronoscan")

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
          },
          outputSelection: {
            "*": {
              "*": [
                "abi",
                "evm.bytecode",
                "evm.deployedBytecode",
                "evm.methodIdentifiers",
                "metadata"
              ],
            }
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
    aurora: {
      url: 'https://mainnet.aurora.dev',
      accounts: [sk]
    },
    cronos: {
      url: 'https://evm.cronos.org',
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
      url: "https://rinkeby.infura.io/v3/${your api key}",
      gas: 10000000,
      gasPrice: 5500000000,
      accounts: [sk]
    },
    ethereum: {
      url: "https://mainnet.infura.io/v3/${your api key}",
      gas: 800000,
      gasPrice: 33000000000,
      accounts: [sk]
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      gas: 800000,
      gasPrice: 5000000000,
      accounts: [sk]
    },
    bscTest: {
	    url: 'https://data-seed-prebsc-1-s2.binance.org:8545/',
      accounts: [sk],
      // gas: 90000000,
      gasPrice: 20000000000,
    },
    opBNBTest: {
      url: 'https://opbnb-testnet-rpc.bnbchain.org',
      accounts: [sk],
      gasPrice: 5000000000,
    },
    opBNB: {
      url: 'https://opbnb-mainnet-rpc.bnbchain.org',
      accounts: [sk],
    },
    ontologyTest: {
      url: 'https://polaris1.ont.io:10339',
      accounts: [sk],
    },
    ontology: {
      url: 'https://dappnode1.ont.io:10339',
      accounts: [sk],
    },
    goerli: {
      url: 'https://rpc.goerli.eth.gateway.fm',
      accounts: [sk],
      gasPrice: 10000000000,
    },
    auroraTest: {
      url: 'https://testnet.aurora.dev',
      accounts: [sk],
      gasPrice: 5000000000,
    },
    etc: {
      url: 'https://www.ethercluster.com/etc',
      accounts: [sk],
      gasPrice: 1100000000,
    },
    polygon: {
      url: 'https://rpc-mainnet.maticvigil.com',
      accounts: [sk],
    },
    zkSyncAlphaTest: {
      url: 'https://zksync2-testnet.zksync.dev',
      accounts: [sk],
    },
    zkSyncEraMainnet: {
      url: 'https://zksync2-mainnet.zksync.io',
      accounts: [sk],
    },
    mantleTest: {
      url: 'https://rpc.testnet.mantle.xyz',
      accounts: [sk],
    },
    mantle: {
      url: 'https://rpc.mantle.xyz',
      accounts: [sk],
    },
    scrollSepoliaTest: {
      url: 'https://sepolia-rpc.scroll.io',
      accounts: [sk],
    },
    scroll: {
      url: 'https://rpc.scroll.io',
      accounts: [sk],
    },
    icplazaTest: {
      url: 'https://rpctest.ic-plaza.org/',
      accounts: [sk],
    },
    icplaza: {
      url: 'https://rpcmainnet.ic-plaza.org',
      accounts: [sk],
    },
    syscoinTest: {
      url: 'https://rpc.tanenbaum.io/',
      accounts: [sk],
    },
    syscoin: {
      url: 'https://rpc.ankr.com/syscoin',
      accounts: [sk],
    },
    bedrockRolluxTestL2: {
      url: 'https://bedrock.rollux.com:9545/',
      accounts: [sk],
    },
    confluxEspace: {
      url: 'https://evm.confluxrpc.com',
      accounts: [sk],
      chainId: 1030,
    },
    meter: {
      url: 'https://rpc.meter.io',
      accounts: [sk],
    },
    telos: {
      url: 'https://mainnet.telos.net/evm',
      accounts: [sk],
    },
    ultron: {
       url: 'https://ultron-rpc.net',
       accounts: [sk],
    },
    lineaTest: {
       url: 'https://rpc.goerli.linea.build/',
       accounts: [sk],
    },
    linea: {
       url: 'https://linea-mainnet.infura.io/v3/<api key>',
       accounts: [sk],
    },
    opsideTest: {
       url: 'https://pre-alpha-us-http-geth.opside.network',
       accounts: [sk],
    },
    opBNB: {
       url: 'https://opbnb-mainnet-rpc.bnbchain.org',
       accounts: [sk],
       gasPrice: 100,
    },
    opsideTestRollux: {
       url: 'https://pre-alpha-zkrollup-rpc.opside.network/public',
       accounts: [sk],
    },
    base: {
      url: 'https://developer-access-mainnet.base.org',
      accounts: [sk],
    },
    baseTest: {
      url: 'https://goerli.base.org',
      accounts: [sk],
      gasPrice: 110000000
    },
    loot: {
      url: 'https://rpc.lootchain.com/http',
      accounts: [sk],
    },
    mantaTest: {
      url: 'https://manta-testnet.calderachain.xyz/http',
      accounts: [sk],
    },
    manta: {
      url: 'https://pacific-rpc.manta.network/http',
      accounts: [sk],
    },
    stagingFastActiveBellatrix: {
      url: 'https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix',
      accounts: [sk],
    },
    optimism: {
      url: 'https://mainnet.optimism.io',
      accounts: [sk],
    },
    zetaTest: {
      url: 'https://zetachain-athens-evm.blockpi.network/v1/rpc/public',
      accounts: [sk],
    },
    zeta: {
      url: 'https://{zeta rpc url}',
      accounts: [sk],
    },
    kromaSepoliaTest: {
      url: 'https://api.sepolia.kroma.network',
      accounts: [sk],
    },
    kromaMainnet: {
      url: 'https://api.kroma.network/',
      accounts: [sk],
      gasPrice: 60
    },
    gasZeroGoerliL2: {
      url: 'https://goerlitest.gaszero.com/',
      accounts: [sk],
    },
    x1Test: {
      url: 'https://testrpc.x1.tech',
      accounts: [sk],
    },
    zkfairTest: {
      url: 'https://testnet-rpc.zkfair.io/',
      accounts: [sk],
    },
    neon: {
      url: 'https://neon-proxy-mainnet.solana.p2p.org',
      accounts: [sk],
    },
    zkfair: {
      url: 'https://rpc.zkfair.io ',
      accounts: [sk],
    },
    merlinTest: {
      url: 'https://testnet-rpc.merlinchain.io',
      accounts: [sk],
    },
    merlin: {
      url: 'https://rpc.merlinchain.io',
      accounts: [sk],
    },
    blastSepoliaTest: {
      url: 'https://sepolia.blast.io',
      accounts: [sk],
    },
  },
  etherscan: {
    customChains:[
      {
          network: "baseTest",
          chainId: 84531,
          urls: {
	      apiURL: "https://goerli.basescan.org/api",
              browserURL: "https://goerli.basescan.org",
          }
      },
      {
          network: "base",
          chainId: 8453,
          urls: {
              apiURL: "https://api.basescan.org/api",
              browserURL: "https://basescan.org",
          }
      },
    ],
    apiKey: apiKey
  }
};
