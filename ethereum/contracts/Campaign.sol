pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public{
        deployedCampaigns.push(new Campaign(minimum, msg.sender));
    }
    
    function getDeployedCampaigns() public view returns(address[]){
        return deployedCampaigns;
    }
    
}
contract Campaign {
    
    struct Request {
        string description;
        uint value;
        address recipient;
        bool completed;
        mapping(address => bool) approvals;
        uint approvalCount;
    }
    Request[] public requests;
    address public manager;
    uint public minimumContribute;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    function Campaign(uint minimum, address campaignManager) public {
        manager = campaignManager;
        minimumContribute = minimum;
        approversCount = 0;
    }
    
    function contribute() public payable {
        require(msg.value >= minimumContribute);
        if (!approvers[msg.sender]){
            approvers[msg.sender] = true;
            approversCount++;
        }
    }
    
    function createRequest(string description, uint value, address recipient) public restricted{
        Request memory req = Request({
            description: description,
            value: value,
            recipient: recipient,
            completed: false,
            approvalCount: 0
        });
        requests.push(req);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvalCount++;
        request.approvals[msg.sender] = true;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount/2));
        require(!request.completed);
        
        request.completed = true;
        request.recipient.transfer(requests[index].value);
        
    }
    
    function getContractSummary() public view returns(
        uint, uint, uint, uint, address
    ){
        return(
            minimumContribute,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns(uint){
        return requests.length;
    }
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
}