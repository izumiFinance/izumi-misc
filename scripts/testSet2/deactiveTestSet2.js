const hardhat = require("hardhat");

// example
// HARDHAT_NETWORK='izumiTest' node deployAirdrop.js
// 

const v = process.argv
const net = process.env.HARDHAT_NETWORK

const para = {
    a: Number(v[2]),
    b: Number(v[3])
}

const addr = '0x95515E7e7E75037376FcC50E255c40894863379e';

async function main() {
    
    console.log("Approve token: ")
    for (var i in para) { console.log("    " + i + ": " + para[i]);}
    const TestSet = await hardhat.ethers.getContractFactory("TestSet2");

    const testSet = TestSet.attach(addr);
    
    const tx = await testSet.deactive(para.a, para.b);
    console.log('tx: ', tx);
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  