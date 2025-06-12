import styles from "./TodoModal.module.css";

interface TodoModalProps {
  onClose: () => void;
}

const TodoModal = ({ onClose }: TodoModalProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.modalContent}>
        <div className={styles.heading}>New Task</div>
        <div className={styles.title}>
          <label className={styles.titleLabel}>
            Title<span className={styles.titleAlert}>*</span>
          </label>
          <input type="text" className={styles.titleInput} />
        </div>
        <div className={styles.description}>
          <label className={styles.deslabel}>Description</label>
          <textarea className={styles.desinput}></textarea>
        </div>
        <div className={styles.options}>
          <label className={styles.oplabel}>Options</label>
          <div className={styles.dateAndTime}>
            <label className={styles.datelabel}>Due Date</label>
            <input type="date" className={styles.date} />
            <input type="time" className={styles.time} />
            <label className={styles.remlabel}>Reminder</label>
            <label className={styles.reminder}>
              <input type="checkbox" />
              <span className={styles.remtoggle}></span>
            </label>
          </div>
          <div className={styles.tag}>
            <label className={styles.taglabel}>Tag</label>
            <div className={styles.tagContainer}>
              <div className={styles.tagBox}>
                <input className={styles.tagInput} />
              </div>
            </div>
          </div>
          <div className={styles.priority}>
            <label className={styles.prlabel}>Priority</label>
            <select className={styles.prchoice}>
              <option>High </option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
        <button className={styles.save}>Add</button>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default TodoModal;
