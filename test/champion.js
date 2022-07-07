const { expect } = require("chai");
const { ethers } = require("hardhat");

let testToken;
let tokenX;
let tokenY;
let owner;
let addr1;
let addr2;
let addrs;

beforeEach(async function () {
  testToken = await ethers.getContractFactory("TestToken");
  Champion = await ethers.getContractFactory("Champion");
  [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

  tokenX = await testToken.deploy("tokenX","tokenX",18);
  tokenY = await testToken.deploy("tokenY","tokenY",18);
  champion = await Champion.deploy();
});

describe("deployment", function () {
  it("Should set the right owner", async function () {
    expect(await champion.owner()).to.equal(owner.address);
  });

  it("Should owner be trusted", async function () {
    expect(await champion.isTrusted(champion.owner())).to.equal(true);
  });
});

describe("set fuctions", function() {
  it("Should set trusted account correctly", async function () {
    expect(await champion.isTrusted(addr1.address)).to.equal(false);
    await champion.addTrusted(addr1.address);
    expect(await champion.isTrusted(addr1.address)).to.equal(true);
  });

  it("Should only owner can set trusted account", async function(){
    await expect(
      champion.connect(addr1).addTrusted(addr1.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");

    await champion.addTrusted(addr1.address);

    await expect(
      champion.connect(addr1).removeTrusted(addr1.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");

    await champion.removeTrusted(addr1.address);
    expect(await champion.isTrusted(addr1.address)).to.equal(false);
  });

  it("Should only trusted account can change balance", async function(){
    await expect(
      champion.connect(addr1).setUserBalance([addr1.address], [tokenX.address], [10000])
      ).to.be.revertedWith("not trusted");

    await champion.setUserBalance([addr1.address], [tokenX.address], [10000])
    expect(await champion.balance(addr1.address, tokenX.address)).to.equal(10000)

    await expect(
      champion.connect(addr1).modityUserBalance([addr1.address], [tokenX.address], [10000], [true])
      ).to.be.revertedWith("not trusted");
    await expect(
      champion.connect(addr1).modityUserBalance([addr1.address], [tokenX.address], [10000], [false])
      ).to.be.revertedWith("not trusted");

    await champion.modityUserBalance([addr1.address], [tokenX.address], [10000],[true]);
    expect(await champion.balance(addr1.address, tokenX.address)).to.equal(20000);

    await champion.modityUserBalance([addr1.address], [tokenX.address], [10000],[false]);
    expect(await champion.balance(addr1.address, tokenX.address)).to.equal(10000);    
  });

  it("Balance should be 0 when substracting balance more than current balance", async function(){
    await champion.setUserBalance([addr1.address], [tokenX.address], [1000])
    await champion.modityUserBalance([addr1.address], [tokenX.address], [10000],[false])
    expect(await champion.balance(addr1.address, tokenX.address)).to.equal(0);
  });

  it("Should only trusted account can set provider", async function(){
    await champion.addTrusted(addr1.address);
    await expect(
      champion.connect(addr2).setProvider(tokenX.address, owner.address)
      ).to.be.revertedWith("not trusted");
    await expect(
      champion.connect(addr1).setProvider(tokenX.address, owner.address)
      ).to.not.revertedWith("not trusted");
  });
});

describe("claim function", function () {
  beforeEach(async function(){
    await champion.setProvider(tokenX.address, owner.address);
    await champion.setProvider(tokenY.address, owner.address);
    await tokenX.approve(champion.address, 100000);
    await tokenY.approve(champion.address, 100000);
    await champion.setUserBalance([addr1.address], [tokenX.address], [10000]);
  });

  it("Should claim successfully", async function(){
    await champion.connect(addr1).claim(tokenX.address, 9000);
    expect(await champion.balance(addr1.address, tokenX.address)).to.equal(1000);
    expect(await tokenX.balanceOf(addr1.address)).to.equal(9000);
  });

  it("Should claim 0 with 0 balance", async function(){
    expect(await champion.balance(addr2.address, tokenX.address)).to.equal(0);
    await champion.connect(addr2).claim(tokenX.address, 10000);
    expect(await champion.balance(addr2.address, tokenX.address)).to.equal(0);
    expect(await tokenX.balanceOf(addr2.address)).to.equal(0);
  });

  it("Should cannot claim more than balance", async function(){
    expect(await champion.balance(addr1.address, tokenX.address)).to.equal(10000);
    await champion.connect(addr1).claim(tokenX.address, 20000);
    expect(await champion.balance(addr1.address, tokenX.address)).to.equal(0);
    expect(await tokenX.balanceOf(addr1.address)).to.equal(10000);
  });

  it("Should cannot claim tokenY using tokenX balance", async function(){
    await champion.connect(addr1).claim(tokenY.address, 10000);
    expect(await champion.balance(addr1.address, tokenX.address)).to.equal(10000);
    expect(await tokenX.balanceOf(addr1.address)).to.equal(0);
    expect(await tokenY.balanceOf(addr1.address)).to.equal(0);
  });
});