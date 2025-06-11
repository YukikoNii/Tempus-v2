import styles from "./NotificationSettings.module.css";
import { Sounds } from "../assets/AlarmSounds";
import { useState, useRef } from "react";

interface NotificationSettingsProps {
  sound: string;
}

export const NotificationSettings = ({ sound }: NotificationSettingsProps) => {
  const [selectedSound, setSelectedSound] = useState(sound);
  const soundRef = useRef<HTMLAudioElement | null>(null); // I don't fully understand this

  const handleSoundChange = (e: SoundChangeEvent) => {
    console.log(Sounds);

    setSelectedSound(e.target.value);
    console.log(e.target.value);
    const selectedSoundData = Sounds.find((s) => s.name === e.target.value);
    if (selectedSound && selectedSoundData) {
      console.log(selectedSoundData);
      soundRef.current = new Audio(selectedSoundData.src);
      soundRef.current.play();
      console.log(selectedSoundData);
    }
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
