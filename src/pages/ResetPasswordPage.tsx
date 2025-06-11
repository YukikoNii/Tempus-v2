const resetPasswordImg = "/images/resetPasswordImg.svg";
import styles from "./ResetPasswordPage.module.css";

function ResetPasswordPage() {
  return (
    <div className={styles.grid}>
      <div className={styles.wrapper}>
        <img className={styles.resetPasswordImg} src={resetPasswordImg}></img>

        <div className={styles.input}>
          <div className={styles.resetTitle}>Reset Password</div>
          <form className={styles.reset} action="index.html" method="submit">
            <label htmlFor="email">
              Email<span className={styles.asterisk}>*</span>
              <span className={styles.emailAlert}>Email is incorrect.</span>
            </label>
            <input
              type="email"
              name="email"
              className={`${styles.inputField} ${styles.email}`}
            ></input>
            <label htmlFor="Password">
              New Password<span className={styles.asterisk}>*</span>
            </label>
            <input
              type="password"
              name="password"
              className={`${styles.inputField} ${styles.password}`}
            ></input>
            <label htmlFor="conPassword">
              Confirm Password<span className={styles.asterisk}>*</span>
              <span className={styles.passAlert}>Password not confirmed.</span>
            </label>
            <input
              type="password"
              className={`${styles.inputField} ${styles.confirmPassword}`}
            ></input>
            <input
              type="button"
              value="Reset"
              className={`${styles.inputField} ${styles.resetBtn}`}
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
