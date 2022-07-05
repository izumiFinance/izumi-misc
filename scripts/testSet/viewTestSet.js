const hardhat = require("hardhat");

// example
// HARDHAT_NETWORK='izumiTest' node deployAirdrop.js
// 

const v = process.argv
const net = process.env.HARDHAT_NETWORK

const addr = '0x60efE66FB8864f2453a4F882b4e3d2CF2930976e';

async function main() {
    
    const TestSet = await hardhat.ethers.getContractFactory("TestSet");

    const testSet = TestSet.attach(addr);

    const actives = await testSet.actives();
    const deactives = await testSet.deactives();

    console.log('actives: ', actives.map((e)=>e.toString()));
    console.log('deactives: ', deactives.map((e)=>e.toString()));

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  