import styles from "./Home.module.css";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import BgModal from "../components/BgModal";
import { useEffect, useState } from "react";
import { backgrounds } from "../assets/BackgroundImages";

function Home() {
  const greetArr = ["Good Morning", "Hello", "Good Evening"];
  const [showBgModal, setShowBgModal] = useState(false);
  const [bgSrc, setBgSrc] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [clockDivColor, setClockDivColor] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const updateBgImage = (name: string, src: string, color: string) => {
    setBgSrc(src);
    setClockDivColor(color);
    const updateBgSetting = async () => {
      const res = await fetch("http://localhost:5050/data/home", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bgName: name }),
      });
    };
    updateBgSetting();
  };

  useEffect(() => {
    const fetchBg = async () => {
      const res = await fetch("http://localhost:5050/data/home", {
        method: "GET",
        credentials: "include",
      });
      if (res) {
        const data = await res.json();
        const selectedBg = backgrounds.find((bg) => bg.name == data.bgName);
        if (selectedBg) {
          setBgSrc(selectedBg.src);
          setClockDivColor(selectedBg.color);
        }
      }
    };
    fetchBg();
  }, []); // [] to only execute once

  useEffect(() => {
    const myInterval = setInterval(() => {
      let currentDate = new Date();
      let day = currentDate.getDate();
      let month = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(
        currentDate
      );
      let weekday = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
      }).format(currentDate);
      let year = currentDate.getFullYear();
      setDate(weekday + ", " + month + " " + day + ", " + year);
    });
  }, []);

  const clockStyle = {
    gridColumn: "1/3",
    gridRow: "1",
    borderRadius: "1em",
    padding: "1em",
    backgroundImage: `url(${bgSrc})`,
    backgroundSize: "75em 75em",
    backgroundPosition: "0em 0em",
    display: "grid",
    gridTemplateColumns: "14fr 1fr",
    paddingLeft: "4em",
    transitionDuration: "0.3s",
  };

  const clockDivStyle = {
    color: clockDivColor,
  };

  const updateTime = () => {
    const formattedTime = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date());
    setTime(formattedTime);
  };

  const toggleSelectionModal = () => {
    console.log("hello");
    setShowBgModal(true);
  };

  useEffect(() => {
    let date = new Date();
    let hourOfDay = date.getHours();

    let greeting;
    if (hourOfDay >= 0 && hourOfDay < 12) {
      greeting = greetArr[0];
    } else if (hourOfDay >= 12 && hourOfDay <= 18) {
      greeting = greetArr[1];
    } else {
      greeting = greetArr[2];
    }

    setTime(greeting); // show greeting instead of time for the first few seconds

    const myTimeout = setTimeout(() => {
      const myInterval = setInterval(() => {
        updateTime();
      }, 100);
    }, 3000);
  }, []);

  // display facts
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
            >
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
              <span>Today's tasks</span>
            </div>
            <div className={styles.stats}>
              <span>Stats</span>
            </div>
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
