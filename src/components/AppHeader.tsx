import { ProfileImages } from "../assets/ProfileImages";
import styles from "./AppHeader.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { appHeaderApi } from "../services/api";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import Dropdown from "./Dropdown";
import ProfileContext from "../services/ProfileContext";

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
  const [showDropDown, setShowDropDown] = useState(false);
  const profileInfo = useContext(ProfileContext);


  return (
    <>
      <div className={styles.header}>
        <img className={styles.logo} src={logoImg}></img>
        <Link to="/home" className={styles.title}>
          Tempus
        </Link>
        <img src={profileInfo.iconImgSrc} alt="avatar" className={styles.usericon}></img>
        <div className={styles.username} onClick={() => setShowDropDown(!showDropDown)}>
          {profileInfo.username}&nbsp;
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
