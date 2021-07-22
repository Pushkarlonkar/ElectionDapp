pragma solidity ^0.8.4;

contract Election{
    
    struct Candidate{
        uint id;
        string name;
        uint voteCount;
    }
    
    uint public candidateCount ;
    
    mapping(uint =>Candidate) public candidates;
    
    mapping(address=>bool) public votedOrNot;
    
    constructor(){
        // code that we want to initiate
        addCandidate("Donald Trumph");
        addCandidate("Barack Obama");
        //
    }
    
    
    function addCandidate(string memory name) private {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount,name,0);
    }
    event electionUpdates(uint id,
        string name,
        uint voteCount);
        
        
        
        
    function Vote(uint _id) public {
        // we need to check if the person has not voted again 
        // valid id 
        // if(votedOrNot[msg.sender]){
            
        // }
        
        // instead of if and else we use the require keyword in solidity
        
        // check if previously voted
        require(!votedOrNot[msg.sender],"you have voted for the Election");
        
        // check if id is valid
        
        require(candidates[_id].id!=0,"the id does not exist");
        
        
        // increase the votecount and change bool value;
        
        candidates[_id].voteCount++;
        votedOrNot[msg.sender] =true; 
        
        //to push data from smart contract to the ui
        emit electionUpdates(_id,candidates[_id].name,candidates[_id].voteCount);    
        
        
    }
}