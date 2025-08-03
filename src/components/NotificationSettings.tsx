import styles from "./NotificationSettings.module.css";
import { Sounds } from "../assets/AlarmSounds";
import { useState, useRef } from "react";
import { settingsApi } from "../services/api";

interface NotificationSettingsProps {
  sound: string;
}

export const NotificationSettings = ({ sound }: NotificationSettingsProps) => {
  const [selectedSound, setSelectedSound] = useState(sound);
  const soundRef = useRef<HTMLAudioElement | null>(null);

  const handleSoundChange = (e: SoundChangeEvent) => {
    setSelectedSound(e.target.value);
    const selectedSoundData = Sounds.find((s) => s.name === e.target.value);
    if (selectedSound && selectedSoundData) {
      soundRef.current = new Audio(selectedSoundData.src);
      soundRef.current.play();
    }
  };

  const updateSound = async () => {
    await settingsApi.saveSound(selectedSound);
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
