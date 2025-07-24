import styles from "./TodoPage.module.css";
import Sidebar from "../components/Sidebar";
import AppHeader from "../components/AppHeader";
import Entry from "../components/Entry";
import "material-icons/iconfont/material-icons.css";
import TodoModal from "../components/TodoModal";
import { useState, useEffect, useMemo } from "react";
import { backgrounds } from "../assets/BackgroundImages";
import { Priorities } from "../components/Priorities";
import { EntryType } from "../types/EntryType";

function TimeTrackingPage() {
  const URL = import.meta.env.VITE_URL;
  const [bgSrc, setBgSrc] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [isOpen, setIsOpen] = useState(true);



  return (
    <div
      className={styles.grid}
    >
    <Sidebar onToggle={() => setIsOpen(!isOpen)}></Sidebar>
      <AppHeader></AppHeader>
      <div className={styles.container}>
        <div className={styles.main}>
            <div className={styles.newTaskBox}>
            <input
                className={styles.newTaskName}
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
            />
            <button className={styles.add}>
            ▶
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default TimeTrackingPage;
