import styles from "./TodoPage.module.css";
import Sidebar from "../components/Sidebar";
import AppHeader from "../components/AppHeader";
import Entry from "../components/Entry";
import "material-icons/iconfont/material-icons.css";
import TodoModal from "../components/TodoModal";
import { useState, useEffect } from "react";
import { backgrounds } from "../assets/BackgroundImages";
import { Priorities } from "../components/Priorities";

function TodoPage() {
  const [showModal, setShowModal] = useState(false);
  const [isPriorityListVisible, setIsPriorityListVisible] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [isTagListVisible, setIsTagListVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [bgSrc, setBgSrc] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [tags, setTags] = useState(new Set<string>());
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [priority, setPriority] = useState("");

  type countDict = {
    [key: string]: number;
  };
  let priorityCounts: countDict = {};

  // define an Entry Type
  type Entry = {
    _id: string;
    userId: string;
    description: string;
    dueDate: string;
    dueTime: string;
    priority: string;
    title: string;
    tags: Array<string>;

    // Add other fields if needed
  };
  const [entries, setEntries] = useState<Entry[]>([]);
  const containerStyle = {
    gridRow: "2/6",
    gridColumn: "2/4",
    backgroundImage: `url(${bgSrc})`,
    backgroundSize: "cover",
    display: "grid",
    gridTemplateColumns: "5fr 1fr",
    gridTemplateRows: "1fr 1fr",
  };

  const handlePriority = (newPriority: string) => {
    if (newPriority === selectedPriority) {
      setSelectedPriority("");
    } else {
      setSelectedPriority(newPriority);
    }
  };

  const handleTag = (newTag: string) => {
    if (newTag === selectedTag) {
      setSelectedTag("");
    } else {
      setSelectedTag(newTag);
    }
  };

  const removeEntry = (completedEntry: Entry) => {
    setTimeout(
      () =>
        setEntries((entries) =>
          entries.filter((entry) => entry._id !== completedEntry._id)
        ),
      200
    );
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
        for (let i = 0; i < data.todos.length; i++) {
          for (let j = 0; j < data.todos[i].tags.length; j++) {
            setTags((tags) => new Set(tags).add(data.todos[i].tags[j]));
          }
        }
      }
    };
    fetchBg();
  }, [showModal]);

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
              isEditModeOn={isEditMode}
              id={id}
              savedTitle={title}
              savedDescription={description}
              savedDueDate={dueDate}
              savedDueTime={dueTime}
              savedPriority={priority}
              isOpen={showModal}
              onClose={() => setShowModal(false)}
            ></TodoModal>
          )}
          <div className={styles.list}>
            {entries.map((entry) => {
              const key = entry.priority;
              priorityCounts[key] = (priorityCounts[key] || 0) + 1;
              return (selectedPriority === "" ||
                selectedPriority === entry.priority) &&
                (selectedTag === "" || entry.tags.includes(selectedTag)) ? (
                <Entry
                  key={entry._id}
                  id={entry._id}
                  title={entry.title}
                  description={entry.description}
                  dueDate={entry.dueDate}
                  priority={entry.priority}
                  onCheck={() => removeEntry(entry)}
                  onEdit={() => {
                    setShowModal(true);
                    setIsEditMode(true);
                    setId(entry._id);
                    setTitle(entry.title);
                    setDescription(entry.description);
                    setDueDate(entry.dueDate);
                    setDueTime(entry.dueTime);
                    setPriority(entry.priority);
                  }}
                ></Entry>
              ) : null;
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
          {isTagListVisible &&
            [...tags].map((name, index) => {
              return (
                <div
                  key={index}
                  className={styles.tag}
                  onClick={(e) => handleTag(name)}
                  style={
                    selectedTag === name
                      ? { backgroundColor: "rgb(221, 221, 221)" }
                      : { backgroundColor: "white" }
                  }
                >
                  {name}
                </div>
              );
            })}
          <div className={styles.priorityList}>
            Priority &nbsp;
            <span onClick={() => togglePriorityList()}>
              {isPriorityListVisible ? "▼" : "▲"}
            </span>
          </div>
          {isPriorityListVisible && (
            <div>
              {Priorities.map((priority, index) => {
                return (
                  <div
                    key={index}
                    className={styles.pr}
                    onClick={(e) => handlePriority(priority.name)}
                    style={
                      selectedPriority === priority.name
                        ? { backgroundColor: priority.selectedColor }
                        : { backgroundColor: priority.defaultColor }
                    }
                  >
                    {priority.name}{" "}
                    <span className={styles.priorityCount}>
                      {priorityCounts[priority.name]}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
