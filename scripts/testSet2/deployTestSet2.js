const hardhat = require("hardhat");

// example
// HARDHAT_NETWORK='izumiTest' node deployAirdrop.js
// 

async function main() {
    
    const TestSet = await hardhat.ethers.getContractFactory("TestSet2");
  
    console.log("Deploying .....")
    const testSet = await TestSet.deploy();
    await testSet.deployed();
    console.log("Airdrop Contract Address: " , testSet.address);
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  