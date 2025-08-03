import styles from "./TabSelection.module.css";

interface TabProp {
    tabs : string[];
    select: (s : string) => void; 
}
const TabSelection = ({ tabs, select } : TabProp ) => {
  return (
    <div className={styles.tabSelection}>
      {tabs.map((tab) => (
        <div
          key={tab}
          className={styles.selection}
          onClick={() => select(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  )
}

export default TabSelection
