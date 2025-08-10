import { Sounds } from "../assets/AlarmSounds";
import styles from "./SettingsPage.module.css";
import { useState, useEffect, useContext } from "react";
import AppHeader from "../components/AppHeader";
import Sidebar from "../components/Sidebar";
import { AccountSettings } from "../components/AccountSettings";
import { NotificationSettings } from "../components/NotificationSettings";
import { settingsApi } from "../services/api";
import ProfileContext from "../services/ProfileContext";
import SidebarContext from "../services/SidebarContext";

function SettingsPage() {
  const sidebarCtx = useContext(SidebarContext);
  const profileInfo = useContext(ProfileContext);
  const [showAccountSettings, setShowAccountSettings] = useState(true);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [email, setEmail] = useState("");
  const [sound, setSound] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
      const data = await settingsApi.get();
      setEmail(data.email);
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
      className={sidebarCtx.isOpen ? styles.gridWide : styles.gridNormal }
    >
      <AppHeader></AppHeader>{" "}
      {/* should change profile pic in the header too */}
      <Sidebar onToggle={sidebarCtx.toggleSidebar}></Sidebar>
      <section className={styles.section}>
        <div className={styles.settingMenu}>
          <img src={profileInfo.iconImgSrc} className={styles.menuPic} />
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
            <AccountSettings/>
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
