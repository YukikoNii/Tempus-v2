import styles from "./Hero.module.css";
import { Link } from 'react-router-dom';
const clockWoman = "/images/ClockWoman.svg";


const Hero = () => {
  return (
    <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={`${styles.phrase} ${styles.heroPhrase}`}>
              Never miss your deadlines.
            </div>
            <div className={`${styles.description} ${styles.heroDescription}`}>
              Tempus helps students to complete their tasks on time, thus
              raising their academic standards, alleviating stress, and
              improving their prospects for future career.
            </div>
            <Link
              to="/signup"
              className={`${styles.button} ${styles.heroButton}`}
            >
              Get Started
            </Link>
          </div>
          <img
            className={`${styles.image} ${styles.heroImg}`}
            src={clockWoman}
            alt="Clock and Woman"
          ></img>
    </section>
  )
}

export default Hero
