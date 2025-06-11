import styles from "./TodoPage.module.css";
import Sidebar from "../components/Sidebar";
import AppHeader from "../components/AppHeader";
import "material-icons/iconfont/material-icons.css";
import TodoModal from "../components/TodoModal";
import { useState, useEffect } from "react";
import { backgrounds } from "../assets/BackgroundImages";

function TodoPage() {
  const [showModal, setShowModal] = useState(false);
  const [isPriorityListVisible, setIsPriorityListVisible] = useState(false);
  const [isTagListVisible, setIsTagListVisible] = useState(false);
  const [bgSrc, setBgSrc] = useState("");

  const todoFunctionStyle = {
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
        const selectedBg = backgrounds.find((bg) => bg.name == data.bgName);
        if (selectedBg) {
          setBgSrc(selectedBg.src);
        }
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

      <div className={styles.todofunction} style={todoFunctionStyle}>
        <div className={styles.todo}>
          <button className={styles.add} onClick={() => setShowModal(true)}>
            +
          </button>
          {showModal && (
            <TodoModal onClose={() => setShowModal(false)}></TodoModal>
          )}
          <div className={styles.list}></div>
        </div>

        <div className={styles.right}>
          <div className={styles.tagsList}>
            <div className={styles.tagHr}>
              Tags &nbsp;
              <span className={styles.tagArrow} onClick={() => toggleTagList()}>
                {isTagListVisible ? "▼" : "▲"}
              </span>
            </div>
          </div>
          <div className={styles.prioritylist}>
            Priority &nbsp;
            <span
              className={styles.prArrow}
              onClick={() => togglePriorityList()}
            >
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

        <div className={styles.right2}>
          <div className={styles.rightTitle}>Reminders</div>
          <div className={styles.reminders}></div>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
