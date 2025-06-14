import logoImg from "../assets/images/logo.png";
import styles from "./CalendarPage.module.css";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import "material-icons/iconfont/material-icons.css";
import { useState, useEffect } from "react";

function Calendar() {
  const [isOpen, setIsOpen] = useState(true);
  const [days, setDays] = useState<JSX.Element[]>([]); // create an array of JSX Elements
  const [date, setDate] = useState(new Date());

  // months array
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    // set the date to 1
    date.setDate(1);

    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // get last day of the month
    const lastDay = lastDate.getDate();

    // get day of the week of the first day of the month
    const firstDayIndex = date.getDay();

    // get last day of last month
    const prevLastDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();

    // get day of the week of the last day of the month
    const lastDayIndex = lastDate.getDay();

    // calculate how many days of the next month will be on the calendar
    const nextMonthDays = 6 - lastDayIndex;

    let newDays: JSX.Element[] = [];

    // display last few days of the last month, depending on what day of the week this month starts
    for (let i = firstDayIndex; i > 0; i--) {
      newDays.push(
        <div
          key={String(date.getMonth() - 1) + String(i)}
          className={styles.prevDate}
        >
          {prevLastDay - i + 1}
        </div>
      ); // Push JSX elements
    }

    for (let i = 1; i <= lastDay; i++) {
      // if the date matches with today's date
      if (
        i === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
      ) {
        newDays.push(
          <div
            key={String(date.getMonth()) + String(i)}
            className={styles.today}
          >
            <span>{i}</span>
          </div>
        );
      } else {
        newDays.push(
          <div
            key={String(date.getMonth() + 1) + String(i)}
            className={styles.day}
          >
            <span>{i}</span>
          </div>
        );
      }
    }

    // display the first few days of next month
    for (let i = 1; i <= nextMonthDays; i++) {
      newDays.push(
        <div
          key={String(date.getMonth()) + String(i)}
          className={styles.nextDate}
        >
          {i}
        </div>
      );
    }

    setDays(newDays);
  }, [date]);

  // get prev arrow
  // prev.addEventListener("click", prevMonth);
  // get next arrow
  // next.addEventListener("click", nextMonth);

  function nextMonth() {
    // increase the month by 1
    let newDate = new Date(date); // need to create new Date to trigger useEffect
    newDate.setMonth(date.getMonth() + 1);
    setDate(newDate);
  }

  function prevMonth() {
    // decrease the month by 1
    let newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    setDate(newDate);
  }

  return (
    <div
      className={styles.grid}
      style={isOpen ? {} : { gridTemplateColumns: "0.29fr 4fr 1fr" }}
    >
      <AppHeader></AppHeader>
      <Sidebar onToggle={() => setIsOpen(!isOpen)}></Sidebar>

      <div className={styles.calendarFunction}>
        <div className={styles.month}>
          <i className="material-icons prev" onClick={prevMonth}>
            navigate_before
          </i>
          <div className={styles.date}>
            <h1>{months[date.getMonth()] + " " + date.getFullYear()}</h1>
            <p>{new Date().toDateString()}</p>
          </div>
          <i className="material-icons next" onClick={nextMonth}>
            navigate_next
          </i>
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
        <div className={styles.days}>{days}</div>
      </div>
    </div>
  );
}

export default Calendar;
