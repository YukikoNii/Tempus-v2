import styles from "./Entry.module.css";
import { useState } from "react";
import { Priorities } from "./Priorities";
import { EntryType } from "../types/EntryType";
import { todoApi } from "../services/api";
import "material-symbols";

interface EntryProps {
  entry: EntryType;
  onCheck: () => void;
  onEdit: () => void;
}

const Entry = ({ entry, onCheck, onEdit }: EntryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedPriority = Priorities.find((pr) => pr.name == entry.priority);
  const toggleEntry = () => {
    setIsExpanded(!isExpanded);
  };

  const deleteEntry = async () => {
    await todoApi.delete(entry._id);
    onCheck();
  };

  const expandStyle = { //NOTE -  consider switching to tailwind css so I don't have to define style blocks like this
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
