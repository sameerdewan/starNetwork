pragma solidity ^0.6.0;

import '../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol';
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";


contract StarNetwork is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private generateId;

    constructor() ERC721('StarNetwork', 'STARN') public payable {
    }

    struct Star {
        string name;
        uint256 id;
    }

    mapping (uint256 => Star) public tokenId_StarInfo;
    mapping (string => Star) public tokenName_StarInfo;
    mapping (uint256 => uint256) public tokenId_Price;


    modifier isUnique(string memory name) {
        require(
            keccak256(abi.encodePacked(tokenName_StarInfo[name].name)) != keccak256(abi.encodePacked(name)),
            "Error: Someone already owns this star."
        );
        _;
    }

    modifier onlyOwnerOf(uint256 tokenId) {
        require(
            msg.sender == ownerOf(tokenId),
            'Error: Only the owner of this star can list it for sale.'
        );
        _;
    }

    modifier isUpForBarter(uint256 tokenId) {
        require(
            tokenId_Price[tokenId] > 0,
            'Error: This star is not for sale or trade.'
        );
        _;
    }

    modifier hasEnoughFunds(uint256 tokenId) {
        require(
            msg.value > tokenId_Price[tokenId],
            'Error: Insufficient funds provided to purchase star.'
        );
        _;
    }

    modifier notSameOwner(uint256 senderToken, uint256 tradedToken) {
        require(
            msg.sender != ownerOf(tradedToken),
            'Error: You cannot trade stars with yourself.'
        );
        _;
    }

    function makePayable(address provided)
        internal pure returns (address payable seller) {
            uint160 formattedProvided = uint160(provided);
            seller = address(formattedProvided);
    }

    function approveTransaction(address buyer, uint256 tokenId)
        internal {
            this.approve(buyer, tokenId);
    }

    function createStar(string memory name)
        public isUnique(name) {
            generateId.increment();
            uint256 tokenId = generateId.current();
            Star memory createdStar = Star(name, tokenId);
            tokenId_StarInfo[tokenId] = createdStar;
            tokenName_StarInfo[name] = createdStar;
            _mint(msg.sender, tokenId);
            setApprovalForAll(address(this), true);
    }

    function lookupStarById(uint256 tokenId)
        public view returns (string memory name, bool forSale,  uint256 price, address owner) {
            name = tokenId_StarInfo[tokenId].name;
            forSale = tokenId_Price[tokenId] > 0;
            price = tokenId_Price[tokenId];
            owner = ownerOf(tokenId);
    }

    function lookupStarByName(string memory name)
        public view returns (uint256 tokenId, bool forSale, uint256 price, address owner) {
            tokenId = tokenName_StarInfo[name].id;
            forSale = tokenId_Price[tokenId] > 0;
            price = tokenId_Price[tokenId];
            owner = ownerOf(tokenId);
    }

    function listStarForBarter(uint256 tokenId, uint256 price)
        public onlyOwnerOf(tokenId) {
            tokenId_Price[tokenId] = price;
    }

    function buyStar(uint256 tokenId)
        public isUpForBarter(tokenId) hasEnoughFunds(tokenId) payable {
            uint256 starCost = tokenId_Price[tokenId];
            address ownerAddress = ownerOf(tokenId);
            address payable ownerAddressPayable = makePayable(ownerAddress);
            approveTransaction(msg.sender, tokenId);
            _transfer(ownerAddress, msg.sender, tokenId);
            setApprovalForAll(address(this), true);
            ownerAddressPayable.transfer(starCost);
            if (msg.value > starCost) {
                msg.sender.transfer(msg.value - starCost);
            }
            listStarForBarter(tokenId, 0);
    }

    function exchangeStar(uint256 senderToken, uint256 tradedToken) public
        onlyOwnerOf(senderToken) isUpForBarter(tradedToken) notSameOwner(senderToken, tradedToken) {
            address tradedTokenOwner = ownerOf(tradedToken);
            approveTransaction(msg.sender, tradedToken);
            _transfer(tradedTokenOwner, msg.sender, tradedToken);
            approveTransaction(tradedTokenOwner, senderToken);
            _transfer(msg.sender, tradedTokenOwner, senderToken);
    }

    function transferStar(address to, uint256 tokenId) public
        onlyOwnerOf(tokenId) {
            transferFrom(msg.sender, to, tokenId);
    }
}