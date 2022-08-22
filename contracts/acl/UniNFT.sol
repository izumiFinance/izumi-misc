// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

import "../interfaces/uniswap/INonfungiblePositionManager.sol";


contract UniNFT {

    address public safeModule;
    address public lpAddress;
    address public uniV3NFTManager;
    address public usdc;
    address public weth;

    address public token0;
    address public token1;
    

    bytes32 private _checkedRole;
    uint256 private _checkedValue;

    constructor(
        address _safeModule, 
        address _lpAddress,
        address _uniV3NFTManager,
        address _usdc,
        address _weth
    ) {
        safeModule = _safeModule;
        lpAddress = _lpAddress;
        uniV3NFTManager = _uniV3NFTManager;
        usdc = _usdc;
        weth = _weth;
        if (usdc < weth) {
            token0 = usdc;
            token1 = weth;
        } else {
            token1 = weth;
            token0 = usdc;
        }
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
        require(params.token0 == token0, "token0 must be weth or usdc");
        require(params.token1 == token1, "token1 must be weth or usdc");
        require(params.recipient == lpAddress, "recipient must be lp address");
        
        // todo: we may commit following require comment
        require(params.fee == 3000, "fee must be 0.3%");
    }

    function increaseLiquidity(INonfungiblePositionManager.IncreaseLiquidityParams calldata params) external view onlySelf {

        INonfungiblePositionManager.Position memory position;

        (
            ,
            ,
            position.token0,
            position.token1,
            position.fee,
            position.tickLower,
            position.tickUpper,
            position.liquidity,
            ,
            ,
            position.tokensOwed0,
            position.tokensOwed1
        ) = INonfungiblePositionManager(uniV3NFTManager).positions(params.tokenId);

        require(position.token0 == token0, "token0 must be weth or usdc");
        require(position.token1 == token1, "token1 must be weth or usdc");

        // todo: we may commit following require comment
        require(position.fee == 3000, "fee must be 0.3%");
    }

    function decreaseLiquidity(INonfungiblePositionManager.DecreaseLiquidityParams calldata params) external view onlySelf {

        INonfungiblePositionManager.Position memory position;

        (
            ,
            ,
            position.token0,
            position.token1,
            position.fee,
            position.tickLower,
            position.tickUpper,
            position.liquidity,
            ,
            ,
            position.tokensOwed0,
            position.tokensOwed1
        ) = INonfungiblePositionManager(uniV3NFTManager).positions(params.tokenId);

        require(position.token0 == token0, "token0 must be weth or usdc");
        require(position.token1 == token1, "token1 must be weth or usdc");

        // todo: we may commit following require comment
        require(position.fee == 3000, "fee must be 0.3%");
    }

    function collect(INonfungiblePositionManager.CollectParams calldata params) external view onlySelf {
        require(params.recipient == lpAddress, "recipient must be lp address");

        INonfungiblePositionManager.Position memory position;

        (
            ,
            ,
            position.token0,
            position.token1,
            position.fee,
            position.tickLower,
            position.tickUpper,
            position.liquidity,
            ,
            ,
            position.tokensOwed0,
            position.tokensOwed1
        ) = INonfungiblePositionManager(uniV3NFTManager).positions(params.tokenId);

        require(position.token0 == token0, "token0 must be weth or usdc");
        require(position.token1 == token1, "token1 must be weth or usdc");

        // todo: we may commit following require comment
        require(position.fee == 3000, "fee must be 0.3%");
    }


    function sweepToken(
        address token,
        uint256 amountMinimum,
        address recipient
    ) external view onlySelf {

        require(recipient == lpAddress, "recipient must be lp address");
        require(token == weth || token == usdc, "token must be weth or usdc");
    }

        
}