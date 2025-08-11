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
  const menuItems = ["Account", "Notification"] as const;
  const [activeTab, setActiveTab] = useState<(typeof menuItems)[number]>("Account");
  const [sound, setSound] = useState("");

  const pages = {
    Account: <AccountSettings/>,
    Notification: <NotificationSettings sound={sound}/>
  }

  useEffect(() => {
    const fetchSettings = async () => {
      try {
      const data = await settingsApi.get();
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
      <AppHeader></AppHeader>
      <Sidebar></Sidebar>
      <section className={styles.section}>
        <div className={styles.settingMenu}>
          <img src={profileInfo.iconImgSrc} className={styles.menuPic} />
          {menuItems.map((item, key) => (
            <span key={key} onClick={() => setActiveTab(item)}>{item}</span>
          ))}
        </div>

        <div className={styles.settingBody}>
          {pages[activeTab] ?? null}
        </div>
      </section>
    </div>
  );
}

export default SettingsPage;
