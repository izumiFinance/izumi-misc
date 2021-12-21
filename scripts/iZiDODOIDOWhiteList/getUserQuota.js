const { BigNumber } = require("bignumber.js");
const hardhat = require("hardhat");

//Example:
//HARDHAT_NETWORK='izumiTest' node setUserQuota.js ${PATH_TO_AIRDROP_ADDR_LIST}
//

var Web3 = require('web3');
const secret = require('../.secret.js')

var pk = secret.pk;

const contracts = require("./deployed.js");

const v = process.argv
const net = process.env.HARDHAT_NETWORK

const para = {
    fpath: v[2],
}
function getAddressList(path) {
    const fs = require('fs');
    let rawdata = fs.readFileSync(path);
    let data = rawdata.toString().split('\n');
    // console.log(data);
    return data;
}

function getContractJson(path) {
    const fs = require('fs');
    let rawdata = fs.readFileSync(path);
    let data = JSON.parse(rawdata);
    return data;
}

async function attachToken(address) {
    var tokenFactory = await hardhat.ethers.getContractFactory("TestToken");
    var token = tokenFactory.attach(address);
    return token;
}
async function attachIZiDODOIDOWhiteList(address) {

    var iZiDODOIDOWhiteList = await hardhat.ethers.getContractFactory("iZiDODOIDOWhiteList");
    return iZiDODOIDOWhiteList.attach(address);
}
async function getDecimal(token) {
    var decimal = await token.decimals();
    return decimal;
}
async function getNumNoDecimal(tokenAddr, num) {
    var token = await attachToken(tokenAddr);
    var decimal = await getDecimal(token);
    var numNoDecimal = BigNumber(num).times(10 ** decimal);
    return numNoDecimal.toFixed(0);
}

//mint uniswap v3 nft
async function main() {
    const addressList = getAddressList(para.fpath);

    var addrListLen = addressList.length;

    var iZiDODOIDOWhiteListAddr = contracts[net].iZiDODOIDOWhiteList;
    var iZiDODOIDOWhiteList = await attachIZiDODOIDOWhiteList(iZiDODOIDOWhiteListAddr);

    for (var i = 0; i < addrListLen; i ++) {

        var address;
        address = addressList[i];
        console.log('address: ', address);

        var quota = await iZiDODOIDOWhiteList.getUserQuota(address);

        // var quota = await iZiDODOIDOWhiteList.userQuota(address);

        console.log('quota: ', quota.toString());
        console.log('----------------------');

    }
}
main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})
