import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import CreditsPage from "./pages/CreditPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ContactFormPage from "./pages/ContactFormPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Home from "./pages/Home";
import Calendar from "./pages/CalendarPage";
import TodoPage from "./pages/TodoPage";
import Time from "./pages/TimePage";
import TimeTracking from "./pages/TimeTrackingPage";
import SettingsPage from "./pages/SettingsPage";
import { Routes, Route } from "react-router-dom";
import ProfileContext from "./services/ProfileContext";
import { useState, useEffect } from "react";
import { appHeaderApi } from "./services/api";
import { ProfileImages } from "./assets/ProfileImages";
import { homeApi } from "./services/api";
import { backgrounds } from "./assets/BackgroundImages";

function App() {
    const [iconImgSrc, setIconImgSrc] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [bgSrc, setBgSrc] = useState<string>("");
    const [bgColor, setBgColor] = useState<string>("");

    function changeIconImgSrc(filename : string) {
      setIconImgSrc(filename);
    }

    function changeUsername(username : string) {
      setUsername(username);
    }

    function changeEmail(email : string) {
      setEmail(email);
    }

    function changeBgSrc(bgSrc : string) {
      setBgSrc(bgSrc);
    }

    function changeBgColor(bgColor : string) {
      setBgColor(bgColor);
    }
    
    
    const profileCtxValue = {
      iconImgSrc: iconImgSrc,
      username : username,
      email : email,
      bgSrc : bgSrc,
      bgColor : bgColor,
      changeIconImgSrc: changeIconImgSrc,
      changeUsername: changeUsername,
      changeEmail: changeEmail,
      changeBgSrc : changeBgSrc,
      changeBgColor : changeBgColor
    };


     useEffect(() => {
        const get = async () => {
          const data = await appHeaderApi.get();
          const selectedImg = ProfileImages.find(
            (img) => img.name == data.profileImgName
          );
          if (selectedImg) {
            setIconImgSrc(selectedImg.src);
          }
          if (data.username) {
            setUsername(data.username);
          }
          if (data.email) {
            setEmail(data.email);
          }
        };
        get();

        const fetchBg = async () => {
          const data = await homeApi.get();
          
          const selectedBg = backgrounds.find(
              (bg) => bg.name == data.user.bgName
            );
          if (selectedBg) {
              setBgSrc(selectedBg.src);
              setBgColor(selectedBg.color);
          }
          
        }
        fetchBg();

      }, []);

  return (
    <>
      <ProfileContext.Provider value={profileCtxValue}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/credits" element={<CreditsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contact" element={<ContactFormPage />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/time" element={<Time />} />
        <Route path="/time Tracking" element={<TimeTracking />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      </ProfileContext.Provider>
    </>
  );
}

export default App;
