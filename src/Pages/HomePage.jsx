import "./HomePage.css";
import image7 from "../Assets/Images/image_7.png";
import { useNavigate } from "react-router-dom";

export const HomePage = (props) => {
  const { group5, title, describeYourTaglin } = props;
  const navigate = useNavigate();
  return (
    <>
      <div className="container-center-horizontal">
        <div className="macbook-air-16 screen">
          <div className="overlap-group">
            {/* <img className="group-5" src={group5} alt="Group 5" /> */}
            <img
              className="image_7-removebg-preview-1-1"
              src={image7}
              alt="title"
            />
            {/* <div className="business">{support}</div> */}
            <h1 className="title">{title}</h1>
            <p className="describe-your-taglin">{describeYourTaglin}</p>
          </div>
          <button
            className="launch-btn"
            onClick={() => navigate("/SignInPage")}
          >
            Launch
          </button>
          <button className="signin-btn">Sign In</button>
        </div>
      </div>
    </>
  );
};
