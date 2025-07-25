
import styles from "./ProjectDropDown.module.css";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

interface projectNamePos {
  x: number,
  y: number
}

const ProjectDropDown = ({ x, y }: projectNamePos) => {
  const URL = import.meta.env.VITE_URL;
  const [text, setText] = useState("");
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
                <div>Personal Development</div>
                <div>Health</div>
                <div>Leisure</div>
            </div>
        </div>
    </>
  );
};

export default ProjectDropDown;

