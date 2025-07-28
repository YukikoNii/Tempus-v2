
import styles from "./ProjectDropDown.module.css";
import { useEffect, useState, useRef } from "react";

interface projectProp {
  x: number,
  y: number
  onSelect: (selectedProject : string) => void;
}

const ProjectDropDown = ({ x, y, onSelect }: projectProp) => {
  const URL = import.meta.env.VITE_URL;
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const style: React.CSSProperties= { 
    position: "absolute",
    left: x,
    top: y,
  };

  type ProjectType = {
    name: string,
    color: string
  }

  const fetchProjects = async () => {
    const res = await fetch(`${URL}data/projectDropDown`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res) {
      const data = await res.json();
      setProjects(data);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [])

  return (
    <>
        <div className={styles.dropDown} style={style}>
            <div className={styles.dropDownContent}>
                {projects.map((project, key) => (
                  <button
                    key={key}
                    className={styles.projectOption}
                    onClick={() => onSelect(project.name)}
                    style={{backgroundColor: project.color}}
                    >{project.name}</button>
                  )
                )}
            </div>
        </div>
    </>
  );
};

export default ProjectDropDown;

