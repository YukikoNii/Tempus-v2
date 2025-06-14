import styles from "./TodoModal.module.css";
import { useRef, useEffect, useState } from "react";

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TodoModal = ({ isOpen, onClose }: TodoModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [showTitleAlert, setShowTitleAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [time, setTime] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[1].slice(0, 5);
  });
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleShake = () => {
    const shake_animation = [
      { transform: "translate(0, 0)" },
      { transform: "translate(3px, 0px)" },
      { transform: "translate(0, 0)" },
      { transform: "translate(-3px, 0px)" },
      { transform: "translate(0, 0)" },
    ];

    const shake_timing = {
      duration: 100,
      iterations: 1,
    };

    modalRef.current?.animate(shake_animation, shake_timing);
  };

  useEffect(() => {
    titleRef.current?.focus();
  }, [isOpen]);

  const save = () => {
    if (title === "") {
      setShowTitleAlert(true);
      handleShake();
    } else {
      setShowTitleAlert(false);
      const addEntry = async () => {
        await fetch("http://localhost:5050/data/todo/add", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            description: description,
            dueDate: date,
            dueTime: time,
            priority: priority.toLowerCase(),
          }),
        });
      };
      addEntry();
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Enter") {
        event.preventDefault(); // prevent page scrolling
        save();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, title]);

  const alertStyle = {
    border: "2px solid #C43D3D",
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.heading}>New Task</div>
        <div className={styles.title}>
          <label className={styles.titleLabel}>
            Title
            <span className={styles.titleAlert}>
              *{showTitleAlert && " Please enter a title."}
            </span>
          </label>
          <input
            ref={titleRef}
            type="text"
            className={styles.titleInput}
            value={title}
            style={showTitleAlert ? alertStyle : {}}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.description}>
          <label className={styles.deslabel}>Description</label>
          <textarea
            className={styles.desinput}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.options}>
          <label className={styles.oplabel}>Options</label>
          <div className={styles.dateAndTime}>
            <label className={styles.datelabel}>Due Date</label>
            <input
              type="date"
              className={styles.date}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="time"
              className={styles.time}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <label className={styles.remlabel}>Reminder</label>
            <label className={styles.reminder}>
              <input type="checkbox" />
              <span className={styles.remtoggle}></span>
            </label>
          </div>
          <div className={styles.tag}>
            <label className={styles.taglabel}>Tag</label>
            <div className={styles.tagContainer}>
              <div className={styles.tagBox}>
                <input className={styles.tagInput} />
              </div>
            </div>
          </div>
          <div className={styles.priority}>
            <label className={styles.prlabel}>Priority</label>
            <select
              className={styles.prchoice}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>High </option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
        <button className={styles.save} onClick={save}>
          Add
        </button>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default TodoModal;
