
const Web3 = require('web3');

const oneSideABI = require('../abis/farm/MiningOneSideBoost.json');

async function _getRewardInfo(web3, miningAddress) {

    var mining = new web3.eth.Contract(oneSideABI, miningAddress);
    var rewardInfosLen = Number(await mining.methods.rewardInfosLen().call());
    var rewardInfos = [];
    for (var i = 0; i < rewardInfosLen; i ++) {
        var rewardInfo = await mining.methods.rewardInfos(i).call();
        rewardInfos.push(rewardInfo);
    }
    return rewardInfos;
}

async function _getMiningContractInfo(web3, miningAddress) {
    var mining = new web3.eth.Contract(oneSideABI, miningAddress);
    var result = await mining.methods.getMiningContractInfo().call();
    var lockBoostMultiplier = Number(result.lockBoostMultiplier_.toString());
    var totalVLiquidity = Number(result.totalVLiquidity_.toString());
    var totalLock = Number(result.totalLock_.toString());
    var totalNIZI = Number(result.totalNIZI_.toString());

    return {
        uniToken: result.uniToken_, 
        lockToken: result.lockToken_, 
        fee: result.fee_, 
        lockBoostMultiplier, 
        iZiToken: result.iziTokenAddr_, 
        totalVLiquidity, 
        totalLock, 
        totalNIZI
    };
}

async function getTokenAmountList(rpc, contractAddrList) {

    var web3 = new Web3(new Web3.providers.HttpProvider(rpc));

    var tokenAmountList = [];

    for (contractAddr of contractAddrList) {
        var metaInfo = await _getMiningContractInfo(web3, contractAddr);
        tokenAmountList.push({
            address: metaInfo.uniToken,
            amount: metaInfo.totalVLiquidity / metaInfo.lockBoostMultiplier * 1e6
        });
        tokenAmountList.push({
            address: metaInfo.lockToken,
            amount: metaInfo.totalLock,
        });
        if (metaInfo.totalNIZI > 0) {
            tokenAmountList.push({
                address: metaInfo.iZiToken,
                amount: metaInfo.totalNIZI,
            });
        }
    }
    return tokenAmountList;
}

async function getCapitalTokenAmountList(rpc, contractAddr) {

    var web3 = new Web3(new Web3.providers.HttpProvider(rpc));

    var tokenAmountList = [];

    var metaInfo = await _getMiningContractInfo(web3, contractAddr);
    tokenAmountList.push({
        address: metaInfo.uniToken,
        amount: metaInfo.totalVLiquidity / metaInfo.lockBoostMultiplier * 1e6 * (1 + metaInfo.lockBoostMultiplier)
    });

    return tokenAmountList;
}

async function getRewardTokenAmountList(rpc, contractAddr, blockNum) {

    var web3 = new Web3(new Web3.providers.HttpProvider(rpc));
    var tokenAmountList = [];
    var rewardInfos = await _getRewardInfo(web3, contractAddr);
    for (var rewardInfo of rewardInfos) {
        var address = rewardInfo.rewardToken;
        var amount = Number(rewardInfo.rewardPerBlock) * blockNum;

        tokenAmountList.push({address, amount});
    }
    return tokenAmountList;
}
module.exports = {
    getTokenAmountList,
    getCapitalTokenAmountList,
    getRewardTokenAmountList
};