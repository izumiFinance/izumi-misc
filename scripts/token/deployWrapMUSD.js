const hardhat = require("hardhat");

//Example:
//HARDHAT_NETWORK='izumiTest' node deployToken.js "Dai Stable Coin" "DAI" 18
//

const v = process.argv
const para = {
    tokenName: v[2],
    tokenSymbol: v[3],
    mUSD: v[4],
    chargeReceiver: v[5],
}

async function main() {

  console.log("Paramters: ");
  for ( var i in para) { console.log("    " + i + ": " + para[i]); }

  // We get the contract to deploy
  const WrapMUSDFactory = await hardhat.ethers.getContractFactory("WrapMUSD")
  const WrapMUSD = await WrapMUSDFactory.deploy(
      para.tokenName,
      para.tokenSymbol,
      para.mUSD,
      para.chargeReceiver
  );
  
  await WrapMUSD.deployed();

  console.log("WrapMUSD Deployed Address:", WrapMUSD.address);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
