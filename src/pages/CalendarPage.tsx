import logoImg from "../assets/images/logo.png";
import styles from "./CalendarPage.module.css";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import "material-icons/iconfont/material-icons.css";
import { useState } from "react";

function Calendar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={styles.grid}
      style={isOpen ? {} : { gridTemplateColumns: "0.29fr 4fr 1fr" }}
    >
      <AppHeader></AppHeader>
      <Sidebar onToggle={() => setIsOpen(!isOpen)}></Sidebar>

      <div className={styles.calendarFunction}>
        <div className={styles.month}>
          <i className="material-icons prev">navigate_before</i>
          <div className={styles.date}>
            <h1></h1>
            <p></p>
          </div>
          <i className="material-icons next">navigate_next</i>
        </div>
        <div className={styles.weekdays}>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className={styles.days}></div>
      </div>
    </div>
  );
}

export default Calendar;
