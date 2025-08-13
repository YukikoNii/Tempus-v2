import styles from "./NotificationSettings.module.css";
import { Sounds } from "../assets/AlarmSounds";
import { useState, useRef, useContext } from "react";
import { settingsApi } from "../services/api";
import ProfileContext from "../services/ProfileContext";



export const NotificationSettings = () => {
  const profileCtx = useContext(ProfileContext);
  const soundRef = useRef<HTMLAudioElement | null>(null);

  const handleSoundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    profileCtx.changeSoundName(e.target.value);
    soundRef.current = new Audio(profileCtx.soundSrc);
    soundRef.current.play();
  };

  const updateSound = async () => {
    await settingsApi.saveSound(profileCtx.soundName);
  };



  return (
    <>
      <div className={styles.body}>
        <span>Notification</span>
        <div className={styles.notif}>
          <div className={styles.timer}>
            <span>Timer Alarm</span>
            <select
              className={styles.alSound}
              name="Alarm Sound"
              value={profileCtx.soundName}
              onChange={handleSoundChange}
            >
              {Sounds.map((s, index) => (
                <option key={index} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            <input
              type="button"
              value="save"
              className={styles.alBtn}
              onClick={() => updateSound()}
            />
          </div>
        </div>
      </div>
    </>
  );
};
