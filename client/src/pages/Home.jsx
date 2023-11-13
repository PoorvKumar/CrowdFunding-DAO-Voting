import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context';
import { DisplayCampaigns } from '../components';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [openCampaigns, setOpenCampaigns] = useState([]);
  const [closedCampaigns, setClosedCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const data = await getCampaigns();

      const pending = data.filter((campaign) => campaign.isOpen && !campaign.isApproved);
      const open = data.filter((campaign) => campaign.isOpen && campaign.isApproved);
      const closed = data.filter((campaign) => !campaign.isOpen);

      setPendingCampaigns(pending);
      setOpenCampaigns(open);
      setClosedCampaigns(closed);
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
        title="Pending Requests"
        votable={true}
        isLoading={isLoading}
        campaigns={pendingCampaigns}
      />
      <DisplayCampaigns
        title="Open Campaigns"
        votable={false}
        isLoading={isLoading}
        campaigns={openCampaigns}
      />
      <DisplayCampaigns
        title="Closed Campaigns"
        votable={false}
        isLoading={isLoading}
        campaigns={closedCampaigns}
      />
    </div>
  );
};

export default Home;
