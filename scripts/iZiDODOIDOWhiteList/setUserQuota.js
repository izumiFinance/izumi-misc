const { BigNumber } = require("bignumber.js");
const hardhat = require("hardhat");

//Example:
//HARDHAT_NETWORK='izumiTest' node setUserQuota.js ${PATH_TO_AIRDROP_ADDR_LIST} amount
//

var Web3 = require('web3');
const secret = require('../.secret.js')

var pk = secret.pk;

const contracts = require("./deployed.js");

const v = process.argv
const net = process.env.HARDHAT_NETWORK

var url = hardhat.config.networks[net].url
console.log('url: ', url);
var web3 = new Web3(new Web3.providers.HttpProvider(url));

const para = {
    fpath: v[2],
    amount: v[3],
}
function getAddressList(path) {
    const fs = require('fs');
    let rawdata = fs.readFileSync(path);
    let data = rawdata.toString().split('\n');
    // data = data.map((d)=>d.split(' '));
    // console.log(data);
    return data;
}

function getContractJson(path) {
    const fs = require('fs');
    let rawdata = fs.readFileSync(path);
    let data = JSON.parse(rawdata);
    return data;
}
function getIZiDODOIDOWhiteListABI() {
    var iZiDODOIDOWhiteListJson = getContractJson(__dirname + "/../artifacts/contracts/iZiDODOIDOWhiteList.sol/iZiDODOIDOWhiteList.json");
    return iZiDODOIDOWhiteListJson.abi;
}

async function attachToken(address) {
    var tokenFactory = await hardhat.ethers.getContractFactory("TestToken");
    var token = tokenFactory.attach(address);
    return token;
}
async function getDecimal(token) {
    var decimal = await token.decimals();
    return decimal;
}
// function getNumNoDecimal(tokenAddr, num) {
//     var token = await attachToken(tokenAddr);
//     var decimal = await getDecimal(token);
//     var numNoDecimal = BigNumber(num).times(10 ** 18);
//     return numNoDecimal.toFixed(0);
// }

//mint uniswap v3 nft
async function main() {
    const addressList = getAddressList(para.fpath);

    var originSendAddrNum = 0;
    var sendNumThisTime = 0;
    var addrListLen = addressList.length;

    var iZiDODOIDOWhiteListABI = getIZiDODOIDOWhiteListABI();
    var iZiDODOIDOWhiteListAddr = contracts[net].iZiDODOIDOWhiteList;
    var iZiDODOIDOWhiteList = new web3.eth.Contract(iZiDODOIDOWhiteListABI, iZiDODOIDOWhiteListAddr);

    var addrDelta = 100;

    // var nonce = 12;

    for (var addrListStart = originSendAddrNum; addrListStart < addrListLen; addrListStart += addrDelta) {

        var t1 = new Date().getTime();
        var addrListEnd = addrListStart + addrDelta;
        if (addrListEnd > addrListLen) {
            addrListEnd = addrListLen;
        }

        var subAddressList = addressList.slice(addrListStart, addrListEnd);
        var subAmountList = [];
        for (var i = 0; i < subAddressList.length; i ++) {
            subAmountList.push(BigNumber(para.amount).times(10 ** 6).toFixed(0))
        }

        console.log('subAddressList: ', subAddressList);
        console.log('subAmountList: ', subAmountList);

        const txData = iZiDODOIDOWhiteList.methods.setUserQuota(subAddressList, subAmountList).encodeABI()
        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: iZiDODOIDOWhiteListAddr,
                data:txData,
                gas: 800000,
                gasPrice: 44000000000,
                // nonce: nonce,
            }, 
            pk
        );
        // nonce += 1;
        const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('tx: ', tx.transactionHash);

        console.log('set quota addresses: ', subAddressList);
        sendNumThisTime += subAddressList.length;
        console.log('send num: ', originSendAddrNum + sendNumThisTime);
        var t2 = new Date().getTime();
        var interval = t2 - t1;
        console.log('interval: ', interval);
    }
}
main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})
