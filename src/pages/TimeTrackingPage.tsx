import styles from "./TimeTrackingPage.module.css";
import Sidebar from "../components/Sidebar";
import AppHeader from "../components/AppHeader";
import "material-icons/iconfont/material-icons.css";
import { useState, useEffect, useRef, useContext } from "react";
import ProjectDropDown from "../components/ProjectDropDown";
import TimeLogCalendarView from "../components/TimeLogCalendarView";
import SidebarContext from "../services/SidebarContext";
import { utils } from "../services/utils";

function TimeTrackingPage() {
  const VITE_URL = import.meta.env.VITE_URL;
  const sidebarCtx = useContext(SidebarContext);
  const [newLogName, setnewLogName] = useState("");
  const [newLogProject, setNewLogProject] = useState("Personal Development");
  const [newLogRun, IsNewLogRun] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [formattedTime, setFormattedTime] = useState("00:00:00");
  const [logs, setLogs] = useState<TimeLog[]>([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const projectRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
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
              startTime: startTime,
              endTime: startTime + elapsedTime
        }),
      });
    }
    fetchTimeLogs();
  };

  const deleteLog = async (log : TimeLog) => {
      await fetch(`${VITE_URL}data/timeTracking/delete`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id:log._id}),
      });
    fetchTimeLogs();
  };

  const fetchTimeLogs = async () => {
    const res = await fetch(`${VITE_URL}data/timeTracking`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res) {
      const data = await res.json();
      const parsedTimeLogs = data.map((log : any) => ({
        ...log, startTime: new Date(log.startTime), endTime: new Date(log.endTime)
      }));
      setLogs(parsedTimeLogs);
    }
  };


  useEffect(() => {
    if (newLogRun) {
      const interval = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime(currentTime - startTime);
        setFormattedTime(utils.formatTime(elapsedTime));
      }, 10);
      return () => clearInterval(interval);
    } else {
        addLog();
        setFormattedTime("00:00:00");
        setElapsedTime(0);
    }
  },[newLogRun, elapsedTime]);


  const downloadCSV = () => {
    const link = anchorRef.current;
    if (!link) return 
    const arr = [
      ["name", "project", "duration", "start", "end"],
      ...logs.map(log => [log.name, log.project, log.duration, log.startTime, log.endTime])
    ]
    .map(row => row.join(","))
    .join("\n");

    const blob = new Blob([arr], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url)
    link.setAttribute('download', "file.csv")
    link.click();
  }


  return (
    <>
    <div
      className={styles.grid}
      style={sidebarCtx.isOpen ? {} : { gridTemplateColumns: "0.29fr 4fr 1fr" }}
    >
    <Sidebar></Sidebar>
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
            <div className={styles.viewOption}>
              <div className={styles.option}>Calendar</div>
              <div className={styles.option}>List</div>
            </div>
            <TimeLogCalendarView></TimeLogCalendarView>
            <div className={styles.list}>
              {logs.map((log, key) => {
                return (
                  <div key={key} className={styles.record}>
                    <input
                      value={log.name}
                    ></input> 
                    <div>{log.project}</div>

                    <div>{log.startTime.toTimeString().substring(0,8)} - {log.endTime.toTimeString().substring(0,8)}</div>
                    <div>{utils.formatTime(log.duration)}</div>
                    <button className={`material-symbols-outlined ${styles.deleteBtn}`} onClick={() => deleteLog(log)}>delete</button>
                  </div>
                )
              })}

            </div>
            <button onClick={downloadCSV} className={styles.downloadBtn}>Download as CSV</button>
            <a ref={anchorRef} style={{display: "None"}}></a> {/* hidden and automatically clicked when download button is pressed  */}
        </div>
      </div>
    </div>
    {(showDropDown && projectRef.current) && <ProjectDropDown x={projectRef.current?.getBoundingClientRect().left} y={projectRef.current?.getBoundingClientRect().y + projectRef.current?.getBoundingClientRect().height} onSelect={(selected) => {setNewLogProject(selected); console.log("working");}}></ProjectDropDown>}
    </>
  );
}

export default TimeTrackingPage;
