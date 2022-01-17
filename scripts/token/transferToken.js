const {ethers} = require("hardhat");
const hre = require("hardhat");
const contracts = require("../deployed.js");
const managerJson = require(contracts.nftManagerJson);

const v = process.argv
const net = process.env.HARDHAT_NETWORK

const managerAddress = contracts[net].nftManager;

// Example: HARDHAT_NETWORK='izumiTest' node transferToken.js 'YIN' '0xD4D6F030520649c7375c492D37ceb56571f768D0' 67

const para = {
    token0Symbol: v[2],
    token0Address: contracts[net][v[2]],
    toAddress: v[3],
    amount: v[4],
}


//mint uniswap v3 nft
async function main() {

  console.log("Approve token: ")
  for (var i in para) { console.log("    " + i + ": " + para[i]);}

  //attach to manager
  const [deployer] = await ethers.getSigners();
      
  const tokenContract = await hre.ethers.getContractFactory("TestToken");



  const token0Contract = await tokenContract.attach(para.token0Address);
  await token0Contract.transfer(para.toAddress, para.amount);
  

}
main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})
