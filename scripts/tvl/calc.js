const oneSide = require('./libs/oneSide');
const fixRange = require('./libs/fixRange');
const dynamicRange = require('./libs/dynamicRange');

// todo: load config, tokenMap, priceMap from database
const {config, tokenMap, priceMap} = require('./config');

function getWorth(net, tokenAmountList) {
    var worth = 0;
    for (item of tokenAmountList) {
        var address = item.address.toLowerCase();
        var amount = item.amount;

        // todo: load decimal, symbol, price from database
        var decimal = tokenMap[net][address].decimal;
        var symbol = tokenMap[net][address].symbol;
        var price = priceMap[symbol];

        var amountDecimal = amount / (10 ** decimal);

        console.log(symbol, ' ', amountDecimal);
        worth += price * amountDecimal;
    }
    return worth;
}

async function getTVLFromOneNet(net) {
    // todo: load rpc, fixRangeList, oneSideList, dynamicRangeList, uniswapFactoryAddr
    // from database
    var rpc = config[net].rpc;
    var fixRangeList = config[net].fixrange;
    var oneSideList = config[net].oneside;
    var dynamicRangeList = config[net].dynrange;
    var uniswapFactoryAddr = config[net].uniswap.factory;

    var tokenAmountListFixRange = await fixRange.getTokenAmountList(rpc, uniswapFactoryAddr, fixRangeList);
    var tokenAmountListOneSide = await oneSide.getTokenAmountList(rpc, oneSideList);
    var tokenAmountListDynamicRange = await dynamicRange.getTokenAmountList(rpc, dynamicRangeList);

    var tokenAmountList = [...tokenAmountListFixRange, ...tokenAmountListOneSide, ...tokenAmountListDynamicRange];

    var tvl = getWorth(net, tokenAmountList);

    return tvl;
}


async function getMaxAPRFromOneNet(net) {
    // todo: load rpc, fixRangeList, oneSideList, dynamicRangeList, uniswapFactoryAddr
    // from database
    var rpc = config[net].rpc;
    var fixRangeList = config[net].fixrange;
    var oneSideList = config[net].oneside;
    var dynamicRangeList = config[net].dynrange;
    var uniswapFactoryAddr = config[net].uniswap.factory;
    var blockPerYear = config[net].blockPerYear;

    var maxAPR = 0;

    for (var fixRangeAddr of fixRangeList) {
        var capitalTokenAmountList = await fixRange.getCapitalTokenAmountList(rpc, uniswapFactoryAddr, fixRangeAddr);
        var rewardTokenAmountList = await fixRange.getRewardTokenAmountList(rpc, fixRangeAddr, blockPerYear);
        var capitalWorth = getWorth(net, capitalTokenAmountList);
        var rewardWorth = getWorth(net, rewardTokenAmountList);
        var apr = (capitalWorth > 0) ? rewardWorth / capitalWorth : 0;
        if (apr > maxAPR) {
            maxAPR = apr;
        }
    }

    for (var oneSideAddr of oneSideList) {
        var capitalTokenAmountList = await oneSide.getCapitalTokenAmountList(rpc, oneSideAddr);
        var rewardTokenAmountList = await oneSide.getRewardTokenAmountList(rpc, oneSideAddr, blockPerYear);
        var capitalWorth = getWorth(net, capitalTokenAmountList);
        var rewardWorth = getWorth(net, rewardTokenAmountList);
        var apr = (capitalWorth > 0) ? rewardWorth / capitalWorth : 0;
        console.log('apr: ', apr);
        if (apr > maxAPR) {
            maxAPR = apr;
        }
    }

    for (var dynamicRangeAddr of dynamicRangeList) {
        var capitalTokenAmountList = await dynamicRange.getCapitalTokenAmountList(rpc, dynamicRangeAddr);
        var rewardTokenAmountList = await dynamicRange.getRewardTokenAmountList(rpc, dynamicRangeAddr, blockPerYear);
        var capitalWorth = getWorth(net, capitalTokenAmountList);
        var rewardWorth = getWorth(net, rewardTokenAmountList);
        var apr = (capitalWorth > 0) ? rewardWorth / capitalWorth : 0;
        if (apr > maxAPR) {
            maxAPR = apr;
        }
    }

    return maxAPR;
}

async function getTVL() {
    var ethTVL = await getTVLFromOneNet('ethereum');
    // var ethTVL = 0;
    // var izumiTVL = await getTVLFromOneNet('izumiTest');
    var izumiTVL = 0;
    var tvl = ethTVL + izumiTVL;
    return tvl;
}

async function getMaxAPR() {
    var ethAPR = await getMaxAPRFromOneNet('ethereum');
    // var izumiAPR = await getMaxAPRFromOneNet('izumiTest');
    var izumiAPR = 0;
    var apr = Math.max(ethAPR, izumiAPR);
    return apr;
}

module.exports = {
    getTVL,
    getTVLFromOneNet,
    getMaxAPR,
    getMaxAPRFromOneNet
};