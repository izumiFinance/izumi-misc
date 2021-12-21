const hardhat = require("hardhat");
const Web3 = require("web3");
const contracts = require("../deployed.js");

const config = require("../../hardhat.config.js");


const nftManagerJson = require(contracts.nftManagerJson);


const v = process.argv
const net = process.env.HARDHAT_NETWORK
const factoryAddress = contracts[net].factory;
const swapRouterAddress = contracts[net].swapRouter;
const nftManagerAddress = contracts[net].nftManager;


const rpc = config.networks[net].url

var web3 = new Web3(new Web3.providers.HttpProvider(rpc));
async function main() {

  var nftManager = new web3.eth.Contract(nftManagerJson.abi, nftManagerAddress);

  var weth9 = await nftManager.methods.WETH9().call();
  console.log(weth9);
  
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})

module.exports = main;
