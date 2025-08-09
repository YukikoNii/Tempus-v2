import styles from "./Alert.module.css";

interface AlertProp {
    children : React.ReactNode,
}

const Alert = ({ children } : AlertProp ) => {
  return (
    <>
        <span className={styles.alert}>{children}</span>
    </>
  )
}

export default Alert


