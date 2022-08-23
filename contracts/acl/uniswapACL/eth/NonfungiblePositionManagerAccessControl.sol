// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

import "../../../interfaces/uniswap/INonfungiblePositionManager.sol";


contract EthNonfungiblePositionManagerAccessControl {

    address public safeModule;
    address public safeAddress;
    address public uniV3NFTManager;

    mapping(address=>bool) public tokenWhiteList;
    

    bytes32 internal _checkedRole;
    uint256 internal _checkedValue;

    constructor(
        address _safeAddress,
        address _safeModule
    ) {

        require(_safeAddress != address(0), "invalid safe address");
        require(_safeModule!= address(0), "invalid module address");

        safeAddress = _safeAddress;
        safeModule = _safeModule;
        // uniswap v3 nft
        uniV3NFTManager = 0xC36442b4a4522E871399CD717aBDD847Ab11FE88;
        // usdc
        tokenWhiteList[0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48] = true;
        // weth
        tokenWhiteList[0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2] = true;
    }
    modifier onlySelf() {
        require(address(this) == msg.sender, "Caller is not inner");
        _;
    }

    modifier onlyModule() {
        require(safeModule == msg.sender, "Caller is not the module");
        _;
    }

    function check(bytes32 _role, uint256 _value, bytes calldata data) external onlyModule returns (bool) {
        _checkedRole = _role;
        _checkedValue = _value;
        (bool success,) = address(this).staticcall(data);
        return success;
    }

    fallback() external {
        revert("Unauthorized access");
    }

    function mint(INonfungiblePositionManager.MintParams calldata params) external view onlySelf {
        require(tokenWhiteList[params.token0], "token0 is not allowed");
        require(tokenWhiteList[params.token1], "token1 is not allowed");
        require(params.recipient == safeAddress, "recipient must be safe address");
        require(params.fee == 500, "feetier must be 0.05%");
    }

    function increaseLiquidity(INonfungiblePositionManager.IncreaseLiquidityParams calldata params) external view onlySelf {

        require(INonfungiblePositionManager(uniV3NFTManager).ownerOf(params.tokenId) == safeAddress, "nft owner must be safe address");
    }

    function decreaseLiquidity(INonfungiblePositionManager.DecreaseLiquidityParams calldata params) external view onlySelf {

    }

    function collect(INonfungiblePositionManager.CollectParams calldata params) external view onlySelf {
        require(params.recipient == safeAddress, "recipient must be safe address");
    }


    function sweepToken(
        address token,
        uint256 amountMinimum,
        address recipient
    ) external view onlySelf {

        require(recipient == safeAddress, "recipient must be safe address");
        require(tokenWhiteList[token], "token is not allowed");
    }

        
}
