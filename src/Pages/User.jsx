import React, { useState } from "react";
import Web3 from "web3";
import contractabi from "../Pages/storage_abi.json";

// Contract address and ABI
let contractAddress = "0xDA0a6e91DAcBCc152782A762399fc26cd2c0cFDC";

export const User = () => {
  const [textInput, setTextInput] = useState("");
  const [isPresent, setIsPresent] = useState(false);

  async function checkIfPresent(input) {
    const web3 = new Web3("HTTP://127.0.0.1:7545"); // Connect to the blockchain network
    const contract = new web3.eth.Contract(contractABI, contractAddress); // Create an instance of the smart contract
    const result = await contract.methods.isPresent(input).call(); // Call the smart contract method that checks if the input exists
    setIsPresent(result);
  }

  function handleSubmit(event) {
    event.preventDefault();
    checkIfPresent(textInput);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <button type="submit">Check</button>
      </form>
      {isPresent ? (
        <p>Input is present in the blockchain network</p>
      ) : (
        <p>Input is not present in the blockchain network</p>
      )}
    </div>
  );
};
