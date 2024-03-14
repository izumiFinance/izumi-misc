
const {ethers} = require("hardhat");

const BigNumber = require('bignumber.js');

const Web3 = require("web3");
const secret = require('../../.secret.js');
const pk = secret.pk;

const config = require("../../hardhat.config.js");
const contracts = require('../deployed.js');


const factoryABI = [{
    "inputs": [],
    "name": "collectGas",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]

const v = process.argv
const net = process.env.HARDHAT_NETWORK

const rpc = config.networks[net].url
const web3 = new Web3(new Web3.providers.HttpProvider(rpc));


const para = {
    factory: v[2],
}

async function main() {

  console.log("Paramters: ");
  for ( var i in para) { console.log("    " + i + ": " + para[i]); }
  const [deployer] = await ethers.getSigners();

  const iZiSwapFactoryAddress = para.factory
  const factory = new web3.eth.Contract(factoryABI, iZiSwapFactoryAddress)

  const txData = await factory.methods.collectGas().encodeABI()
  const gasLimit = await factory.methods.collectGas().estimateGas({from: deployer.address});
  console.log('gas limit: ', gasLimit);
  const signedTx = await web3.eth.accounts.signTransaction(
      {
          // nonce: 0,
          to: iZiSwapFactoryAddress,
          data:txData,
          gas: BigNumber(gasLimit * 1.1).toFixed(0, 2),
      }, 
      pk
  );
  // nonce += 1;
  const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log('tx: ', tx);
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})

module.exports = main;
