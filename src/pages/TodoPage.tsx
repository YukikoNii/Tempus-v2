import styles from "./TodoPage.module.css";
import Sidebar from "../components/Sidebar";
import AppHeader from "../components/AppHeader";
import Entry from "../components/Entry";
import "material-icons/iconfont/material-icons.css";
import TodoModal from "../components/TodoModal";
import { useState, useEffect } from "react";
import { backgrounds } from "../assets/BackgroundImages";

function TodoPage() {
  const [showModal, setShowModal] = useState(false);
  const [isPriorityListVisible, setIsPriorityListVisible] = useState(false);
  const [priority, setPriority] = useState("");
  const [isTagListVisible, setIsTagListVisible] = useState(false);
  const [bgSrc, setBgSrc] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  let priorityCounts = { low: 0, medium: 0, high: 0 };

  // define an Entry Type
  type EntryType = {
    _id: string;
    userId: string;
    description: string;
    dueDate: string;
    priority: string;
    title: string;
    tags: Array<string>;

    // Add other fields if needed
  };
  const [entries, setEntries] = useState<EntryType[]>([]);
  const containerStyle = {
    gridRow: "2/6",
    gridColumn: "2/4",
    backgroundImage: `url(${bgSrc})`,
    backgroundSize: "cover",
    display: "grid",
    gridTemplateColumns: "5fr 1fr",
    gridTemplateRows: "1fr 1fr",
  };

  const handlePriority = (selected: string) => {
    selected = selected.toLowerCase();
    if (selected === priority) {
      setPriority("");
    } else {
      setPriority(selected);
    }
  };

  useEffect(() => {
    const fetchBg = async () => {
      const res = await fetch("http://localhost:5050/data/todo", {
        method: "GET",
        credentials: "include",
      });
      if (res) {
        const data = await res.json();
        const selectedBg = backgrounds.find(
          (bg) => bg.name == data.user.bgName
        );
        if (selectedBg) {
          setBgSrc(selectedBg.src);
        }
        setEntries(data.todos);
      }
    };
    fetchBg();
  }, []);

  const togglePriorityList = () => {
    if (isPriorityListVisible) {
      setIsPriorityListVisible(false);
    } else {
      setIsPriorityListVisible(true);
    }
  };

  const toggleTagList = () => {
    if (isTagListVisible) {
      setIsTagListVisible(false);
    } else {
      setIsTagListVisible(true);
    }
  };

  return (
    <div
      className={styles.grid}
      style={isOpen ? {} : { gridTemplateColumns: "0.29fr 4fr 1fr" }}
    >
      <AppHeader></AppHeader>
      <Sidebar onToggle={() => setIsOpen(!isOpen)}></Sidebar>

      <div className={styles.container} style={containerStyle}>
        <div className={styles.main}>
          <button className={styles.add} onClick={() => setShowModal(true)}>
            +
          </button>
          {showModal && (
            <TodoModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
            ></TodoModal>
          )}
          <div className={styles.list}>
            {entries.map((entry) => {
              const key = entry.priority;
              if (key === "low" || key === "medium" || key == "high") {
                priorityCounts[key] += 1;
              }
              return priority === "" || priority === entry.priority ? (
                <Entry
                  key={entry._id}
                  id={entry._id}
                  title={entry.title}
                  description={entry.description}
                  dueDate={entry.dueDate}
                  priority={entry.priority}
                ></Entry>
              ) : (
                <div key={entry._id}></div>
              );
            })}
          </div>
        </div>

        <div className={styles.filterContainer}>
          <div className={styles.tagList}>
            Tags &nbsp;
            <span onClick={() => toggleTagList()}>
              {isTagListVisible ? "▼" : "▲"}
            </span>
          </div>
          <div className={styles.priorityList}>
            Priority &nbsp;
            <span onClick={() => togglePriorityList()}>
              {isPriorityListVisible ? "▼" : "▲"}
            </span>
          </div>
          {isPriorityListVisible && (
            <div>
              <div
                className={`${styles.pr} ${styles.high}`}
                onClick={(e) =>
                  handlePriority((e.target as HTMLElement).innerText)
                }
                style={
                  priority === "high" ? { backgroundColor: "#E4A8A8" } : {}
                }
              >
                High <span>{priorityCounts["high"]}</span>
              </div>
              <div
                className={`${styles.pr} ${styles.medium}`}
                onClick={(e) =>
                  handlePriority((e.target as HTMLElement).innerText)
                }
                style={
                  priority === "medium" ? { backgroundColor: "#EEEAA6" } : {}
                }
              >
                Medium <span>{priorityCounts["medium"]}</span>
              </div>
              <div
                className={`${styles.pr} ${styles.low}`}
                onClick={(e) =>
                  handlePriority((e.target as HTMLElement).innerText)
                }
                style={priority === "low" ? { backgroundColor: "#B0E8C0" } : {}}
              >
                Low <span>{priorityCounts["low"]}</span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.reminderContainer}>
          <div className={styles.rightHeading}>Reminders</div>
          <div className={styles.reminders}></div>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
