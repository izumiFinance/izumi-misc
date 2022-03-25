const hardhat = require("hardhat");
const deployed = require('./deployed.js');
// example
// HARDHAT_NETWORK='izumiTest' node deployAirdrop.js
// 

async function main() {
    
    const TestArbitrumBlockFactory = await hardhat.ethers.getContractFactory("TestArbitrumBlock");
  
    const testArbitrumBlock = TestArbitrumBlockFactory.attach(deployed.arbitrum.TEST_ARBITRUM_BLOCK);
    const [blockNumber, timestamp] = await testArbitrumBlock.getBlock();
    console.log('block number: ', blockNumber.toString());
    console.log('timestamp: ', timestamp.toString());

    const lastSetBlock = await testArbitrumBlock.lastSetBlock();
    console.log('last set block: ', lastSetBlock.toString());

    await testArbitrumBlock.setBlock();

    // const lastSetBlock1 = await testArbitrumBlock.lastSetBlock();
    // console.log('last set block1: ', lastSetBlock1.toString());
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  