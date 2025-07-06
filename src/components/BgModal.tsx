import { backgrounds } from "../assets/BackgroundImages";
import styles from "./BgModal.module.css";
import { useEffect, useRef } from "react";

interface BgModalProps {
  onClose: () => void;
  onSelect: (name: string, src: string, color: string) => void;
}

const BgModal = ({ onClose, onSelect }: BgModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className={styles.bgmodal}>
      <div className={styles.bgmodalContent} ref={modalRef}>
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
