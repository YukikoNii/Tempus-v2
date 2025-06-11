const contactImg = "/images/creditImg.svg";
import styles from "./ContactFormPage.module.css";

function ContactFormPage() {
  return (
    <div className={styles.grid}>
      <div className={styles.wrapper}>
        <img className={styles.contactImg} src={contactImg}></img>

        <div className={styles.input}>
          <div className={styles.contactHeading}>Contact Us</div>
          <form
            className={styles.contactForm}
            action="Personal-Project-Form.php"
            method="POST"
          >
            <label className={styles.label} htmlFor="name">
              Name<span className={styles.asterisk}>*</span>
            </label>
            <input className={styles.inputField} type="text" id="name"></input>
            <label className={styles.label} htmlFor="Email">
              Email<span className={styles.asterisk}>*</span>
              <span className={styles.emailAlert}>
                Please enter valid email address.
              </span>
            </label>
            <input
              className={styles.inputField}
              type="email"
              id="Email"
            ></input>
            <label className={styles.label} htmlFor="phone">
              Phone Number
            </label>
            <input className={styles.inputField} type="text" id="phone"></input>
            <label className={styles.label} htmlFor="Message">
              Message<span className={styles.asterisk}>*</span>
            </label>
            <textarea className={styles.messageField}></textarea>
            <input
              type="button"
              value="send"
              className={`${styles.submitBtn} ${styles.inputField}`}
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactFormPage;
