const hamburgerMenuImg2 = "/images/menuOpened.png";
const homeImg = "/images/homeUnselected.png";
const clockImg = "/images/clockUnselected.png";
const todoImg = "/images/todoUnselected.png";
const calendarImg = "/images/calendarUnselected.png";
import { sidebarImages } from "../assets/SidebarImages";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentPage = location.pathname.split("/")[1];
  return (
    <div className={styles.iconbar}>
      <div className={styles.menu}>
        <img
          src={hamburgerMenuImg2}
          alt="Hamburger Menu"
          className={styles.sideimg}
        ></img>
      </div>
      <Link
        to="/home"
        className={currentPage === "home" ? styles.selected : ""}
      >
        <img src={homeImg} alt="home" className={styles.sideimg}></img>
        <div className={`${styles.icon} ${styles.home}`}>Home</div>
      </Link>

      <Link
        to="/stopwatch"
        className={currentPage === "stopwatch" ? styles.selected : ""}
      >
        <img src={clockImg} alt="clock" className={styles.sideimg}></img>
        <div className={`${styles.icon} ${styles.time}`}>Timer/Stopwatch</div>
      </Link>
      <Link
        to="/todo"
        className={currentPage === "todo" ? styles.selected : ""}
      >
        <img src={todoImg} alt="todo" className={styles.sideimg}></img>
        <div className={`${styles.icon} ${styles.todo}`}>To-Do</div>
      </Link>
      <Link
        to="/calendar"
        className={currentPage === "calendar" ? styles.selected : ""}
      >
        <img src={calendarImg} alt="calendar" className={styles.sideimg}></img>
        <div className={`${styles.icon} ${styles.calendar}`}>Calendar</div>
      </Link>
    </div>
  );
};

export default Sidebar;
