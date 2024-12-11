// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC20 {
    // Token details
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    // Mapping of balances and allowances
    mapping(address => uint256) private balances;
    mapping(address => mapping(address => uint256)) private allowances;

    // Events as per ERC20 standard
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    // Constructor to initialize token details and mint initial supply
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _initialSupply
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _initialSupply * 10 ** _decimals;
        balances[msg.sender] = totalSupply;

        emit Transfer(address(0), msg.sender, totalSupply); // Emit Transfer from zero address
    }

    // Returns the balance of a given account
    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    // Transfers tokens to a specified address
    function transfer(address to, uint256 amount) public returns (bool) {
        require(to != address(0), "Transfer to zero address not allowed");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);
        return true;
    }

    // Approves a spender to spend a certain amount on behalf of the owner
    function approve(address spender, uint256 amount) public returns (bool) {
        require(spender != address(0), "Approve to zero address not allowed");

        allowances[msg.sender][spender] = amount;

        emit Approval(msg.sender, spender, amount);
        return true;
    }

    // Returns the remaining allowance for a spender
    function allowance(
        address owner,
        address spender
    ) public view returns (uint256) {
        return allowances[owner][spender];
    }

    // Transfers tokens from one address to another on behalf of the owner
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public returns (bool) {
        require(from != address(0), "Transfer from zero address not allowed");
        require(to != address(0), "Transfer to zero address not allowed");
        require(balances[from] >= amount, "Insufficient balance");
        require(allowances[from][msg.sender] >= amount, "Allowance exceeded");

        balances[from] -= amount;
        balances[to] += amount;
        allowances[from][msg.sender] -= amount;

        emit Transfer(from, to, amount);
        return true;
    }

    // Mints new tokens (can only be done by the owner in a real-world scenario)
    function mint(address to, uint256 amount) public {
        require(to != address(0), "Mint to zero address not allowed");

        uint256 mintAmount = amount * 10 ** decimals;
        totalSupply += mintAmount;
        balances[to] += mintAmount;

        emit Transfer(address(0), to, mintAmount);
    }

    // Burns tokens from the caller's account
    function burn(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance to burn");

        uint256 burnAmount = amount * 10 ** decimals;
        totalSupply -= burnAmount;
        balances[msg.sender] -= burnAmount;

        emit Transfer(msg.sender, address(0), burnAmount);
    }
}
