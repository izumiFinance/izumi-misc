const hardhat = require("hardhat");

// example
// HARDHAT_NETWORK='izumiTest' node deployAirdrop.js
// 

async function main() {
    
    const factory = await hardhat.ethers.getContractFactory("Multicall");
  
    console.log("Deploying .....")
    const multicall = await factory.deploy();
    await multicall.deployed();
    console.log("multicall Contract Address: " , multicall.address);
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  