import styles from "./TimePage.module.css";
import Sidebar from "../components/Sidebar";
import { Timer } from "../components/Timer";
import AppHeader from "../components/AppHeader";
import { useState, useContext } from "react";
import { Stopwatch } from "../components/Stopwatch";
import TabSelection from "../components/TabSelection";
import SidebarContext from "../services/SidebarContext";

function Time() {
  const SidebarCtx = useContext(SidebarContext);
  const [selectedTab, setSelectedTab] = useState<string>("Stopwatch");
  const tabs: { [key:string] : JSX.Element }= {
    "Stopwatch": <Stopwatch />,
    "Timer": <Timer />
  };

  
  return (
    <div
       className={SidebarCtx.isOpen ? styles.gridNormal : styles.gridWide  }
    >
      <AppHeader></AppHeader>
      <Sidebar></Sidebar>
      <TabSelection tabs={["Stopwatch", "Timer"]} select={(s : string) => setSelectedTab(s)}></TabSelection>
      {tabs[selectedTab]}

    </div>
  );
}

export default Time;
