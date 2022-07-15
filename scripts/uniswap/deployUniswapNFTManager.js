const hardhat = require("hardhat");
const deployed = require('../deployed.js');

const net = process.env.HARDHAT_NETWORK;

//Example:
//HARDHAT_NETWORK='izumiTest' node deployCoreFactory.js 
//

async function main() {


    const managerJson = require('@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json');

    const factory = deployed[net].factory;
    const weth9 = deployed[net].WETH9;

    // We get the contract to deploy
    const Manager = await hardhat.ethers.getContractFactory(managerJson.abi, managerJson.bytecode)
    const manager = await Manager.deploy(factory, weth9, '0x0000000000000000000000000000000000000000');
  
    await manager.deployed();

    console.log("manager Deployed Address:", manager.address);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
