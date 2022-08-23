// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

import "../../interfaces/iZiSwap/ISwap.sol";

contract SwapAccessControl {

    /// @dev The length of the bytes encoded address
    uint256 private constant ADDR_SIZE = 20;
    /// @dev The length of the bytes encoded fee
    uint256 private constant FEE_SIZE = 3;

    /// @dev The offset of a single token address and pool fee
    uint256 private constant NEXT_OFFSET = ADDR_SIZE + FEE_SIZE;
    /// @dev The offset of an encoded pool key
    uint256 private constant ONE_POOL_LENGTH = NEXT_OFFSET + ADDR_SIZE;

    address public safeModule;
    address public safeAddress;
    address public swapAddress;

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
        
        // weth
        tokenWhiteList[0x2170Ed0880ac9A755fd29B2688956BD959F933F8] = true;
        // usdc
        tokenWhiteList[0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d] = true;
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

    function toAddress(bytes memory _bytes, uint256 _start) internal pure returns (address) {
        require(_start + 20 >= _start, 'toAddress_overflow');
        require(_bytes.length >= _start + 20, 'toAddress_outOfBounds');
        address tempAddress;

        assembly {
            tempAddress := div(mload(add(add(_bytes, 0x20), _start)), 0x1000000000000000000000000)
        }

        return tempAddress;
    }

    function _checkPath(bytes memory path) internal view {
        uint256 start = 0;
        while (start < path.length) {
            address token = toAddress(path, start);
            require(tokenWhiteList[token], "token is not allowed");
            start = start + NEXT_OFFSET;
        }
    }

    function swapDesire(ISwap.SwapDesireParams calldata params) external view onlySelf {
        require(params.recipient == safeAddress, "recipient must be safe address");
        _checkPath(params.path);
    }

    function swapAmount(ISwap.SwapAmountParams calldata params) external view onlySelf {
        require(params.recipient == safeAddress, "recipient must be safe address");
        _checkPath(params.path);
    }

    function swapY2X(
        ISwap.SwapParams calldata swapParams
    ) external view onlySelf {

        require(tokenWhiteList[swapParams.tokenX], "tokenX is not allowed");
        require(tokenWhiteList[swapParams.tokenY], "tokenY is not allowed");
        require(swapParams.recipient == safeAddress, "recipient must be safe address");
    }

    function swapY2XDesireX(
        ISwap.SwapParams calldata swapParams
    ) external view onlySelf {
        require(tokenWhiteList[swapParams.tokenX], "tokenX is not allowed");
        require(tokenWhiteList[swapParams.tokenY], "tokenY is not allowed");
        require(swapParams.recipient == safeAddress, "recipient must be safe address");
    }

    function swapX2Y(
        ISwap.SwapParams calldata swapParams
    ) external view onlySelf {

        require(tokenWhiteList[swapParams.tokenX], "tokenX is not allowed");
        require(tokenWhiteList[swapParams.tokenY], "tokenY is not allowed");
        require(swapParams.recipient == safeAddress, "recipient must be safe address");
    }
    
    function swapX2YDesireY(
        ISwap.SwapParams calldata swapParams
    ) external view onlySelf {

        require(tokenWhiteList[swapParams.tokenX], "tokenX is not allowed");
        require(tokenWhiteList[swapParams.tokenY], "tokenY is not allowed");
        require(swapParams.recipient == safeAddress, "recipient must be safe address");
    }
        
}