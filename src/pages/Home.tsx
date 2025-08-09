import styles from "./Home.module.css";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import Memo from "../components/Memo";
import BgModal from "../components/BgModal";
import { useEffect, useState, useContext, useCallback } from "react";
import { backgrounds } from "../assets/BackgroundImages";
import { homeApi } from "../services/api";
import { useClock } from "../services/useClock";
import ProfileContext from "../services/ProfileContext";


function Home() {
  const profileInfo = useContext(ProfileContext);
  const [showBgModal, setShowBgModal] = useState(false);
  const {date, time} = useClock();
  const [isOpen, setIsOpen] = useState(true);

  type EntryType = {
    _id: string;
    userId: string;
    description: string;
    dueDate: string;
    priority: string;
    title: string;
    tags: Array<string>;
  };

  const [entries, setEntries] = useState<EntryType[]>([]);

  const updateBgImage = (name: string, src: string, color: string) => {
    profileInfo.changeBgSrc(src);
    profileInfo.changeBgColor(color);
    const updateBgSetting = async () => {
      await homeApi.updateBg(name);
    };
    updateBgSetting();
  };

  useEffect(() => {
    const fetchBg = async () => {
      const data = await homeApi.get();
      setEntries(data.todos);
    }
    fetchBg();
  }, []); 


  const clockStyle = {
    gridColumn: "1/3",
    gridRow: "1",
    borderRadius: "1em",
    padding: "1em",
    backgroundImage: `url(${profileInfo.bgSrc})`,
    backgroundSize: "75em 75em",
    backgroundPosition: "0em 0em",
    display: "grid",
    gridTemplateColumns: "14fr 1fr",
    paddingLeft: "4em",
    transitionDuration: "0.3s",
  };

  const clockDivStyle = {
    color: profileInfo.bgColor,
  };

  
  const toggleSelectionModal = useCallback(() => {
    setShowBgModal(prev => !prev); // memoize
  }, []);


  return (
    <>
      <div
        className={styles.grid}
        style={isOpen ? {} : { gridTemplateColumns: "0.29fr 4fr 1fr" }}
      >
        <AppHeader></AppHeader>
        <Sidebar onToggle={() => setIsOpen(!isOpen)}></Sidebar>
        <div className={styles.container}>
          <div className={styles.clock} style={clockStyle}>
            <div
              className={`${styles.date} ${styles.clockDiv}`}
              style={clockDivStyle}
            >
              {date}
            </div>
            <div 
              className={`${styles.setting} ${styles.clockDiv}`}
              onClick={() => toggleSelectionModal()}
              style={clockDivStyle}
            > {/* should probably be a button */}
              <i className="material-icons">settings</i>
            </div>
            <div
              className={`${styles.timeDis} ${styles.clockDiv}`}
              style={clockDivStyle}
            >
              {time}
            </div>
          </div>

          <div className={styles.inContainer}>
            <div className={styles.task}>
              <span className={styles.taskHeading}>Today's tasks</span>
              {entries.length != 0 ? (
                <ul>
                  {entries.map((entry) => (
                    <li key={entry._id} className={styles.toTask}>
                      {entry.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles.noTask}>
                  There is no task for today.
                  <br />{" "}
                  <Link to="/todo" className={styles.linkTodo}>
                    add new task{" "}
                  </Link>
                </div>
              )}
            </div>
            <Memo></Memo>
          </div>
        </div>
      </div>
      {showBgModal && (
        <BgModal
          onClose={() => setShowBgModal(false)}
          onSelect={updateBgImage}
        ></BgModal>
      )}
    </>
  );
}

export default Home;
