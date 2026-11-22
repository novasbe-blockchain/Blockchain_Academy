// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title  ClassRegistry
/// @notice A shared class list that lives on a blockchain.
///         Each student sends ONE transaction that writes an identifier next to
///         their wallet address. Everyone can read the list; nobody can erase it.
/// @dev    Teaching contract for Ethereum Sepolia (a TESTNET, chainId 11155111).
///         Everything written here is PUBLIC and PERMANENT. Never write personal data.
contract ClassRegistry {
    // ─── STATE: the data this contract stores on-chain ──────────────────────

    /// How many different wallets have registered so far.
    uint256 public count;

    /// The identifier each wallet registered:  wallet address → identifier.
    mapping(address => string) public idOf;

    /// Each wallet's position in the list (0 = first to register).
    mapping(address => uint256) public indexOf;

    /// Every wallet that has registered, in order of arrival.
    address[] private registrants;

    // ─── EVENT: a public announcement that apps and explorers can listen for ─

    event Registered(address indexed who, string id, uint256 index);

    // ─── WRITE: changes state, so it needs a signed transaction and costs gas ─

    /// @notice Write your identifier next to your wallet address.
    ///         Calling it again replaces your identifier; it never adds a second entry.
    /// @param  id The text to store. The course wizard sends a keccak256 HASH of the
    ///            student number, never the number itself.
    function register(string calldata id) external {
        // Rule: the identifier cannot be empty, and cannot be huge.
        require(bytes(id).length > 0 && bytes(id).length <= 100, "id must be 1-100 characters");

        // First time this wallet registers? Add it to the list and count it.
        bool isNew = bytes(idOf[msg.sender]).length == 0;
        if (isNew) {
            indexOf[msg.sender] = registrants.length;
            registrants.push(msg.sender);
            count += 1;
        }

        // msg.sender is the wallet that signed the transaction. It cannot be faked.
        idOf[msg.sender] = id;

        emit Registered(msg.sender, id, indexOf[msg.sender]);
    }

    // ─── READ: free to call, no transaction needed ──────────────────────────

    /// @notice Length of the list (always equal to `count`).
    function entriesLength() external view returns (uint256) {
        return registrants.length;
    }

    /// @notice Read one entry of the list by its position (0 = first).
    function entryAt(uint256 index) external view returns (address who, string memory id) {
        who = registrants[index];
        id = idOf[who];
    }
}
