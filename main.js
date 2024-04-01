const { ethers } = require("ethers");

// Replace with the address of the BatchTransfer contract
const batchTransferContractAddress =
  "0x64a6fbC7Ff64c6feBA655494C52953fb6d67F2bE"; //"0xbA38Bc1882d765B147275795639b7f5B8A93829e";

// Replace with the private key of the account initiating the transaction
const privateKey =
  "";

// Provider and Wallet setup
const provider = new ethers.JsonRpcProvider(
  "https://goerli.infura.io/v3/api-key-here",
);
const wallet = new ethers.Wallet(privateKey, provider);

// ABI for the BatchTransfer contract (replace with your ABI)
const batchTransferABI = require("./airdropcontractABI.js");

// Replace with the addresses and amounts for the batch transfer
const recipients = require("./recipients.js");
const amounts = 100; //[100, 200, 300];

// Create a contract instance
const batchTransferContract = new ethers.Contract(
  batchTransferContractAddress,
  batchTransferABI,
  wallet,
);

// Execute the batch transfer
async function executeBatchTransfer() {
  try {
    // Call the batchTransfer function on the BatchTransfer contract
    // const tx = await batchTransferContract.batchTransfer(recipients, amounts);
    const tx = await batchTransferContract.batchTransfer(recipients, amounts, {
      gasLimit: 5000000,
    });

    // Wait for the transaction to be mined
    // await tx.wait();

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    // Access the transaction hash
    // const txHash = receipt.transactionHash;

    console.log("Batch transfer successful!  ");
    //console.log("tx - ", { txHash });

    // Log the entire receipt for debugging
    console.log("Transaction Receipt:", receipt.hash);

    //console.log("Batch transfer successful! txHash:", txHash);
  } catch (error) {
    console.error("Error executing batch transfer:", error.message);
  }
}

// Call the function to execute the batch transfer
executeBatchTransfer();
