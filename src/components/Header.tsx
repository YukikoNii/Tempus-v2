import styles from "./Header.module.css";
const logoImg = "/images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className={`${styles.header} ${styles.sticky}`}>
        <img className={styles.logo} src={logoImg} alt="hourglass logo"></img>
        <Link to="/" className={styles.title}>
          Tempus
        </Link>
        <Link to="/" className={styles.features}>
          Features
        </Link>
        <Link to="/" className={styles.resources}>
          Resources
        </Link>
        <Link to="/login" className={styles.login}>
          Login
        </Link>
        <Link to="/signup" className={styles.signup}>
          Sign up
        </Link>
      </header>
    </>
  );
};

export default Header;
