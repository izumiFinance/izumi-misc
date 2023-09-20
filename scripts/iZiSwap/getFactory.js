const {ethers} = require("hardhat");

const BigNumber = require('bignumber.js');

const Web3 = require("web3");
const secret = require('../../.secret.js');
const pk = secret.pk;

const config = require("../../hardhat.config.js");
const contracts = require('../deployed.js');

const abi = [
    {
      "inputs": [],
      "name": "factory",
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
    {
      "inputs": [],
      "name": "WETH9",
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
    addr: v[2]
}

async function main() {

  console.log("Paramters: ");
  for ( var i in para) { console.log("    " + i + ": " + para[i]); }
  
  const per = new web3.eth.Contract(abi, para.addr)
  const factory = await per.methods.factory().call()
  const weth = await per.methods.WETH9().call()
  console.log('factory: ', factory)
  console.log('weth', weth)
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})

module.exports = main;
