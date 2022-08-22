const hardhat = require("hardhat");
const contracts = require("../deployed.js");

// example
// HARDHAT_NETWORK='izumiTest' node deployAirdrop.js
// 

const net = process.env.HARDHAT_NETWORK

const v = process.argv

const contractName = v[2]

async function main() {
    
    const ACL = await hardhat.ethers.getContractFactory(contractName);
    const coboSafeAddress = contracts[net].coboSafeAddress
    const coboSafeModule = contracts[net].coboSafeModule

    console.log('contractName: ', contractName)

    const args = [
      coboSafeAddress,
      coboSafeModule
    ]
    console.log('args: ', args)
  
    console.log("Deploying .....")
    const acl = await ACL.deploy(...args);
    await acl.deployed();
    console.log("acl address: " , acl.address);
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
