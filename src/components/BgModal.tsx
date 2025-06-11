import { backgrounds } from "../assets/BackgroundImages";
import styles from "./BgModal.module.css";

interface BgModalProps {
  onClose: () => void;
  onSelect: (arg0: string, arg1: string, arg2: string) => void;
}

const BgModal = ({ onClose, onSelect }: BgModalProps) => {
  return (
    <div className={styles.bgmodal}>
      <div className={styles.bgmodalContent}>
        <div className={styles.bgtitle}>Change Theme</div>
        <div className={styles.bgclose} onClick={onClose}>
          &times;
        </div>
        <div className={styles.bglist}>
          {backgrounds.map((background, index) => (
            <div
              key={index}
              className={styles.bgop}
              onClick={() => {
                onSelect(background.name, background.src, background.color);
                onClose();
              }}
            >
              <span>{background.name}</span>
              <img
                className={styles.bgimg}
                src={background.src}
                alt={background.name}
              ></img>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BgModal;
