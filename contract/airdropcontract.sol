// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Import the ERC-20 interface
import "./IERC20.sol";

contract airdrops {
    // Address of the ERC-20 token contract
    address public tokenAddress;

    // Owner of this contract
    address public owner;
    uint256 public requiredAmount = 0.0003 ether;

    // Event to log successful transfers
    event TransferSuccessful(
        address indexed from,
        address indexed to,
        uint256 amount
    );

    // Modifier to ensure only the owner can execute batch transfers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // Constructor to set the token address and contract owner
    constructor() {
        //tokenAddress = _tokenAddress;
        owner = msg.sender;
    }

    // Function to withdraw Ether from the contract (only owner)
    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    //IERC20 token = IERC20(tokenAddress);
    // Function to perform batch transfers
    function airdrop(
        address _tokenAddress,
        address[] memory recipients,
        uint256 amount
    ) external payable {
        require(msg.value >= requiredAmount, "Insufficient payment");
        IERC20 token = IERC20(_tokenAddress);
        require(
            token.balanceOf(msg.sender) >= recipients.length * amount,
            "Not enough tokens"
        );

        // Loop through recipients and perform transfers
        for (uint256 i = 0; i < recipients.length; i++) {
            require(
                token.transferFrom(msg.sender, recipients[i], amount),
                "Transfer failed"
            );
            emit TransferSuccessful(msg.sender, recipients[i], amount);
        }
    }
}
