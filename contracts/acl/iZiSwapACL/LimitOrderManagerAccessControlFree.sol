// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.4;

import "../../interfaces/iZiSwap/ILimitOrderManager.sol";

contract LimitOrderManagerAccessControlFree {

    address public safeAddress;
    address public safeModule;

    bytes32 private _checkedRole;
    uint256 internal _checkedValue;

    mapping(address => bool) public tokenWhiteList;

    constructor(address _safeAddress, address _safeModule) {
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

    // ACL methods

    function newLimOrder(uint256 idx, ILimitOrderManager.AddLimOrderParam calldata addLimitOrderParam) external view onlySelf {}

    function collectLimOrder(address recipient, uint256 orderIdx, uint128 collectDec, uint128 collectEarn) external view onlySelf {}

    function decLimOrder(uint256 orderIdx, uint128 amount, uint256 deadline) external view onlySelf {}

}