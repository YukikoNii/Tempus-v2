import { ObjectId } from "mongoose";
import styles from "./Entry.module.css";
import { useState } from "react";

interface EntryProps {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
}
const Entry = ({ id, title, description, dueDate, priority }: EntryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleEntry = () => {
    setIsExpanded(!isExpanded);
  };

  const deleteEntry = () => {
    console.log(id);
    const deleteEntryFromDB = async () => {
      await fetch("http://localhost:5050/data/todo/delete", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
    };
    deleteEntryFromDB();
  };

  const expandStyle = {
    display: "block",
  };

  const containerExpandStyle = {
    gridTemplateRows: "1fr 1fr 1fr",
  };
  return (
    <div className={`${styles.entry}`} onClick={() => toggleEntry()}>
      <label
        className={styles.container}
        style={isExpanded ? containerExpandStyle : {}}
      >
        <input
          type="checkbox"
          className={styles.checkbox}
          onClick={deleteEntry}
        />
        <span className={styles.checkmark}></span>
      </label>
      <div className={styles.entrytitle}>{title}</div>
      <div className={styles.entrydes} style={isExpanded ? expandStyle : {}}>
        {description}{" "}
      </div>
      <div className={styles.entrydate} style={isExpanded ? expandStyle : {}}>
        {dueDate}
      </div>
      <div className={`${styles.tagEach}`}></div>
      <div className={styles[priority]}>{priority}</div>
    </div>
  );
};

export default Entry;
