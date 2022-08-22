const hardhat = require("hardhat");
const contracts = require("../deployed.js");

// example
// HARDHAT_NETWORK='izumiTest' node deployAirdrop.js
// 

const net = process.env.HARDHAT_NETWORK

async function main() {
    
    const nftACL = await hardhat.ethers.getContractFactory("ArbitrumSwapRouterAccessControl");
    const coboSafeAddress = contracts[net].coboSafeAddress
    const coboSafeModule = contracts[net].coboSafeModule

    const args = [
      coboSafeAddress,
      coboSafeModule
    ]
    console.log('args: ', args);
    console.log("Deploying .....")
    const acl = await nftACL.deploy(...args);
    await acl.deployed();
    console.log("nftACL address: " , acl.address);
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
