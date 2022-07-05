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

//Example: HARDHAT_NETWORK='izumiTest' node increaseCardinality.js iZi WETH9 3000 20

const para = {
    token0Symbol: v[2],
    token0Address: contracts[net][v[2]],
    token1Symbol: v[3],
    token1Address: contracts[net][v[3]],
    fee: v[4],
    cardinality: v[5]
}

async function main() {


  console.log("Paramters: ");
  for ( var i in para) { console.log("    " + i + ": " + para[i]); }
  
  const [deployer] = await hardhat.ethers.getSigners();

  var factory = new web3.eth.Contract(factoryJson.abi, factoryAddress);

  let poolAddr = await factory.methods.getPool(para.token0Address, para.token1Address, para.fee).call();

  console.log('Pool: ', poolAddr);

  var pool = new web3.eth.Contract(poolJson.abi, poolAddr);

  const txData = await pool.methods.increaseObservationCardinalityNext(para.cardinality).encodeABI()
  const gasLimit = await pool.methods.increaseObservationCardinalityNext(para.cardinality).estimateGas();
  console.log('gas limit: ', gasLimit);
  const signedTx = await web3.eth.accounts.signTransaction(
      {
          // nonce: 0,
          to: poolAddr,
          data:txData,
          gas: BigNumber(gasLimit * 1.1).toFixed(0, 2),
          gasPrice: 18000000000,
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
