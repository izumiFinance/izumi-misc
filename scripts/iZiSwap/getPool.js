const {ethers} = require("hardhat");

const BigNumber = require('bignumber.js');

const Web3 = require("web3");
const secret = require('../../.secret.js');
const pk = secret.pk;

const config = require("../../hardhat.config.js");
const contracts = require('../deployed.js');

const factoryABI = [
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint24",
            "name": "",
            "type": "uint24"
          }
        ],
        "name": "pool",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
    },
]

const v = process.argv
const net = process.env.HARDHAT_NETWORK

const rpc = config.networks[net].url
const web3 = new Web3(new Web3.providers.HttpProvider(rpc));

//Example: HARDHAT_NETWORK='bsc' node approveTokenWeb3.js testA 0x3a6d8ca21d1cf76f653a67577fa0d27453350dd8

const para = {
    token0Symbol: v[2],
    token0Address: contracts[net][v[2]],
    token1Symbol: v[3],
    token1Address: contracts[net][v[3]],
    fee: v[4]
}

async function main() {

  console.log("Paramters: ");
  for ( var i in para) { console.log("    " + i + ": " + para[i]); }
  
  const iZiSwapFactoryAddress = contracts[net]['iZiSwapFactory']
  const factory = new web3.eth.Contract(factoryABI, iZiSwapFactoryAddress)
  const pool = await factory.methods.pool(para.token0Address, para.token1Address, para.fee).call()
  console.log('pool: ', pool)
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})

module.exports = main;
