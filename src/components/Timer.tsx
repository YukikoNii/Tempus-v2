import styles from "../pages/TimePage.module.css";
import { useState, useEffect, useRef } from "react";
import { Sounds } from "../assets/AlarmSounds";

export const Timer = () => {
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const soundRef = useRef<HTMLAudioElement | null>(null); // I don't fully understand this

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault(); // prevent page scrolling
        runTimer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Enter") {
        event.preventDefault(); // prevent page scrolling
        setMs(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning]);
  useEffect(() => {
    const fetchBg = async () => {
      const res = await fetch("http://localhost:5050/data/timer", {
        method: "GET",
        credentials: "include",
      });
      if (res) {
        const data = await res.json();
        const selectedSound = Sounds.find(
          (sound) => sound.name == data.soundName
        );
        if (selectedSound) {
          soundRef.current = new Audio(selectedSound.src);
        }
      }
    };
    fetchBg();
  }, []);

  const updateTime = () => {
    setSeconds(Math.floor(ms / 1000) % 60);
    setMinutes(Math.floor(ms / 60000) % 60);
    setHours(Math.floor(ms / 3600000));
  };

  // start timer
  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        if (ms > 0) {
          setMs(ms - 10);
        } else {
          playAlarmSound();
        }
      }, 10);
      updateTime();
      return () => clearInterval(timer);
    } else {
      updateTime();
    }
  }, [isRunning, ms]);

  const runTimer = () => {
    if (isRunning) {
      setIsRunning(!isRunning);
    } else {
      setMs(seconds * 1000 + minutes * 60000 + hours * 3600000);
      setIsRunning(!isRunning);
    }
  };

  // reset timer
  const resetTimer = () => {
    setIsRunning(false);
    setMs(0);
  };

  const playAlarmSound = () => {
    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  return (
    <>
      <form className={styles.timerInput}>
        <input
          type="number"
          name="hour"
          className={`${styles.timer} ${styles.input}`}
          value={hours.toString().padStart(2, "0")}
          onChange={(e) => setHours(Number(e.target.value))}
        />
        <label className={`${styles.timer} ${styles.labelTmr}`}>h</label>
        <input
          type="number"
          name="minute"
          className={`${styles.timer} ${styles.input}`}
          value={minutes.toString().padStart(2, "0")}
          onChange={(e) => setMinutes(Number(e.target.value))}
        />
        <label className={`${styles.timer} ${styles.labelTmr}`}>m</label>
        <input
          type="number"
          name="second"
          className={`${styles.timer} ${styles.input}`}
          value={seconds.toString().padStart(2, "0")}
          onChange={(e) => setSeconds(Number(e.target.value))}
        />
        <label className={`${styles.timer} ${styles.labelTmr}`}>s</label>
      </form>

      <div className={styles.timerButtons}>
        <button className={styles.start} onClick={() => runTimer()}>
          {isRunning ? "STOP" : "START"}
        </button>
        <button className={styles.reset} onClick={() => resetTimer()}>
          RESET
        </button>
      </div>
    </>
  );
};
