import { Link } from 'react-router-dom'
import styles from "./Footer.module.css";
const hourglass = "/images/logo.png";


const Footer = () => {
  return (
    <>
    <section className={styles.bottom}>
          <div className={styles.bottomContainer}>
            <div className={styles.bottomNames}>
              <img className={styles.bottomLogo} src={hourglass}></img>
              <div className={styles.bottomTitle}>Tempus</div>
              <div className={styles.bottomDescription}>
                <span>Some nice description here.</span>
              </div>
            </div>
            <div className={`${styles.bottomTopics} ${styles.first}`}>
              <div className={styles.bottomTopicHeading}>Contact</div>
              <span className={styles.bottomTopic}>
                <Link className={styles.bottomTopicLink} to="/contact">
                  Contact Form
                </Link>
              </span>
              <span className={styles.bottomTopic}>
                <Link className={styles.bottomTopicLink} to="/credits">
                  Credits
                </Link>
              </span>
              <span></span>
            </div>
            <div className={styles.bottomTopics}>
              <div className={styles.bottomTopicHeading}>Support</div>
              <span className={styles.bottomTopic}>Coming soon...</span>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.ft}>©2022 Tempus</div>
        </footer>
      
    </>
  )
}

export default Footer
