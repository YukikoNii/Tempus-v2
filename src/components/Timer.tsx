import styles from "../pages/TimePage.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import ProfileContext from "../services/ProfileContext";
import { utils } from "../services/utils";

export const Timer = () => {
  const profileCtx = useContext(ProfileContext);
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const soundRef = useRef<HTMLAudioElement | null>(null); 

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault(); // prevent page scrolling
        runTimer();
      } else if (event.code === "Enter") {
        event.preventDefault(); // prevent page scrolling
        setMs(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning]);



  useEffect(() => {
    soundRef.current = new Audio(profileCtx.soundSrc);
  }, [profileCtx.soundSrc]);

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
          setMs(ms => ms - 1);
        } else {
          playAlarmSound();
          clearInterval(timer);
        }
      }, 1);
      updateTime();
      return () => clearInterval(timer);
    } else {
      updateTime();
    }
  }, [isRunning, ms]);


  const runTimer = () => {
    if (!isRunning) {
      setMs(seconds * 1000 + minutes * 60000 + hours * 3600000);
    }
    setIsRunning(!isRunning);
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
          value={utils.padNum(hours)}
          onChange={(e) => setHours(Number(e.target.value))}
        />
        <label className={`${styles.timer} ${styles.labelTmr}`}>h</label>
        <input
          type="number"
          name="minute"
          className={`${styles.timer} ${styles.input}`}
          value={utils.padNum(minutes)}
          onChange={(e) => setMinutes(Number(e.target.value))}
        />
        <label className={`${styles.timer} ${styles.labelTmr}`}>m</label>
        <input
          type="number"
          name="second"
          className={`${styles.timer} ${styles.input}`}
          value={utils.padNum(seconds)}
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
