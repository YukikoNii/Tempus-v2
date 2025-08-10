
import styles from "./ProjectDropDown.module.css";
import { useEffect, useState } from "react";
import { TimeTrackingApi } from "../services/api";

interface projectProp {
  x: number,
  y: number
  onSelect: (selectedProject : string) => void;
}

const ProjectDropDown = ({ x, y, onSelect }: projectProp) => {
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
    const data = await TimeTrackingApi.getProjects();
    setProjects(data);
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

