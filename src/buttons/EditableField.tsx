import styles from "./EditableField.module.css";
import Alert from "./Alert";
import { forwardRef, useState } from "react";


interface Props {
    data : string,
    alert? : string,
    type : string,
}
const EditableField = forwardRef(({ data, alert, type } : Props, ref)=> {

  const [val, setVal] = useState("");
  if (ref && ref.current) {
    ref.current = {
      value : val
    }  
  }
  return (
    <>
      <label className={styles.label} htmlFor={data}>
          {data}<span className={styles.asterisk}>*</span>
      </label>
      {alert && <Alert>{alert}</Alert>}
      { type == "textarea" ? (
        <textarea
          className={styles.inputField}
          value={val}
          onChange={e => setVal(e.target.value)}
          rows={4}
        />
        ) : ( 
        <input
        className={styles.inputField}
        type={type}
        value={val}
        onChange={e => setVal(e.target.value)}
        /> 
      )}    
   
    </>
  )
});

export default EditableField;
