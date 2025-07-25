import styles from "./TimeTrackingPage.module.css";
import Sidebar from "../components/Sidebar";
import AppHeader from "../components/AppHeader";
import Entry from "../components/Entry";
import "material-icons/iconfont/material-icons.css";
import TodoModal from "../components/TodoModal";
import { useState, useEffect, useRef } from "react";
import { backgrounds } from "../assets/BackgroundImages";
import { Priorities } from "../components/Priorities";
import { EntryType } from "../types/EntryType";
import ProjectDropDown from "../components/ProjectDropDown";

function TimeTrackingPage() {
  const URL = import.meta.env.VITE_URL;
  const [newTaskName, setNewTaskName] = useState("");
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [newTaskRun, IsNewTaskRun] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [formattedTime, setFormattedTime] = useState("00:00:00");
  const [records, setRecords] = useState<TimeRecord[]>([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const projectRef = useRef<HTMLDivElement>(null);
  type TimeRecord = {
    name: string, 
    category: string,
    duration: number, 
    startTime: Date,
    endTime: Date,
  }

  const btnPlayStyle = {
    backgroundColor: "#026670"
  }


  useEffect(() => {
    console.log(projectRef.current?.getBoundingClientRect());
  })


  useEffect(() => {
    if (newTaskRun) {
      console.log("run");
      const interval = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime(currentTime - startTime);
        setFormattedTime(formatTime(elapsedTime));
      }, 10);
      return () => clearInterval(interval);
    } else {
        addTask();
        setFormattedTime("00:00:00");
    }
  },[newTaskRun, elapsedTime]);

  const addTask = () => {
    if (!newTaskRun && elapsedTime != 0) { 
      setRecords([
        ...records,
        {
          name: newTaskName,
          category: "Personal Development",
          duration: elapsedTime,
          startTime: new Date(startTime),
          endTime: new Date(startTime + elapsedTime)
        }
      ])
    }
  }

  const formatTime = (miliseconds:number) => {
      const sec_str = (Math.floor(miliseconds / 1000) % 60).toString().padStart(2, "0");
      const min_str = (Math.floor(miliseconds / 60000) % 60).toString().padStart(2, "0");
      const hour_str = (Math.floor(miliseconds / 3600000) % 60).toString().padStart(2, "0");
      
      return hour_str + ":" + min_str + ":" + sec_str; 
  }


  return (
    <>
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
                placeholder="What are you going to work on?"
                onChange={(e) => setNewTaskName(e.target.value)}
            />
            <button ref={projectRef} className={styles.projectName} onClick={() => setShowDropDown(!showDropDown)}>Personal Development</button>
            <div className={styles.stopwatch}>
              <div className={styles.stopWatchDiv}>
                <div className={`${styles.swelement} ${styles.sp}`}>{formattedTime}</div>
              </div>
            </div>
            <button
              className={`material-symbols-outlined ${styles.newTaskBtn}`} 
              onClick={() => {
                IsNewTaskRun(!newTaskRun);
                setStartTime(Date.now());
                }}
                style={newTaskRun ? {backgroundColor: "#525252"} : btnPlayStyle}
                >
              {newTaskRun ? "stop" : "play_arrow"}
            </button>
            <button className={`material-symbols-outlined ${styles.deleteBtn}`} onClick={() => IsNewTaskRun(!newTaskRun)}>
              delete
            </button>
            </div>
            <div className={styles.list}>
              {records.map((record, key) => {
                return (
                  <div key={key} className={styles.record}>
                    <input
                      value={record.name}
                    ></input> {/* make this editable */}
                    <div>{record.category}</div>
                    <div>{record.startTime.toTimeString().substring(0,8)} - {record.endTime.toTimeString().substring(0,8)}</div>
                    <div>{formatTime(record.duration)}</div>
                  </div>
                )
              })}

            </div>
        </div>
      </div>
    </div>
    {(showDropDown && projectRef.current) && <ProjectDropDown x={projectRef.current?.getBoundingClientRect().left} y={projectRef.current?.getBoundingClientRect().y + projectRef.current?.getBoundingClientRect().height}></ProjectDropDown>}
    </>
  );
}

export default TimeTrackingPage;
