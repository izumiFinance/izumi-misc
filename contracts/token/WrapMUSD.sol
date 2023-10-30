pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IMUSD {
    function sharesOf(address _account) external view returns (uint256);
    function getSharesByRUSDY(
        uint256 _rUSDYAmount
    ) external view returns (uint256);
    function decimals() external view returns (uint8);
    function transferFrom(
        address _sender,
        address _recipient,
        uint256 _amount
    ) external returns (bool);
    function transferShares(
        address _recipient,
        uint256 _sharesAmount
    ) external returns (uint256);
}


contract WrapMUSD is Ownable {
    string public name;
    string public symbol;
    uint8 public decimals;

    address public mUSD;

    event Approval(address indexed src, address indexed guy, uint256 val);
    event Transfer(address indexed src, address indexed dst, uint256 val);
    event Deposit(address indexed dst, uint256 val);
    event Withdrawal(address indexed src, uint256 val);

    mapping(address => uint256) public balanceOf;
    mapping(address => uint256) public sharesOf;
    mapping(address => mapping(address => uint256)) public allowance;
    uint256 public chargeShares;
    address public chargeReceiver;
    uint256 public totalSupply;

    constructor(
        string memory _name, 
        string memory _symbol, 
        address _mUSD,
        address _chargeReceiver
    ) {
        name = _name;
        symbol = _symbol;
        mUSD = _mUSD;
        chargeReceiver = _chargeReceiver;
        decimals = IMUSD(mUSD).decimals();
    }

    function getShareLocal(uint256 share, uint256 balance, uint256 val) internal pure returns(uint256 shareLocal) {
        if (val >= balance) {
            return share;
        }
        if (share == 0) {
            return 0;
        }
        uint256 remain = type(uint256).max / share;
        if (val <= remain) {
            shareLocal = share * val / balance;
        } else {
            shareLocal = share * remain / balance * val / remain;
        }
    }

    function changeChargeReceiver(address _chargeReceiver) external onlyOwner {
        chargeReceiver = _chargeReceiver;
    }

    function collectCharge() external {
        require(msg.sender == chargeReceiver, "not receiver");
        if (chargeShares > 0) {
            IMUSD(mUSD).transferShares(msg.sender, chargeShares);
            chargeShares = 0;
        }
    }

    function deposit(uint256 val) external {
        require(val > 0, "val > 0");
        uint256 beforeTotShare = IMUSD(mUSD).sharesOf(address(this));
        IMUSD(mUSD).transferFrom(msg.sender, address(this), val);
        uint256 afterTotShare = IMUSD(mUSD).sharesOf(address(this));
        uint256 shares = afterTotShare - beforeTotShare;
        require(shares > 0, "shares > 0");
        sharesOf[msg.sender] += shares;
        balanceOf[msg.sender] += val;
        totalSupply += val;
        emit Deposit(msg.sender, val);
    }

    function withdraw(uint256 val, address recipient) external {
        if (val > 0) {
            uint256 balance = balanceOf[msg.sender];
            uint256 shares = sharesOf[msg.sender];
            require(balance >= val);
            uint256 dShares = IMUSD(mUSD).getSharesByRUSDY(val);
            uint256 dSharesLocal = getShareLocal(dShares, balance, val);
            if (dShares < dSharesLocal) {
                IMUSD(mUSD).transferShares(recipient, dShares);
                chargeShares += dSharesLocal - dShares;
                shares -= dSharesLocal;
                balance -= val;
            } else {
                // impossible
                IMUSD(mUSD).transferShares(recipient, dSharesLocal);
                shares -= dSharesLocal;
                balance -= val;
            }
            if (shares == 0) {
                balance = 0;
            } else if (balance == 0) {
                chargeShares += shares;
                shares = 0;
            }
            balanceOf[msg.sender] = balance;
            sharesOf[msg.sender] = shares;
            totalSupply -= val;
        }

        emit Withdrawal(msg.sender, val);
    }


    struct Balance {
        uint256 balance;
        uint256 shares;
    }

    function _transferFrom(address src, address dst, uint256 val) internal {
        if (val > 0) {
            Balance memory balanceSrc;
            Balance memory balanceDst;
            balanceSrc.balance = balanceOf[src];
            require(balanceSrc.balance >= val, "balance");

            balanceSrc.shares = sharesOf[src];

            balanceDst.balance = balanceOf[dst];
            balanceDst.shares = sharesOf[dst];

            uint256 dShares = IMUSD(mUSD).getSharesByRUSDY(val);
            uint256 dSharesLocal = getShareLocal(balanceSrc.shares, balanceSrc.balance, val);

            if (dShares < dSharesLocal) {
                chargeShares += dSharesLocal - dShares;
                balanceSrc.shares -= dSharesLocal;
                balanceDst.shares += dShares;
                balanceSrc.balance -= val;
                balanceDst.balance += val;
            } else {
                // impossible
                balanceSrc.shares -= dSharesLocal;
                balanceDst.shares += dSharesLocal;
                balanceSrc.balance -= val;
                balanceDst.balance += val;
            }
            if (balanceSrc.shares == 0) {
                balanceSrc.balance = 0;
            } else if (balanceSrc.balance == 0) {
                chargeShares += balanceSrc.shares;
                balanceSrc.shares = 0;
            }
            balanceOf[src] = balanceSrc.shares;
            sharesOf[src] = balanceSrc.balance;
            balanceOf[dst] = balanceDst.shares;
            sharesOf[dst] = balanceDst.balance;
        }
    }
    function approve(address guy, uint256 val) external returns (bool) {
        allowance[msg.sender][guy] = val;

        emit Approval(msg.sender, guy, val);

        return true;
    }

    function transfer(address dst, uint256 val) external returns (bool) {
        return transferFrom(msg.sender, dst, val);
    }

    function transferFrom(
        address src,
        address dst,
        uint256 val
    ) public returns (bool) {
        require(balanceOf[src] >= val);

        if (src != msg.sender && allowance[src][msg.sender] != type(uint256).max) {
            require(allowance[src][msg.sender] >= val);

            unchecked {
                allowance[src][msg.sender] -= val;
            }
        }

        _transferFrom(src, dst, val);

        emit Transfer(src, dst, val);

        return true;
    }
}