import styles from "./FeatureSummary.module.css";
import { Link } from "react-router-dom";

interface Props {
  index: number;
  name: string;
  phrase: string;
  description: string;
  buttonLabel: string;
  imgName: string;
}

const FeatureSummary = ({
  index, // TODO: use index to do alternate styling
  name,
  phrase,
  description,
  buttonLabel,
  imgName,
}: Props) => {
  return (
    <>
      <section className={styles.summary}>
        <div className={styles.sub}>
          {name}
        </div>
        <div className={styles.phrase}>
          {phrase}
        </div>
        <div className={styles.des}>
          {description}
        </div>
        <Link to="/signup" className={styles.button}>
          {buttonLabel}
        </Link>
        <img className={styles.img} src={imgName} alt={name}></img>
      </section>
    </>
  );
};

export default FeatureSummary;
