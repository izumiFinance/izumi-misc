const hardhat = require("hardhat");
const contracts = require("../deployed.js");
const poolJson = require(contracts.poolJson);

const factoryJson = require(contracts.factoryJson);
const {getWeb3} = require('../libraries/getWeb3')

//Example: HARDHAT_NETWORK='izumi_test' node getSlot0FromPool.js 'USDT' 'WETH9' 3000

const v = process.argv
const net = process.env.HARDHAT_NETWORK
const factoryAddress = contracts[net].factory;
const web3 = getWeb3();

const para = {
    token0Symbol: v[2],
    token0Address: contracts[net][v[2]],
    token1Symbol: v[3],
    token1Address: contracts[net][v[3]],
    fee: v[4],
}

async function main() {
  // get pool address
  console.log("Parameters: ")
  for ( var i in para) { console.log("    " + i + ": " + para[i]); }
    
  const [deployer] = await hardhat.ethers.getSigners();
  const factory = new web3.eth.Contract(factoryJson.abi, factoryAddress)
  
  //get the info of pool
  const poolAddress = await factory.methods.getPool(para.token0Address, para.token1Address, para.fee).call();

  const pool = await new web3.eth.Contract(poolJson.abi, poolAddress);

  // check the info of pool
  //const token0Info = await pool.token0();
  //const token1Info = await pool.token1();
  //console.log("pool info", token0Info, token1Info);
  const slot0 = await pool.methods.slot0().call();
  console.log("slot0",slot0);
  return slot0;
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})
