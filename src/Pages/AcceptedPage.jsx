import classes from "./AcceptedPage.module.css";
import React, { useState } from "react";
import { ethers } from "ethers";
import SimpleStorage_abi from "../Pages/storage_abi.json";

export const AcceptedPage = () => {
  let contractAddress = "0x3039839a431ffA9f3F35Aa47bd4d4f0F575Ff88e";
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const [currentContractVal, setCurrentContractVal] = useState(null);
  const [uploadData, setuploadData] = useState([]);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const connectWalletHandler = (event) => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
    event.preventDefault();
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(
      contractAddress,
      SimpleStorage_abi,
      tempSigner
    );
    setContract(tempContract);
  };

  const setHandler = (data) => {
    data.preventDefault();
    console.log("sending " + data.target.setText.value + " to the contract");
    contract.setText(data.target.setText.value);
  };
  // const handleClick = () => {
  //   setIsOpen(() => {
  //     return !isOpen;
  //   });
  // };

  const getCurrentVal = async () => {
    let val = await contract.get();
    setCurrentContractVal(val);
  };
  return (
    <div className={classes.form1}>
      <h1 className={classes.choose}>Choose your account type</h1>
      <>
        <form className={classes.inputs}>
          <input
            type="text"
            className={classes.inputStyle}
            // placeholder="Connect Wallet"
            value={defaultAccount}
          />
          <button
            className={classes.ConnectWalletBtn}
            onClick={connectWalletHandler}
          >
            {connButtonText}
          </button>
        </form>
      </>
      <form onSubmit={setHandler}>
        {
          <input
            type="text"
            id="setText"
            className={classes.inputStyles}
            placeholder="Enter data to upload"
          />
        }

        <button className={classes.Uploaddatabtn} type="submit">
          Upload Data
        </button>
      </form>
      {currentContractVal}
      {errorMessage}
    </div>
  );
};
