# Crowdfunding Donation Platform

Welcome to the Smart Contract Donation Platform (DAO) dApp! This decentralized application allows users to create, donate to, and vote on crowdfunding campaigns using blockchain technology.

## Features

- Connect your **MetaMask** wallet to the dApp.
- **Vote** on pending campaign requests.
- View **open campaigns** available for donation.
- Explore **closed campaigns**.
- **Create and manage** crowdfunding campaigns.
- View campaign details, including donators and their donations.
- View campaigns created by the connected user.

## Tech Stack

- **Smart Contracts:** Solidity, Hardhat, Remix for testing
- **Frontend:** React, Vite, Tailwind CSS
- **Blockchain Interaction:** ThirdWeb SDK, ethers.js
- **Wallet Integration:** MetaMask
- **Node.js:** Backend for smart contract deployment
- **Package Manager:** Yarn

## Screenshots

### Home Page
![home](https://github.com/PoorvKumar/CrowdFunding-DAO-Voting/assets/55318092/f8638e2a-6c62-40ab-b6d3-f31ba09c6c5b)

### Create Campaign
![create-campaign](https://github.com/PoorvKumar/CrowdFunding-DAO-Voting/assets/55318092/1c8e2930-8d31-4828-8893-7545ab74ce07)

### Campaign Details
![campaign-details](https://github.com/PoorvKumar/CrowdFunding-DAO-Voting/assets/55318092/0327749f-de42-4fdc-a3be-6a3900938e03)

### Profile Page
![profile](https://github.com/PoorvKumar/CrowdFunding-DAO-Voting/assets/55318092/3bbd548a-d128-42f2-ac3b-cba1be69f02e)

## Getting Started

To get started with this project, you will need to have the following installed:

* Node.js
* Yarn
* MetaMask

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd client // to change to client directory
   cd donationplatform // to change to smart contract directory
   ```

2. **Install Dependencies:**
  ```
  yarn install
  ```

3. **Start the development server:**
   In the 'client' directory:
  ```
  npm run dev
  ```

4. **Connect Metamask:**
   - Connect your MetaMask wallet to interact with the dApp.

## Environment Variables

### Smart Contract

In the `donationplatform` directory, you'll need to create a `.env` file with the following variables:

- `PRIVATE_KEY`: The private key for the Ethereum account deploying the smart contract.

Example `.env` file:

```
PRIVATE_KEY=your_private_key
```

### Client Side

In the `client` directory, you'll need to create a `.env` file with the following variables:

- `VITE_CLIENT_ID`: The client id of your thirdweb API.
- `VITE_SECRET_KEY`: The secret key of your thirdweb API.

Example `.env` file:

```
VITE_CLIENT_ID=your_client_id
VITE_SECRET_KEY=your_secret_key
```

## Deployment

To deploy the dApp to a production environment, you will need to deploy the smart contract to a blockchain network and then update the frontend code to point to the deployed contract address.
Run the below command in the 'donationplatform' directory:
```
yarn run deploy
```

## Contributing

If you would like to contribute to this project, please create a pull request.

## License

This project is licensed under the MIT license.
