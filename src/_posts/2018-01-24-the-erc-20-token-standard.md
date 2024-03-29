---
layout: post
title: 'The ERC-20 Token Standard'
description: "An Ethereum's standard interface for tokens"
lang: en_GB
image: /assets/images/hand-2722107-640.jpg
categories: []
author: 'Sebastien Rousseau'
tags:
- ethereum
- erc20
- eip
- tokens
- contracts
- blockchain
- cryptocurrencies
- smart-token
- solidity
status: publish
type: post
published: true
meta: {ethereum, erc20, eip, tokens, contracts, blockchain, cryptocurrencies, smart-token, solidity}
---

**A review of the token application-level standards and conventions within the Ethereum platform**<!--more-->

<img
      sizes="(max-width: 1920px) 100vw, 1920px"
      srcset="
        assets/images/hand-2722107-320.jpg 320w,
        assets/images/hand-2722107-480.jpg 480w,
        assets/images/hand-2722107-576.jpg 576w,
        assets/images/hand-2722107-640.jpg 640w,
        assets/images/hand-2722107-720.jpg 720w,
        assets/images/hand-2722107-768.jpg 768w,
        assets/images/hand-2722107-800.jpg 800w,
        assets/images/hand-2722107-960.jpg 960w,
        assets/images/hand-2722107-1024.jpg 1024w,
        assets/images/hand-2722107-1200.jpg 1200w,
        assets/images/hand-2722107-1280.jpg 1280w,
        assets/images/hand-2722107-1366.jpg 1366w,assets/images/hand-2722107-1440.jpg 1440w,
        assets/images/hand-2722107-1536.jpg 1536w,
        assets/images/hand-2722107-1600.jpg 1600w,
        assets/images/hand-2722107-1920.jpg 1920w"
      src="assets/images/hand-2722107-1920.jpg"
  alt="The ERC-20 Token Standard Banner" />

As part of the environments prerequisites mentioned in the previous <a href="/2018/01/09/understanding-the-technology-behind-blockchain/">article</a>, we have now installed key tools and utilities that aim to facilitate and enforce strong security measures, coding best practices and community approved standards. 

The most popular standards adopted in the creation of an Ethereum-based currency are directly driven from the [Ethereum Improvement Proposal (EIP)](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md), in our case we are focussing today on the token standards (ERC20). 

The Ethereum Request for Comments (ERC) are technical specifications that constitute a common list of proposals and rules, application-level standards and conventions, including contract standards such as token standards that a smart-token has to implement for the benefit of consistency, consensus, easier interactions and overall simplicity. 

These include a list of common methods and events providing basic functionality as described below:

### Methods

1) **name** - Returns the name of the token.
```
function name() constant returns (string name)
```

2) **symbol** - Returns the symbol of the token.
```
function symbol() constant returns (string symbol)
```

3) **decimals** - Returns the number of decimals the token uses.
```
function decimals() constant returns (uint8 decimals)
```

4) **totalSupply** - Returns the total token supply.
```
function totalSupply() constant returns (uint256 totalSupply)
```

5) **balanceOf** - Returns the account balance of another account with address `_owner`.
```
function balanceOf(address _owner) constant returns (uint256 balance)
```

6) **transfer** - Transfer the balance from owner’s account to another account
```
function transfer(address _to, uint256 _value) returns (bool success)
```

7) **transferFrom** - Send `tokens` amount of tokens from address `from` to address `to`
```
function transferFrom(address _from, address _to, uint256 _value) returns (bool success)
```

8) **approve** - Allow `spender` to withdraw from your account, multiple times, up to the `tokens` amount.
```
function approve(address _spender, uint256 _value) returns (bool success)
```

9) **allowance** - Returns the amount which `_spender` is still allowed to withdraw from `_owner`.
```
function allowance(address _owner, address _spender) constant returns (uint256 remaining)
```

### Events

1) **Transfer** - Triggered when tokens are transferred.
```
event Transfer(address indexed _from, address indexed _to, uint256 _value)
```

2) **Approval** - Triggered whenever `approve(address _spender, uint256 _value)` is called.
```
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

ERC-20 provides a great starting point to build token contracts and these are written using [Solidity](https://solidity.readthedocs.io/en/develop/).

```
pragma solidity ^0.4.16;

interface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData) public; }

contract TokenERC20 {
    // Public variables of the token
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    // 18 decimals is the strongly suggested default, avoid changing it
    uint256 public totalSupply;

    // This creates an array with all balances
    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;

    // This generates a public event on the blockchain that will notify clients
    event Transfer(address indexed from, address indexed to, uint256 value);

    // This notifies clients about the amount burnt
    event Burn(address indexed from, uint256 value);

    /**
     * Constrctor function
     *
     * Initializes contract with initial supply tokens to the creator of the contract
     */
    function TokenERC20(
        uint256 initialSupply,
        string tokenName,
        string tokenSymbol
    ) public {
        totalSupply = initialSupply * 10 ** uint256(decimals);  // Update total supply with the decimal amount
        balanceOf[msg.sender] = totalSupply;                // Give the creator all initial tokens
        name = tokenName;                                   // Set the name for display purposes
        symbol = tokenSymbol;                               // Set the symbol for display purposes
    }

    /**
     * Internal transfer, only can be called by this contract
     */
    function _transfer(address _from, address _to, uint _value) internal {
        // Prevent transfer to 0x0 address. Use burn() instead
        require(_to != 0x0);
        // Check if the sender has enough
        require(balanceOf[_from] >= _value);
        // Check for overflows
        require(balanceOf[_to] + _value > balanceOf[_to]);
        // Save this for an assertion in the future
        uint previousBalances = balanceOf[_from] + balanceOf[_to];
        // Subtract from the sender
        balanceOf[_from] -= _value;
        // Add the same to the recipient
        balanceOf[_to] += _value;
        Transfer(_from, _to, _value);
        // Asserts are used to use static analysis to find bugs in your code. They should never fail
        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);
    }

    /**
     * Transfer tokens
     *
     * Send `_value` tokens to `_to` from your account
     *
     * @param _to The address of the recipient
     * @param _value the amount to send
     */
    function transfer(address _to, uint256 _value) public {
        _transfer(msg.sender, _to, _value);
    }

    /**
     * Transfer tokens from other address
     *
     * Send `_value` tokens to `_to` in behalf of `_from`
     *
     * @param _from The address of the sender
     * @param _to The address of the recipient
     * @param _value the amount to send
     */
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= allowance[_from][msg.sender]);     // Check allowance
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }

    /**
     * Set allowance for other address
     *
     * Allows `_spender` to spend no more than `_value` tokens in your behalf
     *
     * @param _spender The address authorized to spend
     * @param _value the max amount they can spend
     */
    function approve(address _spender, uint256 _value) public
        returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        return true;
    }

    /**
     * Set allowance for other address and notify
     *
     * Allows `_spender` to spend no more than `_value` tokens in your behalf, and then ping the contract about it
     *
     * @param _spender The address authorized to spend
     * @param _value the max amount they can spend
     * @param _extraData some extra information to send to the approved contract
     */
    function approveAndCall(address _spender, uint256 _value, bytes _extraData)
        public
        returns (bool success) {
        tokenRecipient spender = tokenRecipient(_spender);
        if (approve(_spender, _value)) {
            spender.receiveApproval(msg.sender, _value, this, _extraData);
            return true;
        }
    }

    /**
     * Destroy tokens
     *
     * Remove `_value` tokens from the system irreversibly
     *
     * @param _value the amount of money to burn
     */
    function burn(uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);   // Check if the sender has enough
        balanceOf[msg.sender] -= _value;            // Subtract from the sender
        totalSupply -= _value;                      // Updates totalSupply
        Burn(msg.sender, _value);
        return true;
    }

    /**
     * Destroy tokens from other account
     *
     * Remove `_value` tokens from the system irreversibly on behalf of `_from`.
     *
     * @param _from the address of the sender
     * @param _value the amount of money to burn
     */
    function burnFrom(address _from, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value);                // Check if the targeted balance is enough
        require(_value <= allowance[_from][msg.sender]);    // Check allowance
        balanceOf[_from] -= _value;                         // Subtract from the targeted balance
        allowance[_from][msg.sender] -= _value;             // Subtract from the sender's allowance
        totalSupply -= _value;                              // Update totalSupply
        Burn(_from, _value);
        return true;
    }
}

```
