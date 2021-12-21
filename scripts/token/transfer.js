
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

// Example: HARDHAT_NETWORK='ethereum' node transfer.js '0x7576BCf2700A86e8785Cfb1f9c2FF402941C9789'

const para = {
    to: v[2],
}

//mint uniswap v3 nft
async function main() {

  console.log("Approve token: ")
  for (var i in para) { console.log("    " + i + ": " + para[i]);}

  var signedTxData = web3.eth.accounts.signTransaction(
    {
        nonce: 20,
        to: para.to,
        value: '10000000000000000',
        gas: 80000,
        gasPrice: 77000000000,
    }, 
    pk
  );
  try {
  const tx = await web3.eth.sendSignedTransaction(signedTxData.rawTransaction);
  } catch (e) {
      console.log('error: ');
      console.log(e);
  }
  console.log('tx: ', tx);

}
main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})
