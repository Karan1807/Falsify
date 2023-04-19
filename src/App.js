import "./App.css";
import Scanner from "./Pages/Scanner";
import { HomePage } from "./Pages/HomePage";
import group5 from "../src/Assets/Images/group-5.png";
import { SignInPage } from "./Pages/SignInPage";
import { AcceptedPage } from "./Pages/AcceptedPage";
import { Routes, Route } from "react-router-dom";
import { WaitingPage } from "./Pages/WaitingPage";
function App() {
  const scannerData = {
    logo: "LOGO",
    title: "Scan The Qr Code here",
    about: "About",
    features: "Features",
    faq: "FAQ",
    contactUs: "ContactUs",
    login: "Login",
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              group5={group5}
              title="Check Authencity"
              describeYourTaglin="Check wether your product is original or fake in just few simple steps"
              business="Business"
              support="Support"
            />
          }
        />
        <Route path="/SignInPage" element={<SignInPage />} />
        <Route path="/Scanner" element={<Scanner {...scannerData} />} />
        <Route path="/AcceptedPage" element={<AcceptedPage />} />
        <Route path="/WaitingPage" element={<WaitingPage />} />
      </Routes>
      {/* <AcceptedPage /> */}
    </div>
  );
}

export default App;
