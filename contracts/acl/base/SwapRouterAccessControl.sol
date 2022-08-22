// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

import "../../interfaces/uniswap/ISwapRouter.sol";


contract SwapRouterAccessControl {

    /// @dev The length of the bytes encoded address
    uint256 private constant ADDR_SIZE = 20;
    /// @dev The length of the bytes encoded fee
    uint256 private constant FEE_SIZE = 3;

    /// @dev The offset of a single token address and pool fee
    uint256 private constant NEXT_OFFSET = ADDR_SIZE + FEE_SIZE;
    /// @dev The offset of an encoded pool key
    uint256 private constant ONE_POOL_LENGTH = NEXT_OFFSET + ADDR_SIZE;

    address public safeAddress;
    address public safeModule;
    address public uniSwapRouter;
    
    mapping(address=>bool) public tokenWhiteList;

    bytes32 internal _checkedRole;
    uint256 internal _checkedValue;

    constructor(
        address _safeAddress,
        address _safeModule, 
        address _uniSwapRouter
    ) {
        require(_safeAddress != address(0), "invalid safe address");
        require(_safeModule!= address(0), "invalid module address");
        safeModule = _safeModule;
        safeAddress = _safeAddress;
        uniSwapRouter = _uniSwapRouter;
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
        require(tokenWhiteList[params.tokenIn], "tokenIn is not allowed");
        require(tokenWhiteList[params.tokenOut], "tokenOut is not allowed");
        require(params.recipient == safeAddress, "recipient must be safe address");
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
        address tokenB = toAddress(params.path, NEXT_OFFSET);

        require(tokenWhiteList[tokenA], "tokenA is not allowed");
        require(tokenWhiteList[tokenB], "tokenB is not allowed");
        require(params.recipient == safeAddress, "recipient must be safe address");
    }

    function exactOutputSingle(ISwapRouter.ExactOutputSingleParams calldata params) external view onlySelf {
        require(tokenWhiteList[params.tokenIn], "tokenIn is not allowed");
        require(tokenWhiteList[params.tokenOut], "tokenOut is not allowed");
        require(params.recipient == safeAddress, "recipient must be safe address");
    }

    function exactOutput(ISwapRouter.ExactOutputParams calldata params) external view onlySelf {

        require(params.path.length == ONE_POOL_LENGTH, "only one pool");

        address tokenA = toAddress(params.path, 0);
        address tokenB = toAddress(params.path, NEXT_OFFSET);

        require(tokenWhiteList[tokenA], "tokenA is not allowed");
        require(tokenWhiteList[tokenB], "tokenB is not allowed");
        require(params.recipient == safeAddress, "recipient must be safe address");
    }
        
}