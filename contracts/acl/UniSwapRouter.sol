// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

import "../interfaces/uniswap/ISwapRouter.sol";


contract UniSwapRouter {

    /// @dev The length of the bytes encoded address
    uint256 private constant ADDR_SIZE = 20;
    /// @dev The length of the bytes encoded fee
    uint256 private constant FEE_SIZE = 3;

    /// @dev The offset of a single token address and pool fee
    uint256 private constant NEXT_OFFSET = ADDR_SIZE + FEE_SIZE;
    /// @dev The offset of an encoded pool key
    uint256 private constant ONE_POOL_LENGTH = NEXT_OFFSET + ADDR_SIZE;

    address public safeModule;
    address public lpAddress;
    address public uniSwapRouter;
    address public usdc;
    address public weth;

    address public token0;
    address public token1;
    

    bytes32 private _checkedRole;
    uint256 private _checkedValue;

    constructor(
        address _safeModule, 
        address _lpAddress,
        address _uniSwapRouter,
        address _usdc,
        address _weth
    ) {
        safeModule = _safeModule;
        lpAddress = _lpAddress;
        uniSwapRouter = _uniSwapRouter;
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
    
    function exactInputSingle(ISwapRouter.ExactInputSingleParams calldata params) external view onlySelf {
        bool usdc2weth = (params.tokenIn == usdc) && (params.tokenOut == weth);
        bool weth2usdc = (params.tokenIn == weth) && (params.tokenOut == usdc);
        require(usdc2weth || weth2usdc, "only weth2usdc or usdc2weth");
        require(params.recipient == lpAddress, "recipient must be lp address");

        // todo: we may commit following require comment
        require(params.fee == 3000, "fee must be 0.3%");
    }

    function toAddress(bytes memory _bytes, uint256 _start) internal pure returns (address) {
        require(_start + 20 >= _start, 'toAddress_overflow');
        require(_bytes.length >= _start + 20, 'toAddress_outOfBounds');
        address tempAddress;

        assembly {
            tempAddress := div(mload(add(add(_bytes, 0x20), _start)), 0x1000000000000000000000000)
        }

        return tempAddress;
    }

    function toUint24(bytes memory _bytes, uint256 _start) internal pure returns (uint24) {
        require(_start + 3 >= _start, 'toUint24_overflow');
        require(_bytes.length >= _start + 3, 'toUint24_outOfBounds');
        uint24 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x3), _start))
        }

        return tempUint;
    }

    function exactInput(ISwapRouter.ExactInputParams calldata params) external view onlySelf { 
        require(params.path.length == ONE_POOL_LENGTH, "only one pool");

        address tokenA = toAddress(params.path, 0);
        uint24 fee = toUint24(params.path, ADDR_SIZE);
        address tokenB = toAddress(params.path, NEXT_OFFSET);

        bool usdc2weth = (tokenA == usdc) && (tokenB == weth);
        bool weth2usdc = (tokenB == weth) && (tokenA == usdc);
        require(usdc2weth || weth2usdc, "only weth2usdc or usdc2weth");
        require(params.recipient == lpAddress, "recipient must be lp address");

        // todo: we may commit following require comment
        require(fee == 3000, "fee must be 0.3%");

    }

    function exactOutputSingle(ISwapRouter.ExactOutputSingleParams calldata params) external view onlySelf {
        bool usdc2weth = (params.tokenIn == usdc) && (params.tokenOut == weth);
        bool weth2usdc = (params.tokenIn == weth) && (params.tokenOut == usdc);
        require (usdc2weth || weth2usdc, "only weth2usdc or usdc2weth");
        require(params.recipient == lpAddress, "recipient must be lp address");

        // todo: we may commit following require comment
        require(params.fee == 3000, "fee must be 0.3%");
    }

    function exactOutput(ISwapRouter.ExactOutputParams calldata params) external view onlySelf {

        require(params.path.length == ONE_POOL_LENGTH, "only one pool");

        address tokenA = toAddress(params.path, 0);
        uint24 fee = toUint24(params.path, ADDR_SIZE);
        address tokenB = toAddress(params.path, NEXT_OFFSET);

        bool usdc2weth = (tokenA == usdc) && (tokenB == weth);
        bool weth2usdc = (tokenB == weth) && (tokenA == usdc);
        require(usdc2weth || weth2usdc, "only weth2usdc or usdc2weth");
        require(params.recipient == lpAddress, "recipient must be lp address");

        // todo: we may commit following require comment
        require(fee == 3000, "fee must be 0.3%");
    }
        
}