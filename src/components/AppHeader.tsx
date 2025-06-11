import { ProfileImages } from "../assets/ProfileImages";
import styles from "./AppHeader.module.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const AppHeader = () => {
  const logoImg = "/images/logo.png";
  const [profileImgSrc, setProfileImgSrc] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const location = useLocation();
  const { username } = location.state || {};

  useEffect(() => {
    const fetchBg = async () => {
      const res = await fetch("http://localhost:5050/data/appheader", {
        method: "GET",
        credentials: "include",
      });
      if (res) {
        const data = await res.json();
        const selectedImg = ProfileImages.find(
          (img) => img.name == data.profileImgName
        );
        if (selectedImg) {
          setProfileImgSrc(selectedImg.src);
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
          {username}&nbsp;<span className={styles.arrow}>&#9660;</span>
        </div>

        {showDropDown && (
          <div className={styles.dropDown}>
            <div className={styles.dropDownContent}>
              <Link to="/settings" className={styles.setting}>
                Settings
              </Link>
              <div className={styles.logout}>Log out</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AppHeader;
