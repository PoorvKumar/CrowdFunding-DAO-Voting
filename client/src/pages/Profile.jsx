import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context';
import { DisplayCampaigns } from '../components';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaignsCreated, setCampaignsCreated] = useState([]);
  const [campaignsDonated, setCampaignsDonated] = useState([]);

  const { address, contract, getCampaigns, getCampaignsCreatedByUser, getCampaignsDonatedByUser } = useStateContext();

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const data = await getCampaigns();

      // Filter out campaigns created by the current user
      const created = data.filter(campaign => campaign.owner === address);

      // const created = await getCampaignsCreatedByUser();
      const donated=await getCampaignsDonatedByUser();

      setCampaignsCreated(created);
      setCampaignsDonated(donated);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchCampaigns();
    }
  }, [address, contract]);

  return (
    <div className='flex flex-col gap-4 p-4'>
      <DisplayCampaigns
        title="Campaigns Created"
        votable={false}
        isLoading={isLoading}
        campaigns={campaignsCreated}
      />
      <DisplayCampaigns
        title="Campaigns Donated"
        votable={false}
        isLoading={isLoading}
        campaigns={campaignsDonated}
      />
    </div>
  );
};

export default Profile;
