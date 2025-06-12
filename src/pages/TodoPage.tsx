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
  const [isTagListVisible, setIsTagListVisible] = useState(false);
  const [bgSrc, setBgSrc] = useState("");

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
    <div className={styles.grid}>
      <AppHeader></AppHeader>
      <Sidebar></Sidebar>

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
            {entries.map((entry, index) => (
              <Entry
                key={index}
                id={entry._id}
                title={entry.title}
                description={entry.description}
                dueDate={entry.dueDate}
                priority={entry.priority}
              ></Entry>
            ))}
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
              <div className={`${styles.pr} ${styles.high}`}>High</div>
              <div className={`${styles.pr} ${styles.medium}`}>Medium</div>
              <div className={`${styles.pr} ${styles.low}`}>Low</div>
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
