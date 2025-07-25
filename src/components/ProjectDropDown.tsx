
import styles from "./ProjectDropDown.module.css";
import { useEffect, useState, useRef } from "react";

interface projectProp {
  x: number,
  y: number
  onSelect: (selectedProject : string) => void;
}

const ProjectDropDown = ({ x, y, onSelect }: projectProp) => {
  const URL = import.meta.env.VITE_URL;
  const isInitialMount = useRef(true);

  const style: React.CSSProperties= { 
    position: "absolute",
    left: x,
    top: y,
  };
  return (
    <>
        <div className={styles.dropDown} style={style}>
            <div className={styles.dropDownContent}>
                <button value="No Project" className={styles.projectOption} onClick={() => onSelect("No Project")}>No Project</button>
                <button className={styles.projectOption} onClick={() => onSelect("Personal Development")}>Personal Development</button>
                <button className={styles.projectOption} onClick={() => onSelect("Health")}>Health</button>
                <button className={styles.projectOption} onClick={() => onSelect("Leisure")}>Leisure</button>
            </div>
        </div>
    </>
  );
};

export default ProjectDropDown;

