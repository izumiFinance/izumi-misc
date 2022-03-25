const hardhat = require("hardhat");

// example
// HARDHAT_NETWORK='izumiTest' node deployAirdrop.js
// 

async function main() {
    
    const TestArbitrumBlockFactory = await hardhat.ethers.getContractFactory("TestArbitrumBlock");
  
    console.log("Deploying .....")
    const testArbitrumBlock = await TestArbitrumBlockFactory.deploy();
    await testArbitrumBlock.deployed();
    console.log("TestArbitrumBlock Contract Address: " , testArbitrumBlock.address);
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  