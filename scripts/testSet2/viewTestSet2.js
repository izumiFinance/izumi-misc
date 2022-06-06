const hardhat = require("hardhat");

// example
// HARDHAT_NETWORK='izumiTest' node deployAirdrop.js
// 

const v = process.argv
const net = process.env.HARDHAT_NETWORK

const addr = '0x95515E7e7E75037376FcC50E255c40894863379e';

async function main() {
    
    const TestSet = await hardhat.ethers.getContractFactory("TestSet2");

    const testSet = TestSet.attach(addr);

    const actives = await testSet.actives(100);
    const deactives = await testSet.deactives(100);

    console.log('actives: ', actives.map((e)=>e.toString()));
    console.log('deactives: ', deactives.map((e)=>e.toString()));

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  