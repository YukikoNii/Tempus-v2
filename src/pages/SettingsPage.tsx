import { ProfileImages } from "../assets/ProfileImages";
import { Sounds } from "../assets/AlarmSounds";
import styles from "./SettingsPage.module.css";
import { useState, useEffect } from "react";
import AppHeader from "../components/AppHeader";
import Sidebar from "../components/Sidebar";
import { AccountSettings } from "../components/AccountSettings";
import { NotificationSettings } from "../components/NotificationSettings";
import { settingsApi } from "../services/api";


function SettingsPage() {
  const [showAccountSettings, setShowAccountSettings] = useState(true);
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImgSrc, setProfileImgSrc] = useState("");
  const [sound, setSound] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
      const data = await settingsApi.get();
      setUsername(data.username);
      setEmail(data.email);
      const selectedImg = ProfileImages.find(
        (img) => img.name == data.profileImgName
      );
      if (selectedImg) {
        setProfileImgSrc(selectedImg.src);
      }
      const selectedSound = Sounds.find((s) => s.name === data.soundName);
      if (selectedSound) {
        setSound(selectedSound.name);
      }
    } catch (e) {
      // 
    }
    };
    fetchSettings();
  }, []);

  return (
    <div
      className={isOpen ? styles.gridWide : styles.gridNormal }
    >
      <AppHeader></AppHeader>{" "}
      {/* should change profile pic in the header too */}
      <Sidebar onToggle={() => setIsOpen(!isOpen)}></Sidebar>
      <section className={styles.section}>
        <div className={styles.settingMenu}>
          <img src={profileImgSrc} className={styles.menuPic} />
          <span onClick={() => setShowAccountSettings(true)}>Account</span>
          <span
            onClick={() => {
              setShowAccountSettings(false);
              setShowNotificationSettings(true);
            }}
          >
            Notification
          </span>
        </div>

        <div className={styles.settingBody}>
          {showAccountSettings && (
            <AccountSettings
              currentUsername={username}
              currentEmail={email}
              changePic={(src) => setProfileImgSrc(src)}
            />
          )}
          {showNotificationSettings && (
            <NotificationSettings sound={sound}></NotificationSettings>
          )}
        </div>
      </section>
    </div>
  );
}

export default SettingsPage;
