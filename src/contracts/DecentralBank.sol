pragma solidity ^0.8.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint256) public stakingTime;
    mapping(address => uint256) public tier;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    // staking function
    function depositTokens(uint256 _amount) public {
        // require staking amount to be greater than zero
        require(_amount > 0, "amount cannot be 0");

        // Transfer tether tokens to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        // Update Staking Balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update Staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
        stakingTime[msg.sender] = block.timestamp;
        tier[msg.sender] = 4;
        if (_amount >= 5000000000000000000) tier[msg.sender] = 3;
        if (_amount >= 10000000000000000000) tier[msg.sender] = 2;
        if (_amount >= 15000000000000000000) tier[msg.sender] = 1;
        if (_amount >= 20000000000000000000) tier[msg.sender] = 0;
    }

    // unstake tokens
    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];
        // require the amount to be greater than zero
        require(balance > 0, "staking balance cannot be less than zero");

        uint256 currTime = block.timestamp;
        uint256 stakingPeriod = 30;
        // require staking period to be over
        require(
            stakingTime[msg.sender] < currTime - stakingPeriod,
            "staking period not over"
        );

        // transfer the tokens to the specified contract address from our bank
        uint256 returnAmount;
        if (tier[msg.sender] == 3) {
            uint256 temp = 10000000000000000000 - balance;
            returnAmount = balance - temp / 100;
            tether.transfer(msg.sender, returnAmount);
        } else if (tier[msg.sender] == 2) {
            uint256 temp = 15000000000000000000 - balance;
            returnAmount = balance - temp / 100;
            tether.transfer(msg.sender, returnAmount);
        } else if (tier[msg.sender] == 1) {
            uint256 temp = 20000000000000000000 - balance;
            returnAmount = balance - temp / 100;
            tether.transfer(msg.sender, returnAmount);
        } else if (tier[msg.sender] == 0 || tier[msg.sender] == 4) {
            tether.transfer(msg.sender, balance);
        }

        // reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update Staking Status
        isStaking[msg.sender] = false;
    }

    // issue rewards
    function issueTokens() public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // issue tokens to all stakers
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            if (tier[recipient] != 4)
                rwd.transfer(recipient, 1000000000000000000);
        }
    }
}
