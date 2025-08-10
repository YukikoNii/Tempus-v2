const signupImg = "/images/signupImg.svg";
import styles from "./SignupPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import Header from "../components/Header";
import EditableField from "../buttons/EditableField";
import ActionButton from "../buttons/ActionButton";
import { authApi } from "../services/api"; 

function SignupPage() {
  const navigate = useNavigate(); 
  const usernameRef = useRef({value : ""});
  const emailRef = useRef({value : ""});
  const passwordRef = useRef({value : ""});
  const confirmPasswordRef = useRef({value : ""});
  const [emailAlert, setEmailAlert] = useState("");
  const [passwordAlert, setPasswordAlert] = useState("");
  const [usernameExistsAlert, setUsernameExistsAlert] = useState("");

  interface SignupFormEvent extends React.FormEvent<HTMLFormElement> {}

  async function handleSubmit(e: SignupFormEvent) {
    e.preventDefault();

    if (
      IsFormFilled() &&
      checkPasswordMatch(passwordRef.current.value, confirmPasswordRef.current.value) &&
      validateEmail(emailRef.current.value) &&
      validatePassword()
    ) {
      try {
          const data = await authApi.signup(usernameRef.current.value, emailRef.current.value, passwordRef.current.value);
          if (data.type && data.type === "email") {
            setEmailAlert("Account with this email already exists");
        } else if (data.type && data.type === "username") {
            setUsernameExistsAlert("This username is already taken.");
        } else {
            navigate("/home", { state: { username: usernameRef.current.value } });
        }
      } catch (e) {
      }
    } 
  }

  const IsFormFilled = () => {
    return (
      passwordRef.current.value !== "" &&
      confirmPasswordRef.current.value !== "" &&
      usernameRef.current.value !== "" &&
      emailRef.current.value !== ""
    );
  };

  const validateEmail = (email: string) => {
    const expression =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
    if (email.match(expression)) {
      setEmailAlert("");
      return true;
    } else {
      setEmailAlert("Please enter a valid email address.");
      return false;
    }
  };

  const validatePassword = () => {
    const MIN_LENGTH = 8;
    const lowerAlphabet = /.*[a-z].*/;
    const upperAlphabet = /.*[A-Z].*/;
    const number = /.*[0-9].*/;
    const symbol = /.*[^0-9a-zA-Z].*/;
    return passwordRef.current.value.length >= MIN_LENGTH;
  };

  const checkPasswordMatch = (password: string, confirmPassword: string) => {
    if (password === confirmPassword) {
      setPasswordAlert("");
      return true;
    } else {
      setPasswordAlert("Passwords do not match.");
      return false;
    }
  };

  
  return (
    <>
      <Header></Header>
      <div className={styles.grid}>
        <div className={styles.wrapper}>
          <img className={styles.signupImage} src={signupImg} alt="Sign up"/>
          <div className={styles.input}>
            <div className={styles.signupTitle}>Sign up</div>
            <form className={styles.signup} onSubmit={handleSubmit}>
              <div className={styles.toLogin}>
                Already have an account?{" "}
                <Link className={styles.loginLink} to="/login">
                  Login
                </Link>
              </div>
              <EditableField ref={usernameRef} data="Username" alert={usernameExistsAlert} type="text"></EditableField>
              <EditableField ref={emailRef} data="Email" alert={emailAlert} type="text"></EditableField>
              <EditableField ref={passwordRef} data="Password" type="password"></EditableField>
              <EditableField ref={confirmPasswordRef} data="Confirm Password" alert={passwordAlert} type="password"></EditableField>
              <p className={validatePassword() ? styles.checked : styles.unchecked}>
                {/* TODO: length not updated */}
                {passwordRef.current.value.length >= 8 ? "✓" : "•"}At least 8 characters{passwordRef.current.value.length}
              </p>
              <ActionButton name="Submit"/>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage; 
