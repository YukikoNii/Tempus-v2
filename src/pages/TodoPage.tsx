import styles from "./TodoPage.module.css";
import Sidebar from "../components/Sidebar";
import AppHeader from "../components/AppHeader";
import Entry from "../components/Entry";
import "material-icons/iconfont/material-icons.css";
import TodoModal from "../components/TodoModal";
import { useState, useEffect, useMemo } from "react";
import { backgrounds } from "../assets/BackgroundImages";
import { Priorities } from "../components/Priorities";
import { EntryType } from "../types/EntryType";

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
  const [entryDetails, setEntryDetails] = useState<EntryType>({
    _id: "",
    userId: "",
    description: "",
    dueDate: "",
    dueTime: "",
    priority: "",
    title: "",
    tags: [],
  });

  const [entries, setEntries] = useState<EntryType[]>([]);

  const priorityCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    entries.forEach((entry) => {
      counts[entry.priority] = (counts[entry.priority] || 0) + 1;
    });
    return counts;
  }, [entries]);

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

  const removeEntry = (completedEntry: EntryType) => {
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
              savedEntryDetails={entryDetails}
              isOpen={showModal}
              onClose={() => setShowModal(false)}
            ></TodoModal>
          )}
          <div className={styles.list}>
            {entries.map((entry) => {
              return (selectedPriority === "" ||
                selectedPriority === entry.priority) &&
                (selectedTag === "" || entry.tags.includes(selectedTag)) ? (
                <Entry
                  key={entry._id}
                  entry={entry}
                  onCheck={() => removeEntry(entry)}
                  onEdit={() => {
                    setShowModal(true);
                    setIsEditMode(true);
                    setEntryDetails(entry);
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
                  onClick={() => handleTag(name)}
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
                    onClick={() => handlePriority(priority.name)}
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
