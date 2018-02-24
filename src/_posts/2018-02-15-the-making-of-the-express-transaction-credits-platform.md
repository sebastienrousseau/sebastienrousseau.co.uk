---
layout: post
title: The making of the Express Transaction Credits Platform - EXTC
description: Building a comprehensive framework of the next generation of ERC-223 compliant tokens
lang: en_GB
image: /assets/images/rawpixel-com-369782-640.jpg
categories: []
author: Sebastien Rousseau
tags:
- blockchain
- credits
- cryptocurrencies
- distributed
- eip
- erc20
- erc223
- ethereum
- extc
- extc-network
- extc-token
- faster 
- financial
- ganache
- metamask
- payment 
- ropsten
- services
- smart-contracts
- solidity
- standard
- test
- token
- tokens
- transaction
- transfer
- truffle
status: publish
type: post
published: true
meta: {blockchain,credits,cryptocurrencies,distributed,eip,erc20,erc223,ethereum,extc,extc-network,extctoken,faster,financial,ganache,metamask,payment,ropsten,services,smart-contracts,solidity,standard,test,token,tokens,transaction,transfer,truffle}
---

**Building a comprehensive framework of the next generation of ERC-223 compliant tokens**<!--more-->

<img
      sizes="(max-width: 1920px) 100vw, 1920px"
      srcset="
        assets/images/rawpixel-com-369782-320.jpg 320w,
        assets/images/rawpixel-com-369782-480.jpg 480w,
        assets/images/rawpixel-com-369782-576.jpg 576w,
        assets/images/rawpixel-com-369782-640.jpg 640w,
        assets/images/rawpixel-com-369782-720.jpg 720w,
        assets/images/rawpixel-com-369782-768.jpg 768w,
        assets/images/rawpixel-com-369782-800.jpg 800w,
        assets/images/rawpixel-com-369782-960.jpg 960w,
        assets/images/rawpixel-com-369782-1024.jpg 1024w,
        assets/images/rawpixel-com-369782-1200.jpg 1200w,
        assets/images/rawpixel-com-369782-1280.jpg 1280w,
        assets/images/rawpixel-com-369782-1366.jpg 1366w,assets/images/rawpixel-com-369782-1440.jpg 1440w,
        assets/images/rawpixel-com-369782-1536.jpg 1536w,
        assets/images/rawpixel-com-369782-1600.jpg 1600w,
        assets/images/rawpixel-com-369782-1920.jpg 1920w"
      src="assets/images/rawpixel-com-369782-1920.jpg"
  alt="The ERC-223 Token Standard Banner" />


##  Abstract

In this article, we'll be looking at building our decentralised exchange structured around the **[ERC223](https://github.com/Dexaran/ERC223-token-standard)** standard - a superset of the ERC20 token standard compliant with the proposed **ERC223 EIP** standard interfaces for Tokens and APIs within smart contracts and part of the **[Ethereum](https://www.ethereum.org/)** blockchain technology stack.

## Basics

The name we have chosen for our token is **[EXTC (Express Transaction Credits)](/2018/02/04/future-faster-payment-solutions/)** with a vision to achieve a brand new suite of financial services facilitating and guaranteeing instant loans, lighting-fast payments and swifter deposits between participants.

Let's get started on the premise that:

* EXTC is an Ethereum based ERC223 and ERC223 EIP compliant token/smart-contract

* The  Express Transaction Credits services will support traditional fiat currencies, cryptocurrencies and compliant tokens through a set of smart contracts

* The smart contracts are written in **[Solidity](https://solidity.readthedocs.io/en/develop/)**

* We will use **[Truffle](http://truffleframework.com/)** - a framework for creating smart contracts and decentralised applications - to test and deploy

* We will use **[Ganache](http://truffleframework.com/ganache/)** as the development environment, testing framework and asset pipeline, part of the Truffle suite of Ethereum development tools.

* **[Metamask](https://metamask.io/)** to make transactions on Ethereum through **[Chrome](https://www.google.co.uk/chrome)** on the **[Ropsten](https://ropsten.etherscan.io/)** Testnet Ethereum BlockChain Explorer and Search


## Requirements

* [NodeJS](https://nodejs.org/en/) 6.11.5+ recommended
* [Yarn](https://yarnpkg.com/en/) 1.3.2+ recommended
* Mac OS X, Linux or Windows

## Installation

```bash
# Install the Truffle package globally
$ npm install -g truffle
```

```bash
# Install local node dependencies, using the npm command:
$ npm install
```
or

```bash
# Install local node dependencies, using the yarn command:
$ yarn
```

### Initialising the Token

The first step is to create a token contract file.

```bash
touch contracts/ExtcToken.sol
```

### Defining the Token parameters

To create an ERC223 contract, you will also need to define the following values:

* The Token’s Name
* The Token’s Symbol
* The Token’s Decimal Places
* The Number of Tokens in Circulation

This will result to a similar declaration:

```bash
	string public name    = “Token”;
 	string public symbol  = “EXTC”;
 	uint8 public decimals = 18;
 	uint256 public totalSupply;
```

The following describes the standard functions and methods of the Express Transaction Credits contract. 

* **name** of the token (e.g Express Transaction Credits) -typically a string

```bash
  // Function to access name of token .
  function name() constant returns (string _name) {
      return name;
  }
```

* **symbol** of the token (EXTC) - represented as an uint8

```bash
  // Function to access symbol of token .
  function symbol() constant returns (string _symbol) {
      return symbol;
  }
```

* **decimals** the decimal values of the token - a unassigned Integer representing the number of digits that come after the decimal place. (e.g 18) 

```bash
// Function to access decimals of token .
  function decimals() constant returns (uint8 _decimals) {
      return decimals;
  }
```

* **totalSupply** of the token equals the sum of all balances

```bash
  // Function to access total supply of tokens .
  function totalSupply() constant returns (uint256 _totalSupply) {
      return totalSupply;
  }
```

* **balanceOf** Returns the account balance of another account with address _owner

```bash
function balanceOf(address _owner) constant returns (uint256 balance)
```

* **transfer(address, uint)** Transfer the specified amount of tokens to the specified address. Needed due to backwards compatibility reasons with ERC20.

```bash
function transfer(address _to, uint _value) returns (bool)
```

* **transfer(address, uint, bytes)** Transfer the specified amount of tokens to the specified address.

```bash
function transfer(address _to, uint _value, bytes _data) returns (bool)
```
       
###  Standard ERC-223 token functions

EXTC tokens by design are moving towards the Ethereum’s Improvement Proposal 223 (ERC223 EIP) Standard for ERC223 token and the standard API for tokens within smart contracts. 

* **contract ExtcToken is ERC223Interface** - Reference implementation of the ERC223 EXTC token


* **function ExtcToken** - Assigns the totalSupply to the contract. 

* **function balanceOf(address _owner)** Gets the balance of the specified address. Returns an uint256 representing the amount owned by the passed address.

* **function allowance(address _owner, address _spender)** - displays the amount of remaining tokens allowed to spent

