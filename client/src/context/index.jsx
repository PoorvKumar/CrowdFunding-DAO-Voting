import React, { useContext, createContext } from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x9bd4B01e3Aeb8B35F75D4BF779f7A05EE3dBDE80');
    const { mutateAsync: createRequest } = useContractWrite(contract, 'createRequest');
    const { mutateAsync: voteOnCampaignMutation } = useContractWrite(contract, 'voteOnCampaign');
    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
            const data = await createRequest({
                args: [
                    address, // owner
                    form.title, // title
                    form.description, // description
                    form.target,
                    new Date(form.deadline).getTime(), // deadline,
                    form.image,
                ],
            });
            // console.log(data);

            console.log("contract call success", data)
        } catch (error) {
            console.log("contract call failure", error)
        }
    }

    const parseCampaign = (campaign, index) => ({
        owner: campaign[0],
        title: campaign[1],
        description: campaign[2],
        target: ethers.utils.formatEther(campaign[3].toString()),
        votingEndTime: campaign[4].toNumber(),
        deadline: campaign[5].toNumber(),
        amountCollected: ethers.utils.formatEther(campaign[6].toString()),
        image: campaign[7],
        isApproved: campaign[8],
        isOpen: campaign[9],
        approvalCount: campaign[10].toNumber(),
        rejectCount: campaign[11].toNumber(),
        campaignId: campaign[12].toNumber(),
        pId: index
    });

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');

        // console.log(campaigns);

        // const parsedCampaings = campaigns.map((campaign, i) => ({
        //   owner: campaign.owner,
        //   title: campaign.title,
        //   description: campaign.description,
        //   target: ethers.utils.formatEther(campaign.target.toString()),
        //   deadline: campaign.deadline.toNumber(),
        //   amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        //   image: campaign.image,
        //   pId: i
        // }));

        const parsedCampaings=campaigns.map(parseCampaign);

        console.log(parsedCampaings);

        return parsedCampaings;
    }
    
    // Function to get all campaigns and filter open campaigns that are pending (not approved)
    const getPendingCampaigns = async () => {
        const allCampaigns = await contract.call('getCampaigns');
    
        const pendingCampaigns = allCampaigns
            .filter((campaign) => campaign[9] && !campaign[8])
            .map((campaign, index) => parseCampaign(campaign, index));
    
        return pendingCampaigns;
    };
    
    // Function to get all campaigns and filter open campaigns that are approved
    const getOpenCampaigns = async () => {
        const allCampaigns = await contract.call('getCampaigns');
    
        const openCampaigns = allCampaigns
            .filter((campaign) => campaign[9] && campaign[8])
            .map((campaign, index) => parseCampaign(campaign, index));
    
        return openCampaigns;
    };
    
    // Function to get all campaigns and filter closed campaigns
    const getClosedCampaigns = async () => {
        const allCampaigns = await contract.call('getCampaigns');
    
        const closedCampaigns = allCampaigns
            .filter((campaign) => !campaign[9])
            .map((campaign, index) => parseCampaign(campaign, index));
    
        return closedCampaigns;
    };

    const voteOnCampaign = async (_id, _approval) => {
        try {
            await voteOnCampaignMutation({
                args: [_id, _approval],
            });
            console.log(`Successfully voted ${_approval ? 'approve' : 'reject'}`);
        } catch (error) {
            console.error('Error voting:', error);
        }
    };
    

    return (
        <StateContext.Provider
            value={{
                address,
                connect,
                contract,
                createRequest: publishCampaign,
                getCampaigns,
                voteOnCampaign,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);