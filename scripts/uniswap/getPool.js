const hardhat = require("hardhat");
const { modules } = require("web3");
const contracts = require("../deployed.js");
const factoryJson = require(contracts.factoryJson);

const poolJson = require(contracts.poolJson);

const v = process.argv
const net = process.env.HARDHAT_NETWORK

const factoryAddress = contracts[net].factory;

//Example: HARDHAT_NETWORK='izumiTest' node getPool.js 'USDT' 'USDC' 500

const para = {
    token0Symbol: v[2],
    token0Address: contracts[net][v[2]],
    token1Symbol: v[3],
    token1Address: contracts[net][v[3]],
    fee: v[4],
}

async function main() {
  console.log("Paramters: ");
  for ( var i in para) { console.log("    " + i + ": " + para[i]); }

  const [deployer] = await hardhat.ethers.getSigners();

  const factoryContract = await hardhat.ethers.getContractFactory(factoryJson.abi, factoryJson.bytecode, deployer);
  const factory = await factoryContract.attach(factoryAddress);
  
  //get the info of pool
  let poolAddr = await factory.getPool(para.token0Address, para.token1Address, para.fee);
  console.log('Pool: ', poolAddr);

  const poolContract = await hardhat.ethers.getContractFactory(poolJson.abi, poolJson.bytecode, deployer);
  const pool = await poolContract.attach(poolAddr);
  let slot0 = await pool.slot0();

  console.log(slot0);
  
  return poolAddr;
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})

module.exports = main;
