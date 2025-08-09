import creditImg from "/images/creditImg.svg";
import styles from "./CreditPage.module.css";

const credits = [
  {
    text: "Landing Page Illustrations: Copyright 2022 Katerina Limpitsouni",
    link: null
  },
  {
    text: "Mountain photograph on home page: David Marcu on Unsplash",
    link: null
  },
  {
    text: "Cat illustration on home page: Siberian_beard on Pixabay",
    link: null
  },
  {
    text: "Leaves illustration on home page: JennyDai on Pixabay",
    link: null
  },
  {
    text: "Starry night photograph on home page: eberhard 🖐 grossgasteiger on Unsplash",
    link: null
  },
  {
    text: "Icons: Google Material Icons Library",
    link: null
  },
  {
    text: "Fun Facts (Dovico)",
    link: "https://www.dovico.com/blog/2018/03/06/time-management-facts-figures/"
  },
  {
    text: "Fun Facts (Medium - Ashruthu)",
    link: "https://medium.com/@ashruthu/list-of-interesting-facts-and-tips-about-time-management-a36cb06872fd"
  },
  {
    text: "Person icons created by Freepik - Flaticon",
    link: "https://www.flaticon.com/free-icons/person"
  },
  {
    text: "Dim sum icons created by Freepik - Flaticon",
    link: "https://www.flaticon.com/free-icons/dim-sum"
  },
  {
    text: "Dinosaur icons created by Freepik - Flaticon",
    link: "https://www.flaticon.com/free-icons/dinosaur"
  },
  {
    text: "Plant icons created by Freepik - Flaticon",
    link: "https://www.flaticon.com/free-icons/plant"
  },
  {
    text: "Drum icons created by Freepik - Flaticon",
    link: "https://www.flaticon.com/free-icons/drum"
  },
  {
    text: "Music and multimedia icons created by Freepik - Flaticon",
    link: "https://www.flaticon.com/free-icons/music-and-multimedia"
  },
  {
    text: "Guitar icons created by Freepik - Flaticon",
    link: "https://www.flaticon.com/free-icons/guitar"
  },
  {
    text: "Earphones icons created by Freepik - Flaticon",
    link: "https://www.flaticon.com/free-icons/earphones"
  },
  {
    text: "Violin icons created by Freepik - Flaticon",
    link: "https://www.flaticon.com/free-icons/violin"
  },
  {
    text: "Wizard icons created by Freepik - Flaticon",
    link: "https://www.flaticon.com/free-icons/wizard"
  },
  {
    text: "Pizza icons created by Freepik - Flaticon",
    link: "https://www.flaticon.com/free-icons/pizza"
  },
  {
    text: "Katana icons created by Freepik - Flaticon",
    link: "https://www.flaticon.com/free-icons/katana"
  },
  {
    text: "Food and restaurant icons created by Freepik - Flaticon",
    link: "https://www.flaticon.com/free-icons/food-and-restaurant"
  },
  {
    text: "Sound Effects from mixkit",
    link: "https://mixkit.co/free-sound-effects/Alarm"
  }
];

function Credits() {
  return (
    <div className={styles.grid}>
      {" "}
      <section className={styles.wrapper}>
        <img className={styles.creditImg} src={creditImg}></img>

        <div className={styles.creditContent}>
          <span className={styles.heading}>Credits</span>
          <ol className={styles.ol}>
            {credits.map((credit, key) => (
              <li key={key} className={styles.li}>
                {credit.link ? (
                  <a
                href="https://www.flaticon.com/free-icons/time-and-date"
              >
                {credit.text}
              </a>
                ) : (credit.text)}
            </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}

export default Credits;
