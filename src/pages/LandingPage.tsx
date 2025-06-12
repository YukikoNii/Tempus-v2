import FeatureSummary from "../components/FeatureSummary";
const clockWoman = "/images/ClockWoman.svg";
const hourglass = "/images/logo.png";
const timer_stopwatch = "/images/Time.png";
const to_do = "/images/to_do.png";
const calendar = "/images/calendar.png";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import Header from "../components/Header";

const features = [
  {
    name: "Timer & Stopwatch",
    phrase: "Take your productivity to a new level.",
    description:
      "With our accurate and easy-to-use timer & stopwatch, you can finish your work in a limited time.",
    imgName: timer_stopwatch,
  },
  {
    name: "To-Do List",
    phrase: "Keep track of everything in a single list.",
    description:
      "With our priority and custom tags function, you can focus on most urgent tasks or your weak subjects.",
    imgName: to_do,
  },
  {
    name: "Calendar",
    phrase: "All upcoming events at a glance.",
    description:
      "Our minimal calendar with today's date highlighted allows you to see how much time you have until your deadlines.",
    imgName: calendar,
  },
];

function LandingPage() {
  return (
    <>
      <Header></Header>
      <div className={styles.grid}>
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

        {features.map((feature, index) => (
          <FeatureSummary
            key={index}
            index={index}
            name={feature.name}
            phrase={feature.phrase}
            description={feature.description}
            buttonLabel="Start Now →"
            imgName={feature.imgName}
          ></FeatureSummary>
        ))}

        <section className={styles.bottom}>
          <div className={styles.bottomContainer}>
            <div className={styles.bottomNames}>
              <img className={styles.bottomLogo} src={hourglass}></img>
              <div className={styles.bottomTitle}>Tempus</div>
              <div className={styles.bottomDescription}>
                <span>This website was made for G10 Personal Project.</span>
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
              <span></span>
              <span></span>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.ft}>©2022 Tempus</div>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;
