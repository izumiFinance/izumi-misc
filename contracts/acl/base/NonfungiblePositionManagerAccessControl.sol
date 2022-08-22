// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

import "../../interfaces/uniswap/INonfungiblePositionManager.sol";


contract NonfungiblePositionManagerAccessControl {

    address public safeModule;
    address public safeAddress;
    address public uniV3NFTManager;

    mapping(address=>bool) public tokenWhiteList;
    

    bytes32 internal _checkedRole;

    constructor(
        address _safeAddress,
        address _safeModule, 
        address _uniV3NFTManager
    ) {

        require(_safeAddress != address(0), "invalid safe address");
        require(_safeModule!= address(0), "invalid module address");

        safeAddress = _safeAddress;
        safeModule = _safeModule;
        uniV3NFTManager = _uniV3NFTManager;
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
    function mint(INonfungiblePositionManager.MintParams calldata params) external view onlySelf {
        require(tokenWhiteList[params.token0], "token0 is not allowed");
        require(tokenWhiteList[params.token1], "token1 is not allowed");
        require(params.recipient == safeAddress, "recipient must be safe address");

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