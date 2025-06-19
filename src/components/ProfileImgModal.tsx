import { ProfileImages } from "../assets/ProfileImages";
import styles from "./ProfileImgModal.module.css";
import { useEffect, useRef } from "react";

interface ProfileImgModalProps {
  onClose: () => void;
  onSelect: (name: string, src: string) => void;
}

const ProfileImgModal = ({ onClose, onSelect }: ProfileImgModalProps) => {
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
    <div className={styles.proModal}>
      <div className={styles.proModalContent} ref={modalRef}>
        <div className={styles.proTitle}>Change Profile Picture</div>
        <div className={styles.proClose} onClick={onClose}>
          &times;
        </div>
        <div className={styles.proList}>
          {ProfileImages.map((ProfileImage, index) => (
            <div
              key={index}
              className={styles.propImg}
              onClick={() => {
                onClose();
                onSelect(ProfileImage.name, ProfileImage.src);
              }}
            >
              <img
                className={styles.img}
                src={ProfileImage.src}
                alt={ProfileImage.name}
              ></img>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileImgModal;
