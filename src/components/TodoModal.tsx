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
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");

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
            tags: tags,
          }),
        });
      };
      addEntry();
      onClose();
    }
  };

  const addTag = (tag: string) => {
    setTags((tags) => [...tags, tag]);
  };

  const popTagFromTail = () => {
    setTags((tags) => tags.slice(0, tags.length - 1));
  };

  const removeTag = (tagToRemove: string) => {
    setTags((tags) => tags.filter((tag) => tag !== tagToRemove));
  };

  const alertStyle = {
    border: "2px solid #C43D3D",
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.heading}>New Task</div>
        <div
          className={styles.title}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              e.preventDefault(); // prevent page scrolling
              save();
            }
          }}
        >
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
          </div>
          <div className={styles.tag}>
            <label className={styles.taglabel}>Tag</label>
            <div className={styles.tagContainer}>
              <div className={styles.tagBox}>
                {[...tags].map((tag, index) => {
                  return (
                    <div key={index} className={styles.tagItem}>
                      <span className={styles.tagItemName}>{tag}</span>
                      <span
                        className={`material-icons ${styles.icon}`}
                        onClick={() => removeTag(tag)}
                      >
                        close
                      </span>
                    </div>
                  );
                })}
                <input
                  className={styles.tagInput}
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addTag(tag);
                      setTag("");
                    } else if (e.key === "Backspace") {
                      popTagFromTail();
                    }
                  }}
                />
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
