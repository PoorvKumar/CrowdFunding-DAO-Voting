import React from "react";
import { Routes, Route } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { CampaignDetails, CreateCampaign, Home, Profile } from "./pages";
import { Sidebar, Navbar } from "./components";
import "./index.css"

export default function App() {
  return (
    <div className="relative sm:p-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
        </Routes>
      </div>
    </div>
  );
}
