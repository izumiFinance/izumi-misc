// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

import "../../interfaces/iZiSwap/ILiquidityManager.sol";

contract LiquidityManagerAccessControlFree {

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

    function mint(ILiquidityManager.MintParam calldata params) external view onlySelf {}

    function decLiquidity(
        uint256 lid,
        uint128 liquidDelta,
        uint256 amountXMin,
        uint256 amountYMin,
        uint256 deadline
    ) external view onlySelf {}

    function addLiquidity(
        ILiquidityManager.AddLiquidityParam calldata addLiquidityParam
    ) external view onlySelf {}

    function collect(
        address recipient,
        uint256 lid,
        uint128 amountXLim,
        uint128 amountYLim
    ) external view onlySelf {}


    function unwrapWETH9(uint256 minAmount, address recipient) external view onlySelf {}

    function sweepToken(
        address token,
        uint256 minAmount,
        address recipient
    ) external view onlySelf {}

    function refundETH() external view onlySelf {}

    function burn(uint256 lid) external view onlySelf {}
        
}