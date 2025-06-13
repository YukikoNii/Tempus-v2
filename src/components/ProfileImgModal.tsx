import { ProfileImages } from "../assets/ProfileImages";
import styles from "./ProfileImgModal.module.css";

interface ProfileImgModalProps {
  onClose: () => void;
  onSelect: (name: string, src: string) => void;
}

const ProfileImgModal = ({ onClose, onSelect }: ProfileImgModalProps) => {
  return (
    <div className={styles.proModal}>
      <div className={styles.proModalContent}>
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
