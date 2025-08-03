import styles from "./Alert.module.css";

interface AlertProp {
    text : string,
}

const Alert = ({ text } : AlertProp ) => {
  return (
    <>
    <span className={styles.alert}>{text}</span>
    </>
  )
}

export default Alert


