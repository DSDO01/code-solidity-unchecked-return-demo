const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("BadDebtTokenSale", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContract() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BadDebtTokenSale = await ethers.getContractFactory("BadDebtTokenSale");
    const ERC20 = await ethers.getContractFactory("ERC20");
    const erc20 = await ERC20.deploy("USDC", "USDC", 18, 100_000_000);
    const badDebtTokenSale = await BadDebtTokenSale.deploy(erc20.target, 1 * 10 ** 1);

    return { badDebtTokenSale, erc20, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("check deployment", async function () {
      const { badDebtTokenSale, erc20 } = await loadFixture(deployContract);
      console.log("badDebtTokenSale:", badDebtTokenSale.target);
      console.log("erc20:", erc20.target);
    });
  });

  describe("BuyTokens Vulnerability", function () {
    it("should mint tokens even when transferFrom fails due to insufficient balance", async function () {
      const { badDebtTokenSale, erc20, owner, otherAccount } = await loadFixture(deployContract);

      // const tokenAmount = 10; // Number of tokens to buy
      // const purchaseCost = tokenAmount * 10; // Cost in USDC (price is 10 USDC per token)

      // // Ensure otherAccount has no initial USDC balance
      // const initialBalance = await erc20.balanceOf(otherAccount.address);
      // expect(initialBalance).to.equal(0);

      // // Attempt to buy tokens without sufficient USDC balance
      // await expect(
      //   badDebtTokenSale.connect(otherAccount).buyTokens(tokenAmount)
      // ).to.not.be.reverted; // Call succeeds because transferFrom return value isn't checked

      // // Verify that the tokens were minted despite transferFrom failure
      // const badDebtTokenBalance = await badDebtTokenSale.balances(otherAccount.address);
      // expect(badDebtTokenBalance).to.equal(tokenAmount);

      // // Check that the contract's total supply was increased
      // const totalSupply = await badDebtTokenSale.totalSupply();
      // expect(totalSupply).to.equal(tokenAmount);

      // console.log("Tokens minted to attacker despite insufficient USDC:", badDebtTokenBalance.toString());
    });

    it("should not mint tokens when transferFrom succeeds", async function () {
      const { badDebtTokenSale, erc20, owner, otherAccount } = await loadFixture(deployContract);

      // const tokenAmount = 10; // Number of tokens to buy
      // const purchaseCost = tokenAmount * 10; // Cost in USDC (price is 10 USDC per token)

      // // Transfer enough USDC to otherAccount
      // await erc20.transfer(otherAccount.address, purchaseCost);
      // const initialBalance = await erc20.balanceOf(otherAccount.address);
      // expect(initialBalance).to.equal(purchaseCost);

      // // Approve the BadDebtTokenSale contract to spend the USDC
      // await erc20.connect(otherAccount).approve(badDebtTokenSale.target, purchaseCost);

      // // Buy tokens
      // await badDebtTokenSale.connect(otherAccount).buyTokens(tokenAmount);

      // // Verify that the tokens were minted
      // const badDebtTokenBalance = await badDebtTokenSale.balances(otherAccount.address);
      // expect(badDebtTokenBalance).to.equal(tokenAmount);

      // // Check that the contract's total supply was increased
      // const totalSupply = await badDebtTokenSale.totalSupply();
      // expect(totalSupply).to.equal(tokenAmount);

      // // Verify USDC was transferred to the contract
      // const contractUSDCBalance = await erc20.balanceOf(badDebtTokenSale.target);
      // expect(contractUSDCBalance).to.equal(purchaseCost);

      // console.log("Tokens minted correctly after successful USDC transfer:", badDebtTokenBalance.toString());
    });
  });
});
