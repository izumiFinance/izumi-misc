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

const addr = '0x60efE66FB8864f2453a4F882b4e3d2CF2930976e';

async function main() {
    
    console.log("Approve token: ")
    for (var i in para) { console.log("    " + i + ": " + para[i]);}
    const TestSet = await hardhat.ethers.getContractFactory("TestSet");

    const testSet = TestSet.attach(addr);
    const arr = []
    for (let i = para.a; i < para.b; i ++ ){
        arr.push(i);
    }
    console.log('arr: ', arr);
    const tx = await testSet.deactive(arr);
    console.log('tx: ', tx);
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  