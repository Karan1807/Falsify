import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import Web3 from "web3";
import Contractabi from "../Pages/storage_abi.json";
import "./User.css";
const contractAddress = "0x3039839a431ffA9f3F35Aa47bd4d4f0F575Ff88e";

function Scanner(props) {
  const { title } = props;

  const [textInput, setTextInput] = useState("");
  const [isPresent, setIsPresent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [qrData, setQrData] = useState([]);

  const qrHandler = (data) => {
    if (data !== null) {
      setQrData(() => {
        return [data];
      });
    }

    console.log(qrData);
    console.log("1");
  };
  const handleClick = () => {
    setIsOpen(() => {
      return !isOpen;
    });
  };

  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await checkIfPresent(input);
  };
  const checkIfPresent = async (input) => {
    const web3 = new Web3("HTTP://127.0.0.1:7545"); // Connect to the blockchain network
    const contract = new web3.eth.Contract(Contractabi, contractAddress); // Create an instance of the smart contract
    const result = await contract.methods.isPresent(input).call(); // Call the smart contract method that checks if the input exists
    if (result) {
      console.log(`${input} exists in the blockchain network`);
    } else {
      console.log(`${input} does not exist in the blockchain network`);
    }
  };

  return (
    <div className="container-center-horizontal">
      <div className="scanner screen">
        w
        <div className="flex-col">
          <h1 className="title">{title}</h1>
        </div>
        <div className="qr_image">
          <div className="overlap-group">
            {isOpen ? (
              <div className="scanner-1">
                <QrReader
                  onScan={qrHandler}
                  style={{ width: "554px", heigth: "397px" }}
                />
                <button onClick={handleClick}>Close</button>
              </div>
            ) : (
              <img
                className="scanner-1"
                src={require("../Assets/Images/scannerimg.jpg")}
                alt="scanner 1"
                onClick={handleClick}
              />
            )}

            <form onSubmit={{ handleSubmit }}>
              {qrData.map((data) => {
                return <input id="setText" type="text" value={data.text} />;
              })}
            </form>

            <form onSubmit={handleSubmit}>
              <div>
                <input
                  id="setText"
                  type="text"
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div>
                <button type={"submit"}> Check Authenticity </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       Enter Text:
    //       <input
    //         type="text"
    //         value={input}
    //         onChange={(e) => setInput(e.target.value)}
    //       />
    //     </label>
    //     <button type="submit">Check</button>
    //   </form>
    // </div>
  );
}

export default Scanner;
