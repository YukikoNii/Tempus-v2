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
      <section className={styles.s3}>
        <div className={styles.sub} id={styles.sub2}>
          {name}
        </div>
        <div className={styles.phrase} id={styles.phrase3}>
          {phrase}
        </div>
        <div className={styles.des} id={styles.des3}>
          {description}
        </div>
        <Link to="/signup" className={styles.button} id={styles.btn3}>
          {buttonLabel}
        </Link>
        <img className={styles.img3} src={imgName} alt={name}></img>
      </section>
    </>
  );
};

export default FeatureSummary;
