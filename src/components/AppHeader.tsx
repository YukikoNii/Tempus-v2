import { ProfileImages } from "../assets/ProfileImages";
import styles from "./AppHeader.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { appHeaderApi } from "../services/api";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import Dropdown from "./Dropdown";

const logout = async () => {
    await appHeaderApi.logout();
};

const dropdownItems = [
    {
      name: "Settings",
      link: "/settings"
    },
    {
      name: "Log out",
      link: "/",
      onClick: () => logout()
    }
];


const AppHeader = () => {
  const logoImg = "/images/logo.png";
  const [profileImgSrc, setProfileImgSrc] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [username, setUsername] = useState("");


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


  return (
    <>
      <div className={styles.header}>
        <img className={styles.logo} src={logoImg}></img>
        <Link to="/home" className={styles.title}>
          Tempus
        </Link>
        <img src={profileImgSrc} alt="avatar" className={styles.usericon}></img>
        <div className={styles.username} onClick={() => setShowDropDown(!showDropDown)}>
          {username}&nbsp;
          <span className={styles.arrow}>{showDropDown ? <TbTriangleInvertedFilled/> : <TbTriangleFilled/>}</span>
        </div>

        {showDropDown && (
          <Dropdown
            items={dropdownItems}
          />
        )}
      </div>
    </>
  );
};

export default AppHeader;
