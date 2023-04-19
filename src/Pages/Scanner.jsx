import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import Web3 from "web3";
import Contractabi from "../Pages/storage_abi.json";
import "./Scanner.css";
const contractAddress = "0x3039839a431ffA9f3F35Aa47bd4d4f0F575Ff88e";

function Scanner(props) {
  const { title } = props;

  const [textInput, setTextInput] = useState("");
  const [isPresent, setIsPresent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [qrData, setQrData] = useState([]);
  const [result, setResult] = useState();
  const [isSubmitted, setisSubmitted] = useState(false);

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
    setisSubmitted(true);
    await checkIfPresent(input);
  };
  const checkIfPresent = async (input) => {
    const web3 = new Web3("HTTP://127.0.0.1:7545"); // Connect to the blockchain network
    const contract = new web3.eth.Contract(Contractabi, contractAddress); // Create an instance of the smart contract
    const result = await contract.methods.isPresent(input).call(); // Call the smart contract method that checks if the input exists
    setResult(result);
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
                <button onClick={handleClick}>Close btn</button>
              </div>
            ) : (
              <img
                className="scanner-1"
                src={require("../Assets/Images/scanner_img.png")}
                alt="scanner 1"
                onClick={handleClick}
              />
            )}

            <form onSubmit={{ handleSubmit }}>
              {qrData.map((data) => {
                return (
                  <input
                    style={{
                      transform: "translate(100px, 300px)",
                      boxSizing: "border-box",
                      color: "#fff",
                      position: "absolute",
                      width: "427px",
                      height: "69px",
                      left: "0px",
                      top: "0px",
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "large",
                      background: "transparent",
                      border: "1.23214px solid #d8dadc",
                      borderRadius: "12.3214px",
                    }}
                    id="setText"
                    type="text"
                    value={data.text}
                  />
                );
              })}
            </form>

            <form onSubmit={handleSubmit}>
              <div>
                <button
                  style={{
                    transform: "translate(100px, -50px)",
                    position: "absolute",
                    height: "53px",
                    width: "250px",
                    background:
                      "linear-gradient(91.97deg, #06fff0 4.03%, #0025ce 102.82%)",
                    borderRadius: "13.8125px",
                    color: "#fff",
                    border: "none",
                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                    fontSize: "1.25rem",
                  }}
                  type={"submit"}
                >
                  {" "}
                  Check Authenticity{" "}
                </button>
              </div>
            </form>
            {isSubmitted && (
              <>
                <div>
                  <h1 style={{ color: "white" }}>
                    {result
                      ? "This Product Is Original and Verified By Falsify"
                      : "This Product Is Not Original and Verified By Falsify"}
                  </h1>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scanner;
