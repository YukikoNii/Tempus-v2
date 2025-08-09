const contactImg = "/images/creditImg.svg";
import styles from "./ContactFormPage.module.css";
import Header from "../components/Header";
import EditableField from "../buttons/EditableField";
import ActionButton from "../buttons/ActionButton";
import { useState } from "react";

function ContactFormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [emailAlert, setEmailAlert] = useState("Please enter valid email address.");

  return (
    <>
      <Header></Header>
      <div className={styles.grid}>
        <div className={styles.wrapper}>
          <img className={styles.contactImg} src={contactImg}></img>
          <div className={styles.input}>
            <div className={styles.contactHeading}>Contact Us</div>
            <form className={styles.contactForm} method="POST">
              <EditableField data="Name" value={name} type="text" onChange={(v : string) => setName(v)}></EditableField>
              <EditableField data="Email" value={email} alert={emailAlert} type="Email" onChange={(v : string) => setEmail(v)}></EditableField>
                 <span className={styles.emailAlert}> {/*TODO - fix this */}
                 
                </span>
              <EditableField data="Phone Number" value={phoneNumber} type="text" onChange={(v : string) => setPhoneNumber(v)}></EditableField>
              <EditableField data="Message" value={message} type="textarea" onChange={(v : string) => setMessage(v)}></EditableField>
              <ActionButton name="Send"/>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactFormPage;
