import styles from "./NotificationSettings.module.css";
import { Sounds } from "../assets/AlarmSounds";
import { useState } from "react";

interface NotificationSettingsProps {
  sound: string;
}

export const NotificationSettings = ({ sound }: NotificationSettingsProps) => {
  const [selectedSound, setSelectedSound] = useState(sound);

  const handleSoundChange = (e: SoundChangeEvent) => {
    setSelectedSound(e.target.value);
  };

  const updateSound = () => {
    const saveSoundToDB = async () => {
      const res = await fetch(
        "http://localhost:5050/data/notificationSettings",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ soundName: selectedSound }),
        }
      );
    };
    saveSoundToDB();
  };

  interface SoundChangeEvent extends React.ChangeEvent<HTMLSelectElement> {} // chatGPT

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
              value={selectedSound}
              onChange={handleSoundChange}
            >
              {Sounds.map((sound, index) => (
                <option key={index} value={sound.name}>
                  {sound.name}
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
