import styles from "../pages/TimePage.module.css";
import { useState, useEffect } from "react";

export const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [formattedTime, setFormattedTime] = useState("00:00:00");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault(); // prevent page scrolling
        run();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Enter") {
        event.preventDefault(); // prevent page scrolling
        reset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime(currentTime - startTime);
        setFormattedTime(formatTime(elapsedTime));
      }, 10);
      return () => clearInterval(interval);
    } else {
    }
  },[isRunning, elapsedTime]);

  const formatTime = (miliseconds:number) => {
      const sec_str = (Math.floor(miliseconds / 1000) % 60).toString().padStart(2, "0");
      const min_str = (Math.floor(miliseconds / 60000) % 60).toString().padStart(2, "0");
      const hour_str = (Math.floor(miliseconds / 3600000) % 60).toString().padStart(2, "0");
      
      return hour_str + ":" + min_str + ":" + sec_str; 
  }


  const run = () => {
    if (!isRunning) {
      setStartTime(Date.now() - elapsedTime);
    }
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setFormattedTime("00:00:00");
    setElapsedTime(0);
  };
  return (
    <>
      <div className={styles.stopwatchDisplay}>
         <div className={styles.stopWatchDiv}>
          <div className={`${styles.swelement} ${styles.sp}`}>{formattedTime}</div>
        </div>
         <div className={styles.stopWatchDiv}>
          <div className={`${styles.swelement} ${styles.cenSw}`}>{(elapsedTime % 1000).toString().padStart(3, "0")}</div>
        </div>
      </div>


      <div className={styles.stopwatchButtons}>
        <button
          className={`${styles.swb} ${styles.start}`}
          onClick={() => run()
          }
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