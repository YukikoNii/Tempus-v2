import styles from "../pages/TimePage.module.css";
import { useState, useEffect, useRef } from "react";

export const Stopwatch = () => {
  const [milisecond, setMilisecond] = useState(0);
  const [centisecond, setCentisecond] = useState("00");
  const [second, setSecond] = useState("00");
  const [min, setMin] = useState("00");
  const [hour, setHour] = useState("00");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault(); // prevent page scrolling
        setIsRunning(!isRunning);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Enter") {
        event.preventDefault(); // prevent page scrolling
        setMilisecond(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setMilisecond(milisecond + 10);
      }, 10);
      updateTime();
      return () => clearInterval(interval);
    } else {
      updateTime();
    }
  }, [isRunning, milisecond]);

  const updateTime = () => {
    let csSw = (milisecond % 1000) / 10;
    if (csSw <= 9) {
      setCentisecond("0" + csSw);
    }
    if (csSw > 9) {
      setCentisecond(`${csSw}`);
    }
    let sSw = Math.floor(milisecond / 1000) % 60;
    if (sSw <= 9) {
      setSecond("0" + sSw);
    }
    if (sSw > 9) {
      setSecond(`${sSw}`);
    }

    let mSw = Math.floor(milisecond / 60000) % 60;
    if (mSw <= 9) {
      setMin("0" + mSw);
    }
    if (mSw > 9) {
      setMin(`${mSw}`);
    }
    let hSw = Math.floor(milisecond / 3600000);
    if (hSw <= 9) {
      setHour("0" + hSw);
    }
    if (hSw > 9) {
      setHour(`${hSw}`);
    }
  };

  const run = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setMilisecond(0);
  };
  return (
    <>
      <div className={styles.stopwatchDisplay}>
        <div className={styles.stopWatchDisplayDiv}>
          <div className={`${styles.swelement} ${styles.sp}`}>{hour}</div>
        </div>
        <div className={styles.stopWatchDisplayDiv}>
          <div className={`${styles.swelement} ${styles.sp}`}>:</div>
        </div>
        <div className={styles.stopWatchDisplayDiv}>
          <div className={`${styles.swelement} ${styles.sp}`}>{min}</div>
        </div>
        <div className={styles.stopWatchDisplayDiv}>
          <div className={`${styles.swelement} ${styles.sp}`}>:</div>
        </div>
        <div className={styles.stopWatchDisplayDiv}>
          <div className={`${styles.swelement} ${styles.sp}`}>{second}</div>
        </div>
        <div className={styles.stopWatchDisplayDiv}>
          <div className={`${styles.swelement} ${styles.cenSw}`}>
            {centisecond}
          </div>
        </div>
      </div>

      <div className={styles.stopwatchButtons}>
        <button
          className={`${styles.swb} ${styles.start}`}
          onClick={() => {
            run();
          }}
        >
          {isRunning ? "STOP" : "START"}
        </button>

        <button
          className={`${styles.swb} ${styles.reset}`}
          onClick={() => reset()}
        >
          RESET
        </button>
      </div>
    </>
  );
};
