import styles from "./TimeTrackingPage.module.css";
import Sidebar from "../components/Sidebar";
import AppHeader from "../components/AppHeader";
import Entry from "../components/Entry";
import "material-icons/iconfont/material-icons.css";
import { useState, useEffect, useRef } from "react";
import { backgrounds } from "../assets/BackgroundImages";
import { Priorities } from "../components/Priorities";
import { EntryType } from "../types/EntryType";
import ProjectDropDown from "../components/ProjectDropDown";

function TimeTrackingPage() {
  const URL = import.meta.env.VITE_URL;
  const [newLogName, setnewLogName] = useState("");
  const [newLogProject, setNewLogProject] = useState("Personal Development");
  const [isOpen, setIsOpen] = useState(true);
  const [newLogRun, IsNewLogRun] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [formattedTime, setFormattedTime] = useState("00:00:00");
  const [logs, setLogs] = useState<TimeLog[]>([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const projectRef = useRef<HTMLButtonElement>(null);
  type TimeLog = {
    _id: string,
    name: string, 
    project: string,
    duration: number, 
    startTime: Date,
    endTime: Date,
  }

  const btnPlayStyle = {
    backgroundColor: "#026670"
  }

  const addLog = async () => {
    if (!newLogRun && elapsedTime != 0) {
      await fetch(`${URL}data/timeTracking`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
              name: newLogName,
              project: newLogProject,
              duration: elapsedTime,
              startTime: new Date(startTime),
              endTime: new Date(startTime + elapsedTime)
        }),
      });
    }
  };

  const deleteLog = async (log : TimeLog) => {
    console.log(log);
      await fetch(`${URL}data/timeTracking/delete`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id:log._id}),
      });
  };

  useEffect(() => {
      const fetchTimeLogs = async () => {
        const res = await fetch(`${URL}data/timeTracking`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res) {
          const data = await res.json();
          console.log(data);
          const parsedTimeLogs = data.map((log : any) => ({
            ...log, startTime: new Date(log.startTime), endTime: new Date(log.endTime)
          }));
          setLogs(parsedTimeLogs);
        }
      };
      fetchTimeLogs();
  }, [newLogRun]);

  useEffect(() => {
    if (newLogRun) {
      const interval = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime(currentTime - startTime);
        setFormattedTime(formatTime(elapsedTime));
      }, 10);
      return () => clearInterval(interval);
    } else {
        addLog();
        setFormattedTime("00:00:00");
        setElapsedTime(0);
    }
  },[newLogRun, elapsedTime]);

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
                className={styles.newLogName}
                value={newLogName}
                placeholder="What are you going to work on?"
                onChange={(e) => setnewLogName(e.target.value)}
            />
            <button ref={projectRef} className={styles.projectName} onClick={() => setShowDropDown(!showDropDown)}>{newLogProject}</button>
            <div className={styles.stopwatch}>
              <div className={styles.stopWatchDiv}>
                <div className={`${styles.swelement} ${styles.sp}`}>{formattedTime}</div>
              </div>
            </div>
            <button
              className={`material-symbols-outlined ${styles.newTaskBtn}`} 
              onClick={() => {
                IsNewLogRun(!newLogRun);
                setStartTime(Date.now());
                }}
                style={newLogRun ? {backgroundColor: "#525252"} : btnPlayStyle}
                >
              {newLogRun ? "stop" : "play_arrow"}
            </button>
            <button className={`material-symbols-outlined ${styles.deleteBtn}`} onClick={() => IsNewLogRun(!newLogRun)}>
              delete
            </button>
            </div>
            <div className={styles.list}>
              {logs.map((log, key) => {
                return (
                  <div key={key} className={styles.record}>
                    <input
                      value={log.name}
                    ></input> 
                    <div>{log.project}</div>

                    <div>{log.startTime.toTimeString().substring(0,8)} - {log.endTime.toTimeString().substring(0,8)}</div>
                    <div>{formatTime(log.duration)}</div>
                    <button className={`material-symbols-outlined ${styles.deleteBtn}`} onClick={() => deleteLog(log)}>delete</button>
                  </div>
                )
              })}

            </div>
        </div>
      </div>
    </div>
    {(showDropDown && projectRef.current) && <ProjectDropDown x={projectRef.current?.getBoundingClientRect().left} y={projectRef.current?.getBoundingClientRect().y + projectRef.current?.getBoundingClientRect().height} onSelect={(selected) => {setNewLogProject(selected); console.log("working");}}></ProjectDropDown>}
    </>
  );
}

export default TimeTrackingPage;
