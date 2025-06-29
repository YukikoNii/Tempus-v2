import styles from "./Entry.module.css";
import { useState } from "react";
import { Priorities } from "./Priorities";
import { EntryType } from "../types/EntryType";
import "material-symbols";

interface EntryProps {
  entry: EntryType;
  onCheck: () => void;
  onEdit: () => void;
}

const Entry = ({ entry, onCheck, onEdit }: EntryProps) => {
  const URL = import.meta.env.URL;
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedPriority = Priorities.find((pr) => pr.name == entry.priority);
  const toggleEntry = () => {
    setIsExpanded(!isExpanded);
  };

  const deleteEntry = () => {
    onCheck();
    const deleteEntryFromDB = async () => {
      await fetch(`${URL}data/todo/delete`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: entry._id }),
      });
    };
    deleteEntryFromDB();
  };

  const expandStyle = {
    display: "block",
  };

  const containerExpandStyle = {
    gridTemplateRows: "1fr 1fr 1fr 1fr",
  };
  return (
    <div
      className={`${styles.entry}`}
      style={isExpanded ? containerExpandStyle : { height: "30px" }}
      onClick={toggleEntry}
    >
      <label className={styles.container}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onClick={deleteEntry}
        />
        <span className={styles.checkmark}></span>
      </label>
      <div className={styles.entrytitle}>{entry.title}</div>
      <div className={styles.entrydes} style={isExpanded ? expandStyle : {}}>
        {entry.description}{" "}
      </div>
      <div className={styles.entrydate} style={isExpanded ? expandStyle : {}}>
        {entry.dueDate} {entry.dueTime}
      </div>
      <div className={styles.tags} style={isExpanded ? expandStyle : {}}>
        {entry.tags.map((name, index) => (
          <span key={index} className={styles.tag}>
            {name}
          </span>
        ))}
      </div>
      <div className={styles[entry.priority]}>{selectedPriority?.symbol}</div>
      <div className={styles[entry.priority]}>{selectedPriority?.symbol}</div>
      <div
        className={`material-symbols-outlined ${styles.editIcon}`}
        onClick={onEdit}
      >
        edit
      </div>
      <div
        className={`material-symbols-outlined ${styles.deleteIcon}`}
        onClick={deleteEntry}
      >
        delete
      </div>
    </div>
  );
};

export default Entry;
