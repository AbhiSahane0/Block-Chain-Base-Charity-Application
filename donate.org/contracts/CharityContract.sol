// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CharityContract{
    constructor() {}

    struct Charity {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 minAmount;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping (uint256 => Charity) public Charities;

    uint256 public numberOfCharities=0;

    function createCharity(address _owner, string memory _title, string memory _description, uint256 _target, 
    uint256 _deadline, uint256 _minAmount, string memory _image) public returns (uint256) {

        // Creating a new charity and adding it to the Charities object
        Charity storage charity = Charities[numberOfCharities];

        require(charity.deadline < block.timestamp , "The deadline must be future date : ");

        charity.owner=_owner;
        charity.title=_title;
        charity.description=_description;
        charity.deadline=_deadline;
        charity.amountCollected=0;
        charity.minAmount=_minAmount;
        charity.image=_image;
     }

    function donateToCharity(uint256 _id) public payable{
        uint256 amount = msg.value;

        Charity storage charity = Charities[_id];

        charity.donators.push(msg.sender);
        charity.donations.push(amount);

        (bool sent,) = payable(charity.owner).call{value: amount}("");

        if(sent){
            charity.amountCollected = charity.amountCollected + amount;
        }
    } 
    
    function getDonators(uint256 _id) view public returns (address[] memory , uint256[] memory) {
        return (Charities[_id].donators, Charities[_id].donations);
    }

    function getCharities() public view returns(Charity[] memory) {
        Charity[] memory allCharities = new Charity[](numberOfCharities);

        for(uint i = 0; i<numberOfCharities; i++){
            Charity storage item = Charities[i];

            allCharities[i]=item;
        }

        return allCharities;
    }

}