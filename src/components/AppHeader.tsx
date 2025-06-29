import { ProfileImages } from "../assets/ProfileImages";
import styles from "./AppHeader.module.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const AppHeader = () => {
  const URL = import.meta.env.VITE_URL;
  const logoImg = "/images/logo.png";
  const [profileImgSrc, setProfileImgSrc] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [username, setUsername] = useState("");

  const logout = async () => {
    await fetch(`${URL}data/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    const fetchBg = async () => {
      const res = await fetch(`${URL}data/appheader`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res) {
        const data = await res.json();
        const selectedImg = ProfileImages.find(
          (img) => img.name == data.profileImgName
        );
        if (selectedImg) {
          setProfileImgSrc(selectedImg.src);
        }
        if (data.username) {
          setUsername(data.username);
        }
      }
    };
    fetchBg();
  }, []);

  const toggleDropDown = () => {
    if (showDropDown) {
      setShowDropDown(false);
    } else {
      setShowDropDown(true);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <img className={styles.logo} src={logoImg}></img>
        <Link to="/home" className={styles.title}>
          Tempus
        </Link>
        <img src={profileImgSrc} alt="avatar" className={styles.usericon}></img>
        <div className={styles.username} onClick={toggleDropDown}>
          {username}&nbsp;
          <span className={styles.arrow}>{showDropDown ? "▼" : "▲"}</span>
        </div>

        {showDropDown && (
          <div className={styles.dropDown}>
            <div className={styles.dropDownContent}>
              <Link to="/settings" className={styles.dropDownLink}>
                Settings
              </Link>
              <Link
                to="/"
                className={styles.dropDownLink}
                onClick={() => logout()}
              >
                Log out
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AppHeader;
