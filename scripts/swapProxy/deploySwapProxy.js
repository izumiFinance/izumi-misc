const hardhat = require("hardhat");
const contracts = require('../deployed.js')

const net = process.env.HARDHAT_NETWORK
// example
// HARDHAT_NETWORK='izumiTest' node deployAirdrop.js
// 

async function main() {
    
    const factory = await hardhat.ethers.getContractFactory("SwapProxy");

    const pancakeSwapRouter = contracts[net].pancakeSwapRouter ?? "0x0000000000000000000000000000000000000000"
    const uniswapRouter = contracts[net].uniswapRouter ?? "0x0000000000000000000000000000000000000000"
    console.log("Deploying .....")
    console.log('pancake: ', pancakeSwapRouter);
    console.log('uniswap: ', uniswapRouter);
    const swapProxy = await factory.deploy(pancakeSwapRouter, uniswapRouter);
    await swapProxy.deployed();
    console.log("swapProxy Contract Address: " , swapProxy.address);
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
