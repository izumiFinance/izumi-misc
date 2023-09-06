
const contracts = {
	// coinbase
	coinbase: "0xD4D6F030520649c7375c492D37ceb56571f768D0",

	nftManagerJson: "@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json",
	factoryJson: "@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json",
	poolJson: "@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json",

	swapRouterJson: "@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json",

	// tokens and contracts
    izumiTest: {
		iZiDODOIDOWhiteList: "0x629f5636b4Cdc450A5D8e060bc850A12B38DE629",

		// uniswapV3
		nftManager: "0x5202254db4B1Eb6632D54B6860ebC85892889fD1",
		factory: "0x8c05B8e31C5f94EDF49173f2b04E637a81F6510f",
		swapRouter: "0x6d44131a2A84B49Fa1F73e7c854A0c90982ffdB5",

		USDT: "0x2d2bA91b026E08e0f23Eb01d7ecAb0e7E279a45f",
		USDC: "0xe507AAC9eFb2A08F53C7BC73B3B1b8BCf883E41B",
		DAI: "0xA97f8bc2b98a56f648340e05406cc7E34bB25D3A",
		BIT: "0x41BC21bdcF0FA87ae6eeFcBE0e4dB29dB2b650C1",
		iZi: "0xEe5e3852434eB67F8e9E97015e32845861ea15E8",
		LIDO: "0xB7556AF20fDcCfA1f3E10AFDaFfef1F975Fd26fF",
		SPELL: "0x280F127021DeeB3Bd147a15e213A1B595dD21bfe",
		MIM: "0x52F87F2F02B0FD6797905644572F76537260CC8b",
		stETH: "0x0453189A122462bd64348F01EBdcD20d2d60be81",
	    WETH9: "0x3AD23A16A81Cd40010F39309876978F20DD2f682",
		YIN: "0x628571078add0031Ff6E9975AE6ddE1123fC423b",
		ACY: '0x532403eeAB8673d008CB558815B784267Cec63A0',

		USDC6: '0x244d6215E5b70e060094E9593E4497D952A2faD0',
		USDT6: '0x43C3b947FF2f63Bdd7d14C6dAeEb8D9428B1686d',

		DEVT: '0xD93FfD9B4d5D643A175B7DcBf4Fb0dA0016D35C7',
		DDAO: '0x23f9837867c28069840da3914c16429bEC008Ef5',

		ETHT: '0x72328EB80d99147A48BA5d05B54D6d19dA655A01',
		iZiT: '0x13F36332b6b9e658Ed3e7429F1A50AEA8f4e766E',

		IZITEST: '0xBc92690a178Cd91A079FAc2BE67d27424e292Fd2',
		
		AIRDROP: "0x6A794Ac1AD9401cb988f00F4ad2629F09B28d172",
		ONESIDE_USDC_BIT_3000: "0x4177ae2fBB01cD2704ed36864678B43DFf1D365B",
		// ONESIDE_USDC_IZI_3000: "0x41FAe2a2e93B1d775aef0975F4FBDe48C13b81A9",
		// ONESIDE_USDT_BIT_3000: "0x1B4B2b2AaF55bDd83F9611c6d9E51bb6b7C13EF3",

		ONESIDE_WETH9_IZI_3000: "0x9b95C1E6277e2f00ffADBa9B31fa9016498a8346",
		ONESIDE_WETH9_IZI_3000_EMERGENCY_WITHDRAW: '0x6fCd0637265267197C96D70db90EE729FCc4aa21',

		DYNRANGE_WETH9_IZI_3000: "0x169431cAB9b03D39670414f089f283FE97933467",

		FIXRANGE_USDC_USDT_100: "0x2A64352478dc0E7BCA39FF22186C1b83844725ad",
		FIXRANGE_USDC_USDT_100_EMERGENCY_WITHDRAW: "0x7200a5638Ea19857c970FD4630364C2b4bcafad3",

		ONESIDE_ETHT_IZIT_3000: '0xdBA594608D9941D4072F27C99B3E69565b6893Bf',

		testOracle: '0xEC65Ba571bB4f449065Ba0c2A0795F038109e4fb',

		testPow: '0x6B4D3f0A9351aaa4bFF2f2a3aF3f88082673E9be',

		testSet: '0x60efE66FB8864f2453a4F882b4e3d2CF2930976e',
    },

	arbitrum: {
		USDT: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
		USDC: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
		factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
		nftManager: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
		TEST_ARBITRUM_BLOCK: '0x93E94ef7D2d735fF21C302c765d8A77C1955A311',
		coboSafeModule: '0x976cc8528c5A3CCd4D9fd9bBd2da7Ca5e7cc4BbA',
		coboSafeAddress: '0xA3ffEA6A7368e07fb79C9DD1fe25928BEa3aef38',
		uniswapRouter: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
	},

	polygon: {
		WMATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
		ETH: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
		iZi: '0x60d01ec2d5e98ac51c8b4cf84dfcce98d527c747',
		YIN: '0x794Baab6b878467F93EF17e2f2851ce04E3E34C8',
		USDT: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
		USDC: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
		ACY: '0x8b1f836491903743fE51ACd13f2CC8Ab95b270f6',
		DDAO: '0x90f3edc7d5298918f7bb51694134b07356f7d0c7',

		USDC6: '0x1DADF066518E2b7064D85cED45625BFeC52ca07d',
		USDT6: '0x130f74273856Dfc5Ee8AE485FE991c0cC6411f39',
		ETHT: '0x8981c60ff02CDBbF2A6AC1a9F150814F9cF68f62',
		iZiT: '0xbE138aD5D41FDc392AE0B61b09421987C1966CC3',
		YINT: '0x1f2412A4cb5eBA5c349257bEf4b323ba7044be9B',
		ONESIDE_ETHT_IZIT_3000: '0x226BeE39f76D86711410D03C1D6d906272bF5549',
		FIXRANGE_USDC6_USDT6_500: '0xbe53AC7D965D94B3786Bd7A9B0d4858E09cc3506',

		AIRDROP: '0x4350e283db040921c5872819FbFBABDC484115BD',
		
		nftManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
		factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
		swapRouter: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
	},

	mumbai: {
		WMATIC: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
		ETH: '0x1DADF066518E2b7064D85cED45625BFeC52ca07d',
		iZi: '0xBd770416a3345F91E4B34576cb804a576fa48EB1',
		USDC: '0x263B272A99127ad57cff73AA9c04C515007bFb6f',
		USDT: '0x3BB898B4Bbe24f68A4e9bE46cFE72D1787FD74F4',

		nftManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
		factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
		swapRouter: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
	},

	rinkeby: {
		USDC: '0xdbd76B3B7330374386829B3B5C9317e84Ee75257',
		USDT: '0x905f8714ebE30BF9829096043370B9BA29643D3D',
		iZiT: '0x4d140E612e476A6ba54EF1306b2bA398a5dEff09',
		BIT: '0xEB122DE19FeA9eD039E2d087113db26017f5F91a',
		TestU: '0x95c5F14106ab4d1dc0cFC9326225287c18c2d247',
		IUSD: '0xF6FFe4f3FdC8BBb7F70FFD48e61f17D1e343dDfD',

		iZi: "0x40E2BA87F796FaBeEe98872F2085fC020DbAd47B",
		WETH9: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
		nftManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
		factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
		swapRouter: "0xE592427A0AEce92De3Edee1F18E0157C05861564",

		ONESIDE_WETH9_IZI_3000: '0x2cc9e757dA9C89d297E78972E60837A2Cf4e8447',
		// FIXRANGE_USDC_USDT_500: '0x7B619028b64d7675806A42Dd5B17dfE8aD4830D2',
		FIXRANGE_USDC_USDT_500: '0x275Ee44eB04b682E94C7455be07639Be7Ac12127',

		AIRDROP: '0xA61A38b9350cbE00a2030A94B40b888483C28E8F',
	},

	ethereum: {
		YIN: "0x794baab6b878467f93ef17e2f2851ce04e3e34c8",
		WETH9: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
		DEVT: "0xB5c578947de0fd71303F71F2C3d41767438bD0de",
		USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
		USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
		iZi: "0x9ad37205d608B8b219e6a2573f922094CEc5c200",
		nftManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
		factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
		swapRouter: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
		AIRDROP: '0xE65DB7179d70DAea99A0547eE732087eab0ffFBC',
        iZiDODOIDOWhiteList: '0x7a524c7e82874226F0b51aade60A1BE4D430Cf0F',
		FIXRANGE_USDC_USDT_100: '0x8981c60ff02CDBbF2A6AC1a9F150814F9cF68f62',
		ONESIDE_WETH9_IZI_3000: '0xbE138aD5D41FDc392AE0B61b09421987C1966CC3',
	},

	bsc: {
		AIRDROP: '0x1dadf066518e2b7064d85ced45625bfec52ca07d',
		testA: '0xCFD8A067e1fa03474e79Be646c5f6b6A27847399',
		testB: '0xAD1F11FBB288Cd13819cCB9397E59FAAB4Cdc16F',
		safeAddress: '0x720b037568F8c57Acee8E8a0f39473eC5407E067',
        safeModule: '0x82F60d84A36F058F6Fbe849F03326f64bB38299A',
		pancakeSwapRouter: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
	},

	bscTest: {
		factory: '0x308934C923c3F7bc082AeE9818C033aFAf358510',
		nftManager: '0x512f0d70d9b06E4Bd45fAD199eFfabCFd10325A9',
		swapRouter: '0x35BaD6A145D99889759180b4cB7f61a968BD170a',
		WBNB: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
		WETH: '0xc9DC6ed52Bf07E4048185d7B66ED7e7c5084C8F2',
		BIT: '0xac360dc0F8EF1C94Ab4034220E0A01567acbFdE4',

		iZi: '0x551197e6350936976DfFB66B2c3bb15DDB723250',
		iUSD: '0x60FE1bE62fa2082b0897eA87DF8D2CfD45185D30',
		APEX: '0x7a8176293E5dbf4a18716bB03888442cb77dc386',
		esAPEX: '0x2014B354e8D3E5F49519a414b250Eda65e618e1c',
		USDT: '0x6AECfe44225A50895e9EC7ca46377B9397D1Bb5b',
		IONS: '0xa2c05b87531CD20D02790114e3B960DC98CB0B21',
		MATIC: '0xF8c80396d6EC96dEdc816c558273BB526b8cA847',
        SLD: '0x45F76eD56082cd0B0A0Ad1E4513214d1219f9998',
        DUET: '0x5D111A3573838f6A24B4b64dbE6A234bE1e6d822',
        dWTI: '0x967b61E062205C2DcbB6146b383119A8827493C3',
        DUSD: '0x5682fBb54565b02a4E72Ce29C5a9B61Dee8a0819',
        USDT18: '0x3eC84d8bDD27Db0FD49462187b0bd8E347bBc1e7',
        KSW: '0xe377BA982D52C598568cE37dd146ced237FFd938',
        REVO: '0x1e19F04008f57344D589494C50Ff8138aD5207Ae',
        LAND: '0x1017D7d37169f98EED32BBB68aD79A3881174e3f',
        FROYO: '0xed2F92D6D2b936ce3Db9e046E57D9119e4A31ECb',
        FeeA: '0x0c08e73abe0fc445e727ca9b779d22649110f782',
	},
	goerli: {
		factory: '0xED9b4E3ED8fe7e820B950F28f939AF848f98e995',
		WETH9: '0x706A11AF5bb5C2a50aB9802503ddbfF69373D1bd',
		swapRouter: '0x817EC83Fb6906ba0777E89110d5089313385F4A2',
		nftManager: '0x29b66280F0Ea5F5DfbD7C94D560FC060575360cd',
		swETH: '0x30ebB58888E94095939e220CAb04C59Ea65ded2E',
		iZi: '0xC6C7c2edF70A3245ad6051E93809162B9758ce08',
	},
	mantleTest: {
		iZi: '0x876508837C162aCedcc5dd7721015E83cbb4e339',
		USDT: '0x6AECfe44225A50895e9EC7ca46377B9397D1Bb5b',
		MNT: '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000',
		ETH: '0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111',
	},
	mantle: {
		iZiSwapFactory: '0x45e5F26451CDB01B0fA1f8582E0aAD9A6F27C218',
		AIRDROP: '0x263B272A99127ad57cff73AA9c04C515007bFb6f',
		MINU: '0x51cfe5b1e764dc253f4c8c1f19a081ff4c3517ed',
		MNT: '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8',
		USDT: '0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE',
	},
	scrollTestL2: {
		iZiSwapFactory: '0xe821322692Ef22e0BA985c1Ad8BD3042e9E1Cc43',
		iZi: '0xdB1A8CF7e6d2fa2C0775D090BCc2cfB3A9e00CdC',
		USDT: '0xe9805A0bA7A8E253fd93A3f9b360619c4819da50',
	},
	zkSyncAlphaTest: {
		iZi: '0xA5900cce51c45Ab9730039943B3863C822342034',
		ETH: '0x8C3e3f2983DB650727F3e05B7a7773e4D641537B',
		USDT: '0x65497b0FeEC71F101E5FD6F98d8B0272f8F93010',
		MIT: '0xAec84500e96F90370C55657d08f375A8d05F4D8c',
		iZiSwapFactory: '0x7FD55801c066AeB0bD848c2BA8AEc821AF700A41',
	},
	zkSyncEraMainnet: {
		iZi: '0x16a9494e257703797d747540f01683952547ee5b',
		LSD: '0x458A2E32eAbc7626187E6b75f29D7030a5202bD4',
		ETH: '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91',
		iZiSwapFactory: '0x575Bfc57B0D3eA0d31b132D622643e71735A6957',
		USDC: '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4',
		BLADE: '0x591CAdFaF2F5dBBD09580C8b74A4770A9255bF28',
		DEXTF: "0x9929bCAC4417A21d7e6FC86F6Dae1Cc7f27A2e41",
        ZKSP: "0x7eCf006f7c45149B457e9116392279CC8A630F14",
        RF: "0x5f7cbcb391d33988dad74d6fd683aadda1123e4d",
        OT: "0xd0ea21ba66b67be636de1ec4bd9696eb8c61e9aa",
        SPACE: "0x47260090cE5e83454d5f05A0AbbB2C953835f777",
        xSPACE: "0x6aF43486Cb84bE0e3EDdCef93d3C43Ef0C5F63b1",
        GGG: "0x7E2A6456Bb3eCEcbdb38bC76Ad8dF9e448B15835",
        KANA: "0x26aC1D9945f65392B8E4E6b895969b5c01A7B414",
		zkUSD: "0xfC7E56298657B002b3e656400E746b7212912757",
		PIKO: "0xf8C6dA1bbdc31Ea5F968AcE76E931685cA7F9962",
		BEL: "0xB83CFB285fc8D936E8647FA9b1cC641dBAae92D9",
	},
	linea: {
		iZiSwapFactory: '0x45e5F26451CDB01B0fA1f8582E0aAD9A6F27C218',
		AIRDROP: '0xb1183357745D3fD7d291E42a2c4B478cdB5710c6',
	},
	base: {
		iZiSwapFactory: '0x8c7d3063579BdB0b90997e18A770eaE32E1eBb08',
	},
	baseTest: {
		iZiSwapFactory: '0x64c2F1306b4ED3183E7B345158fd01c19C0d8c5E',
	},
	opBNB: {
		iZiSwapFactory: '0x8c7d3063579BdB0b90997e18A770eaE32E1eBb08'
	},
	loot: {
	    SoSwap: '0x7e11C99f499e18325dCA898f3Df12e45fE7EAD58',
	}
}


module.exports = contracts;

