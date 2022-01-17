const {ethers} = require("hardhat");
const hre = require("hardhat");
const contracts = require("../deployed.js");
const managerJson = require(contracts.nftManagerJson);

const v = process.argv
const net = process.env.HARDHAT_NETWORK
const managerAddress = contracts[net].nftManager;


// Example: HARDHAT_NETWORK='izumiTest' node approveToken.js 'BIT' '0x7576BCf2700A86e8785Cfb1f9c2FF402941C9789' '0x93b3cda535f3777d915cae705ec72d70b9d7d2ed'

const para = {
    token0Symbol: v[2],
    token0Address: contracts[net][v[2]],
    userAddress: v[3],
    approveAddress: v[4],
}


//mint uniswap v3 nft
async function main() {

  console.log("Approve token: ")
  for (var i in para) { console.log("    " + i + ": " + para[i]);}

  //attach to manager
  const [deployer] = await ethers.getSigners();
      
  const tokenContract = await hre.ethers.getContractFactory("TestToken");



  const token0Contract = await tokenContract.attach(para.token0Address);
  
  console.log("addr: " + para.userAddress);
  console.log("contract: ", para.approveAddress);
  console.log("	" + await token0Contract.allowance(para.userAddress, para.approveAddress));
  

}
main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})
