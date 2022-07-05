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

// Example: HARDHAT_NETWORK='izumiTest' node airdropSingleToken.js ${PATH_TO_AIRDROP_ADDR_LIST} IZITEST 18 10

const para = {
    fpath: v[2],
    tokenSymbol: v[3],
    tokenAddress: contracts[net][v[3]],
    decimal: v[4],
    commonAmountDecimal: v[5],
}
function getAddressList(path) {
    const fs = require('fs');
    let rawdata = fs.readFileSync(path);
    let data = rawdata.toString().split('\n');
    const address = [];
    for (const addr of data) {
        if (addr === '') {
            continue;
        }
        address.push(addr);
    }
    return address;
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

    const [deployer] = await hardhat.ethers.getSigners();
    const airdropList = getAddressList(para.fpath);

    var originSendAddrNum = 0;

    var airdropABI = getAirdropABI();
    var airdropAddr = contracts[net].AIRDROP;
    var airdrop = new web3.eth.Contract(airdropABI, airdropAddr);

    console.log('airdrop abi: ', airdropABI);
    console.log('airdrop addr: ', airdropAddr);

    const provider = await airdrop.methods.tokenProviders(para.tokenAddress).call();
    console.log('provider: ', provider);
    // return;

    var addrListLen = airdropList.length;
    var addrDelta = 200;
    var sendNumThisTime = 0;
    // var nonce = 42;
    for (var addrListStart = originSendAddrNum; addrListStart < addrListLen; addrListStart += addrDelta) {

        var t1 = new Date().getTime();
        var addrListEnd = addrListStart + addrDelta;
        if (addrListEnd > addrListLen) {
            addrListEnd = addrListLen;
        }
        // console.log(address);
        var callings = [];
        var airdropSubList = airdropList.slice(addrListStart, addrListEnd);
        console.log('addr sub list:' , airdropSubList);
        for (const address of airdropSubList) {
            var amountNoDecimal = BigNumber(para.commonAmountDecimal).times(10**para.decimal).toFixed(0, 3);
            console.log('address: ', address);
            console.log('amount decimal: ', para.commonAmountDecimal);
            console.log('amount no decimal: ', amountNoDecimal);
            var cs = getCalling(airdrop, address, para.tokenAddress, amountNoDecimal);
            callings.push(cs);
        }
        console.log('callings: ', callings);

        const txData = airdrop.methods.multicall(callings).encodeABI()
        const gas = await airdrop.methods.multicall(callings).estimateGas({from: deployer.address});
        // console.log('tx data: ', txData);
        console.log('gas: ', gas);
        const gasLimit = BigNumber(gas * 1.1).toFixed(0, 2);
        console.log('gasLimit: ', gasLimit);
        const signedTx = await web3.eth.accounts.signTransaction(
            {
                // nonce: nonce,
                to: airdropAddr,
                data:txData,
                gas: gasLimit,
                gasPrice: 19000000000,
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
