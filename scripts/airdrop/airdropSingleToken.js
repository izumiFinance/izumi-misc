var Web3 = require('web3');
const secret = require('../../.secret.js')
const BigNumber = require('bignumber.js')
var pk = secret.pk;

const hardhat = require("hardhat");

const contracts = require("../deployed.js");
const config = require('../../hardhat.config.js');

const v = process.argv
const net = process.env.HARDHAT_NETWORK

const rpc = config.networks[net].url

var web3 = new Web3(new Web3.providers.HttpProvider(rpc));

// Example: HARDHAT_NETWORK='izumiTest' node airdropSingleToken.js ${PATH_TO_AIRDROP_ADDR_LIST} IZITEST

const para = {
    fpath: v[2],
    tokenSymbol: v[3],
    tokenAddress: contracts[net][v[3]]
}
function getAddressList(path) {
    const fs = require('fs');
    let rawdata = fs.readFileSync(path);
    let data = rawdata.toString().split('\n');
    data = data.map((r)=> {return r.split(' ')});
    // console.log(data);
    return data;
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

async function attachToken(address) {
    var tokenFactory = await hardhat.ethers.getContractFactory("TestToken");
    var token = tokenFactory.attach(address);
    return token;
}

async function getDecimal(token) {
    var decimal = await token.decimals();
    return decimal;
}
async function getNumNoDecimal(tokenAddr, num) {
    var token = await attachToken(tokenAddr);
    var decimal = await getDecimal(token);
    console.log('decimal: ', decimal);
    console.log('num: ', num);
    var numNoDecimal = BigNumber(num).times(10 ** decimal);
    console.log('numNoDecimal: ', numNoDecimal.toFixed(0));
    return numNoDecimal.toFixed(0);
}

function getCalling(airdrop, address, tokenAddress, amountNoDecimal) {
    return airdrop.methods.airdrop(tokenAddress, address, amountNoDecimal).encodeABI();
}
//mint uniswap v3 nft
async function main() {
    const airdropList = getAddressList(para.fpath);

    var originSendAddrNum = 0;

    var airdropABI = getAirdropABI();
    var airdropAddr = contracts[net].AIRDROP;
    var airdrop = new web3.eth.Contract(airdropABI, airdropAddr);

    var addrListLen = airdropList.length;
    var addrDelta = 4;
    var sendNumThisTime = 0;
    // var nonce = 26;
    for (var addrListStart = originSendAddrNum; addrListStart < addrListLen; addrListStart += addrDelta) {

        var t1 = new Date().getTime();
        var addrListEnd = addrListStart + addrDelta;
        if (addrListEnd > addrListLen) {
            addrListEnd = addrListLen;
        }
        // console.log(address);
        var callings = [];
        var airdropSubList = airdropList.slice(addrListStart, addrListEnd);
        // console.log('addr sub list:' , addrSubList);
        for (item of airdropSubList) {
            var address = item[0];
            var amountDecimal = item[1];
            var amountNoDecimal = BigNumber(amountDecimal).times(10**18).toFixed(0);

            var cs = getCalling(airdrop, address, para.tokenAddress, amountNoDecimal);
            callings.push(cs);
        }
        console.log('callings: ', callings);

        const txData = await airdrop.methods.multicall(callings).encodeABI()
        const signedTx = await web3.eth.accounts.signTransaction(
            {
                // nonce: nonce,
                to: airdropAddr,
                data:txData,
                gas: 2000000,
                gasPrice: 33000000000,
            }, 
            pk
        );
        // nonce += 1;
        const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('tx: ', tx);

        console.log('airdrop addresses: ', airdropSubList);
        sendNumThisTime += airdropSubList.length;
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
