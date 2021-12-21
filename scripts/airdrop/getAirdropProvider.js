
var Web3 = require('web3');
var hardhat = require('hardhat');
const secret = require('../../.secret.js')
const BigNumber = require('bignumber.js')
var pk = secret.pk;

const contracts = require("../deployed.js");
console.log('aaaaa');
const config = require('../../hardhat.config.js');

const v = process.argv
const net = process.env.HARDHAT_NETWORK
console.log('net: ', net);
const rpc = config.networks[net].url
console.log('rpc: ', rpc);
var web3 = new Web3(new Web3.providers.HttpProvider(rpc));

// Example: HARDHAT_NETWORK='izumiTest' node setAirdropProvider.js 'IZITEST'

const para = {
    token0Symbol: v[2],
    token0Address: contracts[net][v[2]]
}

function getContractJson(path) {
  const fs = require('fs');
  let rawdata = fs.readFileSync(path);
  let data = JSON.parse(rawdata);
  return data;
}
function getAirdropABI() {
  var airdropJson = getContractJson(__dirname + "/../../artifacts/contracts/airdrop/Airdrop.sol/Airdrop.json");
  return airdropJson.abi;
}

function getTestTokenABI() {
  var testTokenJson = getContractJson(__dirname + "/../../artifacts/contracts/test/TestToken.sol/TestToken.json");
  return testTokenJson.abi;
}

//mint uniswap v3 nft
async function main() {

  console.log("Approve token: ")
  for (var i in para) { console.log("    " + i + ": " + para[i]);}

  var airdropABI = getAirdropABI();
  var airdropAddr = contracts[net].AIRDROP;
  var airdrop = new web3.eth.Contract(airdropABI, airdropAddr);

  var provider = await airdrop.methods.tokenProviders(para.token0Address).call();
  console.log('provider: ', provider);

  var tokenABI = getTestTokenABI();
  var tokenAddr = para.token0Address;
  var token = new web3.eth.Contract(tokenABI, tokenAddr);
  var allowance = await token.methods.allowance(provider, airdropAddr).call();
  console.log('allowance: ', allowance);

}
main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})
