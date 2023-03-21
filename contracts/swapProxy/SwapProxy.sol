//  SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IWETH {
    function deposit() external payable;
    function withdraw(uint256) external;
    function balanceOf(address) external returns (uint256);
}

interface IWrapToken {
    function depositFrom(address from, address to, uint256 amount) external returns(uint256 actualAmount);
    function withdraw(address to, uint256 amount) external returns(uint256 actualAmount);
    function balanceOf(address) external returns (uint256);
}

contract SwapProxy is Ownable {

    using SafeERC20 for IERC20;
    receive() external payable {}

    address public pancake;
    address public uniswap;

    bool public pause = false;
    modifier notPause() {
        require(!pause, "paused");
        _;
    }
    function setPause(bool value) external onlyOwner {
        pause = value;
    }

    constructor(address _pancake, address _uniswap) {
        pancake = _pancake;
        uniswap = _uniswap;
    }

    function multicall(bytes[] calldata data) external payable notPause returns (bytes[] memory results) {
        results = new bytes[](data.length);
        for (uint256 i = 0; i < data.length; i++) {
            (bool success, bytes memory result) = address(this).delegatecall(data[i]);

            if (!success) {
                // Next 5 lines from https://ethereum.stackexchange.com/a/83577
                if (result.length < 68) revert();
                assembly {
                    result := add(result, 0x04)
                }
                revert(abi.decode(result, (string)));
            }

            results[i] = result;
        }
    }

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'STE');
    }

    function depositWETH(address weth) external payable notPause {
        IWETH(weth).deposit{value: msg.value}();
    }

    function unwrapWETH(address weth, address recipient) external notPause {
        uint256 all = IWETH(weth).balanceOf(address(this));
        IWETH(weth).withdraw(all);
        safeTransferETH(recipient, all);
    }

    function refundETH() external payable notPause {
        if (address(this).balance > 0) safeTransferETH(msg.sender, address(this).balance);
    }

    function depositWrapToken(address wrapToken, uint256 value) external notPause {
        IWrapToken(wrapToken).depositFrom(msg.sender, address(this), value);
    }

    function withdrawWrapToken(address wrapToken, address recipient) external notPause {
        uint256 value = IWrapToken(wrapToken).balanceOf(address(this));
        if (value > 0) {
            IWrapToken(wrapToken).withdraw(recipient, value);
        }
    }

    function depositToken(address token, uint256 value) external notPause {
        IERC20(token).safeTransferFrom(msg.sender, address(this), value);
    }
    
    function sweepToken(
        address token,
        address recipient
    ) external notPause {
        uint256 all = IERC20(token).balanceOf(address(this));
        if (all > 0) {
            IERC20(token).safeTransfer(recipient, all);
        }
    }

    function approveToken(address token, address spender) external notPause {
        bool ok = IERC20(token).approve(spender, type(uint256).max);
        require(ok, 'approve fail');
    }

    function proxy(address targetContract, bytes calldata data, uint256 msgValue) external payable notPause returns (bytes memory res){
        require(targetContract != address(0), "TARGET IS ZERO!");
        require(targetContract == pancake || targetContract == uniswap, "TARGET ERROR");
        require(address(this).balance >= msgValue, "ETH NOT ENOUGH!");
        (bool success, bytes memory result) = targetContract.call{value: msgValue}(data);
        
        if (!success) {
            // Next 5 lines from https://ethereum.stackexchange.com/a/83577
            if (result.length < 68) revert();
            assembly {
                result := add(result, 0x04)
            }
            revert(abi.decode(result, (string)));
        }
        return result;
    }

}