// SPDX-License-Identifier: MIT
pragma solidity ^0.4.18;

contract Test12345 {
    address public owner;
    string public test;
    
    // Event emitted when test value is updated
    event ValueUpdated(string newValue, address indexed updatedBy);
    
    // Constructor to set the contract owner
    function Test12345() public {
        owner = msg.sender;
    }
    
    // Modifier to restrict access to owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    // Update the test value (only owner can call)
    function enterValue(string _c) public onlyOwner {
        require(bytes(_c).length > 0, "Value cannot be empty");
        require(bytes(_c).length <= 256, "Value too long");
        test = _c;
        emit ValueUpdated(_c, msg.sender);
    }
    
    // Transfer ownership to a new address
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
