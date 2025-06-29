const signupImg = "/images/signupImg.svg";
import styles from "./SignupPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";

function SignupPage() {
  const navigate = useNavigate(); //initialize the hook
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const [passwordAlert, setPasswordAlert] = useState("");
  const [usernameExistsAlert, setUsernameExistsAlert] = useState("");
  const [emailExistsAlert, setEmailExistsAlert] = useState("");
  const URL = import.meta.env.VITE_URL;

  interface SignupFormEvent extends React.FormEvent<HTMLFormElement> {}

  async function handleSubmit(e: SignupFormEvent) {
    e.preventDefault();

    if (
      IsFormFilled() &&
      checkPasswordMatch(password, confirmPassword) &&
      validateEmail(email) &&
      validatePassword()
    ) {
      try {
        const info = { username, email, password };

        const response = await fetch(`${URL}data/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(info),
        });
        if (response.ok) {
          navigate("/home", { state: { username: username } });
        } else {
          const data = await response.json();
          if (data.type === "email") {
            setEmailExistsAlert("Account with this email already exists");
          } else {
            setUsernameExistsAlert("This username is already taken.");
          }
          console.log("unsuccessful");
        }
      } catch (e) {}
    } else {
      console.log("invalid");
    }
  }

  const IsFormFilled = () => {
    return (
      password !== "" &&
      confirmPassword !== "" &&
      username !== "" &&
      email !== ""
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
    return password.length >= MIN_LENGTH;
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

  let passwordConditionText =
    password.length >= 8 ? styles.checked : styles.unchecked;

  return (
    <>
      <Header></Header>
      <div className={styles.grid}>
        <div className={styles.wrapper}>
          <img className={styles.signupImage} src={signupImg} alt="Sign up" />

          <div className={styles.input}>
            <div className={styles.signupTitle}>Sign up</div>
            <form className={styles.signup} onSubmit={handleSubmit}>
              <div className={styles.toLogin}>
                Already have an account?{" "}
                <Link className={styles.loginLink} to="/login">
                  Login
                </Link>
              </div>
              {usernameExistsAlert && (
                <span className={styles.usernameExistsAlert}>
                  {usernameExistsAlert}
                </span>
              )}
              {emailExistsAlert && (
                <span className={styles.emailExistsAlert}>
                  {emailExistsAlert}
                </span>
              )}
              <label className={styles.label} htmlFor="Username">
                Username<span className={styles.asterisk}>*</span>
              </label>
              <input
                className={styles.inputField}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className={styles.label} htmlFor="Email">
                Email<span className={styles.asterisk}>*</span>{" "}
              </label>
              {emailAlert && (
                <span className={styles.emailAlert}>{emailAlert}</span>
              )}
              <input
                className={styles.inputField}
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className={styles.label} htmlFor="Password">
                Password<span className={styles.asterisk}>*</span>
              </label>
              <input
                className={styles.inputField}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label className={styles.label} htmlFor="conPassword">
                Confirm Password<span className={styles.asterisk}>*</span>
              </label>
              {passwordAlert && (
                <span className={styles.passwordAlert}>{passwordAlert}</span>
              )}
              <input
                className={styles.inputField}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <p className={passwordConditionText}>
                {password.length >= 8 ? "✓" : "•"}At least 8 characters
              </p>
              <input
                type="submit"
                value="Submit"
                className={`${styles.submit} ${styles.inputField}`}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
