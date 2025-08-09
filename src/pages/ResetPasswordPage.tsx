const resetPasswordImg = "/images/resetPasswordImg.svg";
import styles from "./ResetPasswordPage.module.css";
import EditableField from "../buttons/EditableField";
import { useState } from "react";
import ActionButton from "../buttons/ActionButton";

function ResetPasswordPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [emailAlert, setEmailAlert] = useState("");
    const [passwordAlert, setPasswordAlert] = useState("");
    
  return (
    <div className={styles.grid}>
      <div className={styles.wrapper}>
        <img className={styles.resetPasswordImg} src={resetPasswordImg}></img>
        <div className={styles.input}>
          <div className={styles.resetTitle}>Reset Password</div>
          <form className={styles.reset} action="index.html" method="submit">
            <EditableField data="Email" alert={emailAlert} type="email" value={email} onChange={(v : string) => setEmail(v)}></EditableField>
            <EditableField data="Password" type="password" value={password} onChange={(v : string) => setPassword(v)}></EditableField>
            <EditableField data="New Password" alert={passwordAlert} type="password" value={newPassword} onChange={(v : string) => setNewPassword(v)}></EditableField>
            <EditableField data="Confirm New Password" alert={passwordAlert} type="password" value={confirmNewPassword} onChange={(v : string) => setConfirmNewPassword(v)}></EditableField>
            <ActionButton name="Reset"/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
