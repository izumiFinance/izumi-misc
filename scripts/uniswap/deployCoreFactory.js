const hardhat = require("hardhat");

//Example:
//HARDHAT_NETWORK='izumiTest' node deployCoreFactory.js 
//

async function main() {


    const factoryJson = require('@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json');

    // We get the contract to deploy
    const Factory = await hardhat.ethers.getContractFactory(factoryJson.abi, factoryJson.bytecode)
    const factory = await Factory.deploy();
  
    await factory.deployed();

    console.log("factory Deployed Address:", factory.address);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
