import { ProfileImages } from "../assets/ProfileImages";
import styles from "./AppHeader.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { appHeaderApi } from "../services/api";

const AppHeader = () => {
  const logoImg = "/images/logo.png";
  const [profileImgSrc, setProfileImgSrc] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [username, setUsername] = useState("");

  const logout = async () => {
    await appHeaderApi.logout();
  };

  useEffect(() => {
    const get = async () => {
      const data = await appHeaderApi.get();
      const selectedImg = ProfileImages.find(
        (img) => img.name == data.profileImgName
      );
      if (selectedImg) {
        setProfileImgSrc(selectedImg.src);
      }
      if (data.username) {
        setUsername(data.username);
      }
    };
    get();
  }, []);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
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
