import styles from "./EditableField.module.css";
import Alert from "./Alert";

interface Props {
    data : string,
    alert? : string,
    value : string,
    type : string,
    onChange : ( value : string) => void
}
const EditableField = ({data, alert, value, type, onChange} : Props) => {
    
  return (
    <>
      <label className={styles.label} htmlFor={data}>
          {data}<span className={styles.asterisk}>*</span>
      </label>
      {alert && <Alert text={alert}></Alert>}
    { type == "textarea" ? (
      <textarea
        className={styles.inputField}
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={4}
      />
    ) : ( 
      <input
      className={styles.inputField}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      /> 
    )}    
   
    </>
  )
}

export default EditableField
