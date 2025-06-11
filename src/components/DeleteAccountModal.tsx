import styles from "./DeleteAccountModal.module.css";

interface DeleteAccountModalProps {
  onClose: () => void;
}

const DeleteAccountModal = ({ onClose }: DeleteAccountModalProps) => {
  return (
    <div className={styles.delModal}>
      <div className={styles.delModalContent}>
        <span>Do you really want to delete your account?</span>
        <button
          type="button"
          name="button"
          className={styles.delCancel}
          onClick={onClose}
        >
          Cancel
        </button>
        <button type="button" name="button" className={styles.delDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
