const { default: BigNumber } = require("bignumber.js");
const hardhat = require("hardhat");

//Example:
//HARDHAT_NETWORK='izumiTest' node deployToken.js "Dai Stable Coin" "DAI" 18
//

const v = process.argv
const para = {
    tokenName: v[2],
    tokenSymbol: v[3],
    decimal: v[4],
    amount: Number(v[5])
}

async function main() {

  console.log("Deploy ERC20 Token Contract: %s(%s)", para.tokenName, para.tokenSymbol);
  console.log("Paramters: ");
  for ( var i in para) { console.log("    " + i + ": " + para[i]); }
  const amount = new BigNumber(para.amount).times(10 ** Number(para.decimal)).toFixed(0)

  // We get the contract to deploy
  const tokenFactory = await hardhat.ethers.getContractFactory("TokenWithManagement")
  const args = [para.tokenName, para.tokenSymbol, para.decimal, amount]
  console.log('args: ', args)
  const token = await tokenFactory.deploy(para.tokenName, para.tokenSymbol, para.decimal, amount);
  
  await token.deployed();

  console.log("Token Deployed Address:", token.address);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
