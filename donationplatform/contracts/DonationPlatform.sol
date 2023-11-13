// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DonationPlatform {
    struct CampaignData {
        address payable owner;
        string title;
        string description;
        uint256 target;
        uint256 votingEndTime;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        bool isApproved;
        bool isOpen;
        uint256 approvalCount;
        uint256 rejectCount;
        uint256 campaignId;
    }

    struct Campaign {
        CampaignData data;
        address[] donators;
        uint256[] donations;
        mapping(address => bool) hasVoted;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(address => uint256[]) public campaignsCreatedByUser;
    mapping(address => uint256[]) public campaignsDonatedByUser;

    uint256 public numberOfCampaigns = 0;
    uint256 public votingDuration = 5 minutes; // Set your desired voting duration here

    modifier onlyCampaignOwner(uint256 _id) {
        require(msg.sender == campaigns[_id].data.owner, "You are not the owner of this campaign");
        _;
    }

    function createRequest(
        address payable _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage request = campaigns[numberOfCampaigns];

        request.data.owner = _owner;
        request.data.title = _title;
        request.data.description = _description;
        request.data.target = _target;
        request.data.votingEndTime = block.timestamp + votingDuration;
        request.data.deadline = _deadline;
        request.data.amountCollected = 0;
        request.data.image = _image;
        request.data.isApproved = false;
        request.data.isOpen = true;
        request.data.campaignId = numberOfCampaigns;

        campaignsCreatedByUser[_owner].push(numberOfCampaigns);

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function voteOnCampaign(uint256 _id, bool _approval) public {
        Campaign storage campaign = campaigns[_id];

        require(campaign.data.isOpen, "This campaign is closed.");
        require(!campaign.hasVoted[msg.sender], "You have already voted on this campaign.");
        require(block.timestamp < campaign.data.votingEndTime, "Voting has ended.");

        campaign.hasVoted[msg.sender] = true;

        if (_approval) {
            campaign.data.approvalCount++;
        } else {
            campaign.data.rejectCount++;
        }

        if (block.timestamp >= campaign.data.votingEndTime) {
            // Voting period has ended
            campaign.data.isOpen = campaign.data.approvalCount > campaign.data.rejectCount;

            if (campaign.data.isOpen) {
                campaign.data.isApproved = campaign.data.approvalCount > campaign.data.rejectCount;
            }
        }
    }

    function donateToCampaign(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];

        require(block.timestamp < campaign.data.deadline, "Campaign deadline has passed.");
        require(campaign.data.isOpen, "This campaign is closed.");
        require(campaign.data.approvalCount > campaign.data.rejectCount, "This campaign has not been approved yet.");

        uint256 amount = msg.value;

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.data.owner).call{value: amount}("");

        if (sent) {
            campaign.data.amountCollected += amount;
        } else {
            // Handle transfer failure, revert the transaction or take appropriate action
            revert("Ether transfer failed.");
        }

        campaignsDonatedByUser[msg.sender].push(_id);
    }

    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaignById(uint256 _id) public view returns (CampaignData memory) {
        Campaign storage campaign = campaigns[_id];
        CampaignData memory campaignData = campaign.data; // Copy data to memory

        // Check if the voting time has ended
        if (block.timestamp >= campaignData.votingEndTime && campaignData.isOpen) {
            campaignData.isOpen = campaignData.approvalCount > campaignData.rejectCount;

            if (campaignData.isOpen) {
                campaignData.isApproved = campaignData.approvalCount > campaignData.rejectCount;
            }
        }

        // Check if the deadline has passed
        if (block.timestamp >= campaignData.deadline) {
            campaignData.isOpen = campaignData.approvalCount > campaignData.rejectCount;

            if (campaignData.isOpen) {
                campaignData.isApproved = campaignData.approvalCount > campaignData.rejectCount;
            }
        }

        return campaignData;
    }

    function getCampaigns() public view returns (CampaignData[] memory) {
        CampaignData[] memory allCampaigns = new CampaignData[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage campaign = campaigns[i];
            CampaignData memory campaignData = campaign.data; // Copy data to memory

            // Check if the voting time has ended
            if (block.timestamp >= campaignData.votingEndTime && campaignData.isOpen) {
                campaignData.isOpen = campaignData.approvalCount > campaignData.rejectCount;

                if (campaignData.isOpen) {
                    campaignData.isApproved = campaignData.approvalCount > campaignData.rejectCount;
                }
            }

            // Check if the deadline has passed
            if (block.timestamp >= campaignData.deadline) {
                campaignData.isOpen = campaignData.approvalCount > campaignData.rejectCount;

                if (campaignData.isOpen) {
                    campaignData.isApproved = campaignData.approvalCount > campaignData.rejectCount;
                }
            }

            allCampaigns[i] = campaignData;
        }

        return allCampaigns;
    }

    function getCampaignsCreatedByUser() public view returns (uint256[] memory) {
        return campaignsCreatedByUser[msg.sender];
    }

    function getCampaignsDonatedByUser() public view returns (CampaignData[] memory) {
        uint256[] storage campaignIndices = campaignsDonatedByUser[msg.sender];
        CampaignData[] memory userDonatedCampaigns = new CampaignData[](campaignIndices.length);

        for (uint256 i = 0; i < campaignIndices.length; i++) {
            userDonatedCampaigns[i] = getCampaignById(campaignIndices[i]);
        }

        return userDonatedCampaigns;
    }
}
