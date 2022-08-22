// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.4;

import "../../interfaces/iZiSwap/ILimitOrderManager.sol";

contract BscLimitOrderManagerAccessControl {

    address public safeAddress;
    address public safeModule;

    bytes32 private _checkedRole;

    mapping(address => bool) public tokenWhiteList;

    constructor(address _safeAddress, address _safeModule) {
        require(_safeAddress != address(0), "invalid safe address");
        require(_safeModule!= address(0), "invalid module address");
        safeAddress = _safeAddress;
        safeModule = _safeModule;
        // wbnb
        tokenWhiteList[0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c] = true;
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

    function check(bytes32 _role, bytes calldata data) external onlyModule returns (bool) {
        _checkedRole = _role;
        (bool success,) = address(this).staticcall(data);
        return success;
    }

    fallback() external {
        revert("Unauthorized access");
    }

    // ACL methods


    function newLimOrder(uint256 idx, ILimitOrderManager.AddLimOrderParam calldata addLimitOrderParam) external view onlySelf {
        // use 'require' to check the access
        require(tokenWhiteList[addLimitOrderParam.tokenX], "TokenX is not allowed");
        require(tokenWhiteList[addLimitOrderParam.tokenY], "TokenY is not allowed");
    }


    function collectLimOrder(address recipient, uint256 orderIdx, uint128 collectDec, uint128 collectEarn) external view onlySelf {
        // use 'require' to check the access
        require(recipient == safeAddress, "Recipient is not allowed");
    }


    function decLimOrder(uint256 orderIdx, uint128 amount, uint256 deadline) external view onlySelf {
        // use 'require' to check the access
    }
}