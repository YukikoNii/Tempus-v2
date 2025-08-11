const menuOpenedImg = "/images/menuOpened.png";
const menuClosedImg = "/images/menuClosed.png";
import { Pages } from "./Pages";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import SidebarContext from "../services/SidebarContext";



const Sidebar = () => {
  const sidebarCtx = useContext(SidebarContext);
  const location = useLocation();
  const currentPage = location.pathname.split("/")[1];

  const iconbarClosedStyle = {
    width: "34%",
    minWidth: "5em",
  };

  return (
    <div className={styles.iconbar} style={sidebarCtx.isOpen ? {} : iconbarClosedStyle}>
      <div className={styles.menu}>
        <img
          src={sidebarCtx.isOpen ? menuOpenedImg : menuClosedImg}
          alt="Hamburger Menu"
          className={styles.sideimg}
          onClick={sidebarCtx.toggleSidebar}
        ></img>
      </div>
      {Pages.map((page, index) => {
        return (
          <Link
            key={index}
            to={`/${page.name}`}
            className={currentPage === page.name ? styles.selected : ""}
          >
            <img
              src={currentPage === page.name ? page.selected : page.unselected}
              alt={page.name}
              className={styles.sideimg}
            ></img>
            <div
              className={styles.icon}
              style={sidebarCtx.isOpen ? {} : { display: "none" }}
            >
              {page.name.charAt(0).toUpperCase() + page.name.slice(1)}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
