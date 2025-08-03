import styles from "./TimePage.module.css";
import Sidebar from "../components/Sidebar";
import { Timer } from "../components/Timer";
import AppHeader from "../components/AppHeader";
import { useState } from "react";
import { Stopwatch } from "../components/Stopwatch";
import TabSelection from "../components/TabSelection";

function Time() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string>("Stopwatch");
  const tabs: { [key:string] : JSX.Element }= {
    "Stopwatch": <Stopwatch />,
    "Timer": <Timer />
  };

  
  return (
    <div
      className={styles.grid}
      style={isOpen ? {} : { gridTemplateColumns: "0.29fr 4fr 1fr" }}
    >
      <AppHeader></AppHeader>
      <Sidebar onToggle={() => setIsOpen(!isOpen)}></Sidebar>
      <TabSelection tabs={["Stopwatch", "Timer"]} select={(s : string) => setSelectedTab(s)}></TabSelection>
      {tabs[selectedTab]}

    </div>
  );
}

export default Time;
