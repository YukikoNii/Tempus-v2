import styles from "./TimeLogCalendarView.module.css";
import {useEffect} from "react";

const TimeLogCalendarView = () => {
    const VITE_URL = import.meta.env.VITE_URL;

    const today = new Date();
    const monday = new Date(); 
    monday.setDate(today.getDate() - (today.getDay() - 1));
    monday.setHours(0, 0, 0, 0);
    const mondayDay = monday.getDate();

    const hours = []
    const daysThisWeek = []
    for (let i = 0; i < 24; i++) {
        hours.push(i);
    }
    for (let i = 0; i < 7; i++) {
        daysThisWeek.push(mondayDay + i);
    }

    useEffect(() => {
       const getEventsThisWeek = async () => {
        const url = new URL(`${VITE_URL}data/timeLogCalendar/events/thisWeek`);
        console.log(monday.getTime());
        const weekStart = monday.getTime();
        url.searchParams.set("weekStart", weekStart.toString());
        const res = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        })
        if (res) {
            const data = await res.json();
            console.log(data);
        }
       }
       getEventsThisWeek();
    }, [])

    return (
        <div className={styles.week}>
        <div className={styles.timeDisplay}>
            {hours.map((hour, index) => (
                <div key={index} className={styles.hour}>{hour}:00</div>
            ))}
        </div>
        {daysThisWeek.map((day, dayIndex) => (
            <div key={dayIndex} className={styles.day}>{day}</div>
        ))}
        </div>
    )
}

export default TimeLogCalendarView;