# Crowdfunding Donation Platform

Welcome to the Smart Contract Donation Platform (DAO) dApp! This decentralized application allows users to create, donate to, and vote on crowdfunding campaigns using blockchain technology.

## Depolyed at :
https://crowd-funding-dao.vercel.app/
- Presentation: [Donation_Platform](https://github.com/PoorvKumar/CrowdFunding-DAO-Voting/files/13350199/S20210010178_Donation_Platform.pdf)


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
![home](https://github.com/PoorvKumar/CrowdFunding-DAO-Voting/assets/55318092/77df2f2d-5211-4a31-80b9-d60d24e5e5b6)

### Create Campaign
![create-campaign](https://github.com/PoorvKumar/CrowdFunding-DAO-Voting/assets/55318092/8fef9523-a04b-40d0-88db-70e0aaa0002a)

### Campaign Details
![campaign-details](https://github.com/PoorvKumar/CrowdFunding-DAO-Voting/assets/55318092/990e4d25-2637-4a01-9578-31b219ad9122)

### Profile Page
![profile](https://github.com/PoorvKumar/CrowdFunding-DAO-Voting/assets/55318092/6737b7d7-7e67-4762-903b-f3a305a3182f)

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
