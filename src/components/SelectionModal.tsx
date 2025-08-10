import styles from "./BgModal.module.css";
import { Key, useEffect, useRef } from "react";
import { SelectableItem } from "../types/SelectableItem";

interface SelectionModalProps<T extends SelectableItem> {
    selections : T[],
    title : string;
    onClose: () => void;
    onSelect: (item : T) => void;
}

function SelectionModal<T extends SelectableItem>({ selections, title, onClose, onSelect }: SelectionModalProps<T>){
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
        <div className={styles.bgtitle}>{title}</div>
        <div className={styles.bgclose} onClick={onClose}>
          &times;
        </div>
        <div className={styles.bglist}>
          {selections.map((selection, index : Key) => (
            <div
              key={index}
              className={styles.bgop}
              onClick={() => {
                onSelect(selection);
                onClose();
              }}
            >
              <span>{selection.name}</span>
              <img
                className={styles.bgimg}
                src={selection.src}
                alt={selection.name}
              ></img>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectionModal;
