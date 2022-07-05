const hardhat = require("hardhat");
const { modules } = require("web3");
const contracts = require("../deployed.js");

const BigNumber = require('bignumber.js');

const Web3 = require("web3");
const secret = require('../../.secret.js');
const pk = secret.pk;

const config = require("../../hardhat.config.js");



const factoryJson = require(contracts.factoryJson);


const poolJson = require(contracts.poolJson);

const v = process.argv
const net = process.env.HARDHAT_NETWORK

const rpc = config.networks[net].url
const factoryAddress = contracts[net].factory;
var web3 = new Web3(new Web3.providers.HttpProvider(rpc));

//Example: HARDHAT_NETWORK='polygon' node viewPool.js 0x4d25400cb378362864de4e7fdd73017d03d24a3e

const para = {
    poolAddress: v[2],
}

async function main() {


  console.log("Paramters: ");
  for ( var i in para) { console.log("    " + i + ": " + para[i]); }
  
  const [deployer] = await hardhat.ethers.getSigners();

  var pool = new web3.eth.Contract(poolJson.abi, para.poolAddress);

  var token0 = await pool.methods.token0().call();
  var token1 = await pool.methods.token1().call();
  console.log('token0: ', token0);
  console.log('token1: ', token1);
  
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})

module.exports = main;
