// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

import "../../interfaces/iZiSwap/ISwap.sol";

contract PancakeRouterAccessControlFree {

    address public safeModule;
    address public safeAddress;

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

    function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) external view onlySelf {}


    function swapTokensForExactTokens(uint256 amountOut, uint256 amountInMax, address[] calldata path, address to, uint256 deadline) external view onlySelf {}
        
}