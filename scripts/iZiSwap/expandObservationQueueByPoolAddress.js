
const {ethers} = require("hardhat");

const BigNumber = require('bignumber.js');

const Web3 = require("web3");
const secret = require('../../.secret.js');
const pk = secret.pk;

const config = require("../../hardhat.config.js");
const contracts = require('../deployed.js');

const poolABI = [
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "newNextQueueLen",
          "type": "uint16"
        }
      ],
      "name": "expandObservationQueue",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]

const v = process.argv
const net = process.env.HARDHAT_NETWORK

const rpc = config.networks[net].url
const web3 = new Web3(new Web3.providers.HttpProvider(rpc));

//Example: HARDHAT_NETWORK='bsc' node approveTokenWeb3.js testA 0x3a6d8ca21d1cf76f653a67577fa0d27453350dd8

const para = {
    poolAddress: v[2],
    queueLen: v[3],
}

async function main() {

  console.log("Paramters: ");
  for ( var i in para) { console.log("    " + i + ": " + para[i]); }
  const [deployer] = await ethers.getSigners();

  const pool = new web3.eth.Contract(poolABI, para.poolAddress)
  // do expand operation

  const txData = await pool.methods.expandObservationQueue(para.queueLen).encodeABI()
  const gasLimit = await pool.methods.expandObservationQueue(para.queueLen).estimateGas({from: deployer.address});
  console.log('gas limit: ', gasLimit);
  const signedTx = await web3.eth.accounts.signTransaction(
      {
          to: para.poolAddress,
          data:txData,
          gas: BigNumber(gasLimit * 1.1).toFixed(0, 2),
          gasPrice: 0.05 * (10**9)
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
