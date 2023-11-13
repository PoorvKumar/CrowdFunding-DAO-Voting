import React from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Assuming you're using react-icons
import { tagType, thirdweb } from '../assets';
import { daysLeft } from '../utils';
import { useStateContext } from '../context';

const FundCard = ({ campaignId, owner, title, description, target, deadline, amountCollected, image, isOpen, isApproved, approvalCount, rejectCount, handleClick }) => {
  const { voteOnCampaign } = useStateContext();

  const remainingDays = isOpen ? daysLeft(deadline) : 0;

  const handleVote = async (isApprove) => {
    try {
        await voteOnCampaign(campaignId, isApprove);
        console.log(`Successfully voted ${isApprove ? 'approve' : 'reject'}`);
    } catch (error) {
        console.error('Error voting:', error);
    }
};

  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24]">
      <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px] cursor-pointer" onClick={handleClick} />

      <div className="flex flex-col p-4">
        {isOpen && !isApproved && (
          <div className="flex flex-row items-center mb-[18px]">
            <div className="flex gap-2">
              <button className="bg-green-500 text-white px-2 py-1 rounded-2xl flex justify-center items-center px-4 py-2 " onClick={() => handleVote(true)}>
                <FaThumbsUp /> ({approvalCount})
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded-2xl flex justify-center items-center px-4 py-2 " onClick={() => handleVote(false)}>
                <FaThumbsDown /> ({rejectCount})
              </button>
            </div>
          </div>
        )}

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{title}</h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">{description}</p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{amountCollected}</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Raised of {target}</p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{remainingDays}</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Days Left</p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain" />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
