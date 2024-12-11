// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface for the ERC20 token (e.g., USDC)
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

contract BadDebtTokenSale {
    IERC20 public stablecoin; // Token used for purchases (e.g., USDC)
    uint256 public tokenPrice; // Price per token in stablecoins
    mapping(address => uint256) public balances; // User balances in this token
    uint256 public totalSupply; // Total supply of tokens
    address public owner; // Owner of the contract

    constructor(IERC20 _stablecoin, uint256 _tokenPrice) {
        stablecoin = _stablecoin;
        tokenPrice = _tokenPrice; // Price in stablecoin (e.g., 1 USDC = 1 Token)
        owner = msg.sender;
    }

    // Function to buy tokens
    function buyTokens(uint256 tokenAmount) external {
        uint256 cost = tokenAmount * tokenPrice;

        // // FIX: Check the return value of transferFrom
        // bool success = stablecoin.transferFrom(msg.sender, address(this), cost);
        // require(success, "Transfer failed");

        // Attempt to transfer stablecoin from the buyer to the contract
        stablecoin.transferFrom(msg.sender, address(this), cost);

        // **Unchecked behavior:**
        // Even if the transfer fails, we still mint tokens to the user
        balances[msg.sender] += tokenAmount;
        totalSupply += tokenAmount;

        // This creates "bad debt" if the transfer fails
    }

    // Allow owner to withdraw stablecoins collected
    function withdrawStablecoins() external {
        require(msg.sender == owner, "Only owner can withdraw");
        uint256 contractBalance = stablecoin.balanceOf(address(this));
        stablecoin.transfer(owner, contractBalance); // Unchecked transfer here too
    }
}
