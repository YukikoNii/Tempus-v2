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
              <EditableField data="Name" type="text"></EditableField>
              <EditableField data="Email" alert={emailAlert} type="Email"></EditableField>
              <EditableField data="Phone Number" type="text"></EditableField>
              <EditableField data="Message" type="textarea"></EditableField>
              <ActionButton name="Send"/>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactFormPage;
