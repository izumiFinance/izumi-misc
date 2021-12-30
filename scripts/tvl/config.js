
const config = {

	// tokens and contracts
    izumiTest: {
        blockPerYear: 2221714,
        rpc: "http://47.241.103.6:9545",
		// uniswapV3
        uniswap: {
            nftManager: "0x5202254db4B1Eb6632D54B6860ebC85892889fD1",
            factory: "0x8c05B8e31C5f94EDF49173f2b04E637a81F6510f",
            swapRouter: "0x6d44131a2A84B49Fa1F73e7c854A0c90982ffdB5",
        },

        tokens: [
            {
                symbol: 'USDT',
                address: '0x44B61a549B16ba204c4c6dA053EC2BB0Cf97bb24',
                decimal: 18,
            },
            {
                symbol: 'USDC',
                address: '0xe507AAC9eFb2A08F53C7BC73B3B1b8BCf883E41B',
                decimal: 6,
            },
            {
                symbol: 'BIT',
                address: '0x41BC21bdcF0FA87ae6eeFcBE0e4dB29dB2b650C1',
                decimal: 18,
            },
            {
                symbol: 'iZi',
                address: '0xEe5e3852434eB67F8e9E97015e32845861ea15E8',
                decimal: 18,
            },
            {
                symbol: 'WETH9',
                address: '0x3AD23A16A81Cd40010F39309876978F20DD2f682',
                decimal: 18,
            },
        ],

        oneside: [
            '0x4177ae2fBB01cD2704ed36864678B43DFf1D365B',
            '0x9b95C1E6277e2f00ffADBa9B31fa9016498a8346',
        ],
        fixrange: [
            '0x2A64352478dc0E7BCA39FF22186C1b83844725ad',
        ],
        dynrange: [
            '0x473FE92da0fc53bfA729619Ce4d8A37A73484A9A',
        ],

    },

	ethereum: {
        blockPerYear: 2221714,
        rpc: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        uniswap: {
            nftManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
            factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
            swapRouter: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
        },
        tokens: [
            {
                symbol: 'USDT',
                address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
                decimal: 6,
            },
            {
                symbol: 'USDC',
                address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                decimal: 6,
            },
            {
                symbol: 'iZi',
                address: '0x9ad37205d608B8b219e6a2573f922094CEc5c200',
                decimal: 18,
            },
            {
                symbol: 'WETH9',
                address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
                decimal: 18,
            },
        ],
        fixrange: [
            '0x8981c60ff02CDBbF2A6AC1a9F150814F9cF68f62',
        ],
        oneside: [
            '0xbE138aD5D41FDc392AE0B61b09421987C1966CC3',
        ],
        dynrange: [],
	}
};

function getTokenMap(net) {
    var tokens = config[net].tokens;
    var map = new Array();
    for (item of tokens) {
        var address = item.address.toLowerCase();
        var decimal = item.decimal;
        var symbol = item.symbol;
        map[address] = { symbol, decimal };
    }
    return map;
}

const tokenMap = {
    izumiTest: getTokenMap('izumiTest'),
    ethereum: getTokenMap('ethereum'),
};

const priceMap = {
    USDT: 1,
    USDC: 1,
    iZi: 0.1,
    WETH9: 3700,
    BIT: 2.5,
};

module.exports = {
    config,
    tokenMap,
    priceMap
};
