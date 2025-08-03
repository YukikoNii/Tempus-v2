import styles from "./EditableField.module.css";

interface Props {
    data : string,
    value : string,
    type : string,
    onChange : ( value : string) => void
}
const EditableField = ({data, value, type, onChange} : Props) => {
    
  return (
    <>
      <label className={styles.label} htmlFor={data}>
            {data}<span className={styles.asterisk}>*</span>
        </label>
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
