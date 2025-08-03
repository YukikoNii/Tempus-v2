import styles from "./Button.module.css";

const ActionButton = ({name} : { name : string}) => {
  return (
     <input
        type="submit"
        value={name}
        className={`${styles.btn} ${styles.inputField}`}>
    </input>
  )
}


export default ActionButton
