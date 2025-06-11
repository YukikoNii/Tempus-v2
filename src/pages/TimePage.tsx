import styles from "./TimePage.module.css";
import Sidebar from "../components/Sidebar";
import { Timer } from "../components/Timer";
import AppHeader from "../components/AppHeader";
import { useState, useEffect } from "react";
import { Stopwatch } from "../components/Stopwatch";

function Time() {
  const [isStopwatchVisible, setIsStopwatchVisible] = useState(true);

  return (
    <div className={styles.grid}>
      <AppHeader />
      <Sidebar />

      <div className={styles.carousel}>
        <button
          className={styles.ca1}
          onClick={() => setIsStopwatchVisible(true)}
        >
          S
        </button>
        <button
          className={styles.ca2}
          onClick={() => setIsStopwatchVisible(false)}
        >
          T
        </button>
      </div>

      {isStopwatchVisible ? <Stopwatch></Stopwatch> : <Timer></Timer>}
    </div>
  );
}

export default Time;
