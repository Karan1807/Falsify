import React, { useEffect, useState } from "react";
import classes from "./SignInPage.module.css";
import firebase from "../Components/firebase";
import { useNavigate } from "react-router-dom";
import SimpleStorage_abi from "../Pages/storage_abi.json";

// import signinbackground from "../Assets/Images/signinbackground.png";

export const SignInPage = () => {
  const [selector1, setSelector] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [fieldname, setname] = useState("");
  const [fieldemail, setemail] = useState("");
  const [fieldgstno, setgstno] = useState("");
  const [fieldlicense, setlicense] = useState("");
  const [fieldaccept, setaccept] = useState("false");
  const db = firebase.database();
  const navigate = useNavigate();
  // const acceptRef = firebase.database().ref("Manufacturer");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = {
      name: fieldname,
      email: fieldemail,
      gstno: fieldgstno,
      license: fieldlicense,
      accept: fieldaccept,
    };
    db.ref("Manufacturer").push(newData);
    navigate("/WaitingPage");
  };
  useEffect(() => {
    db.ref("Manufacturer").on("child_changed", (snapshot) => {
      const data = snapshot.val();
      console.log(data);

      if (data.accept === "true") {
        setaccept("true");
        navigate("/AcceptedPage");
      } else if (data.accept === "false") {
        setaccept("false");
        navigate("/WaitingPage");
      }
    });
  }, []);

  return (
    <>
      <div className={selector1 ? classes.form1 : classes.form1Initial}>
        <h1 className={classes.choose}>Choose your account type</h1>
        <div className={classes.selectionBox}>
          <div
            className={classes.userSelector}
            onClick={() => {
              setSelector(!selector1);
            }}
          >
            Manufacturer
          </div>
          <div
            className={classes.userSelector}
            onClick={() => {
              navigate("/Scanner");
            }}
          >
            User
          </div>
        </div>
        {selector1 && (
          <>
            <div className={classes.userMssg}>
              Please fill out the form below to get started
            </div>
            <form className={classes.inputs} onSubmit={handleSubmit}>
              <input
                type="text"
                className={classes.inputStyle}
                placeholder="Your Name"
                value={fieldname}
                onChange={(event) => setname(event.target.value)}
              />
              <input
                type="text"
                className={classes.inputStyle}
                placeholder="Email"
                value={fieldemail}
                onChange={(event) => setemail(event.target.value)}
              />
              <input
                type="text"
                className={classes.inputStyle}
                placeholder="GST Number"
                value={fieldgstno}
                onChange={(event) => setgstno(event.target.value)}
              />
              <input
                type="text"
                className={classes.inputStyle}
                placeholder="License Number"
                value={fieldlicense}
                onChange={(event) => setlicense(event.target.value)}
              />
              <input
                type="text"
                className={classes.inputStyle}
                value={fieldaccept}
                onChange={(event) => setaccept(event.target.value)}
              />
              <button className={classes.formBtn} type="submit">
                Create Account
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};
