import styles from "./Entry.module.css";
import { useState } from "react";
import { Priorities } from "./Priorities";
import "material-symbols";

interface EntryProps {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  tags: string[];
  onCheck: () => void;
  onEdit: () => void;
}

const Entry = ({
  id,
  title,
  description,
  dueDate,
  priority,
  tags,
  onCheck,
  onEdit,
}: EntryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedPriority = Priorities.find((pr) => pr.name == priority);
  const toggleEntry = () => {
    setIsExpanded(!isExpanded);
  };

  const deleteEntry = () => {
    onCheck();
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
      <div className={styles.entrytitle}>{title}</div>
      <div className={styles.entrydes} style={isExpanded ? expandStyle : {}}>
        {description}{" "}
      </div>
      <div className={styles.entrydate} style={isExpanded ? expandStyle : {}}>
        {dueDate}
      </div>
      <div className={styles.tags} style={isExpanded ? expandStyle : {}}>
        {tags.map((name, index) => (
          <span key={index} className={styles.tag}>
            {name}
          </span>
        ))}
      </div>
      <div className={styles[priority]}>{selectedPriority?.symbol}</div>
      <div className={styles[priority]}>{selectedPriority?.symbol}</div>
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
