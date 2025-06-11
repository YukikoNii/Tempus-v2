import creditImg from "/images/creditImg.svg";
import styles from "./CreditPage.module.css";

function Credits() {
  return (
    <div className={styles.grid}>
      {" "}
      <section className={styles.wrapper}>
        <img className={styles.creditImg} src={creditImg}></img>

        <div className={styles.creditContent}>
          <span className={styles.heading}>Credits</span>
          <ol className={styles.ol}>
            <li className={styles.li}>
              {" "}
              Landing Page Illustrations: Copyright 2022 Katerina Limpitsouni
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/time-and-date"
                className={styles.timeDate}
              >
                Time and date icons created by Hilmy Abiyyu A. - Flaticon
              </a>
            </li>
            <li>Mountain photograph on home page:David Marcu on Unsplash</li>
            <li>Cat illustration on home page: Siberian_beard on Pixabay</li>
            <li>Leaves illustration on home page: JennyDai on Pixabay</li>
            <li>
              Starry night photograph on home page: eberhard 🖐 grossgasteiger
              on Unsplash
            </li>
            <li>Icons: Google Material Icons Library</li>
            <li>
              Fun Facts:
              https://www.dovico.com/blog/2018/03/06/time-management-facts-figures/
            </li>
            <li>
              {" "}
              https://medium.com/@ashruthu/list-of-interesting-facts-and-tips-about-time-management-a36cb06872fd
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/person"
                title="person icons"
              >
                Person icons created by Freepik - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/dim-sum"
                title="dim sum icons"
              >
                Dim sum icons created by Freepik - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/dinosaur"
                title="dinosaur icons"
              >
                Dinosaur icons created by Freepik - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/plant"
                title="plant icons"
              >
                Plant icons created by Freepik - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/drum"
                title="drum icons"
              >
                Drum icons created by Freepik - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/music-and-multimedia"
                title="music and multimedia icons"
              >
                Music and multimedia icons created by Freepik - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/guitar"
                title="guitar icons"
              >
                Guitar icons created by Freepik - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/earphones"
                title="earphones icons"
              >
                Earphones icons created by Freepik - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/violin"
                title="violin icons"
              >
                Violin icons created by Freepik - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/wizard"
                title="wizard icons"
              >
                Wizard icons created by Freepik - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/pizza"
                title="pizza icons"
              >
                Pizza icons created by Freepik - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/katana"
                title="katana icons"
              >
                Katana icons created by Freepik - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/food-and-restaurant"
                title="food and restaurant icons"
              >
                Food and restaurant icons created by Freepik - Flaticon
              </a>
            </li>
            <li>
              <a href="https://mixkit.co/free-sound-effects/Alarm">
                {" "}
                Sound Effects from mixkit
              </a>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}

export default Credits;
