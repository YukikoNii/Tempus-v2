const loginImg = "/images/loginImg.svg";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";

function LoginPage() {
  const URL = import.meta.env.URL;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginInfoAlert, setLoginInfoAlert] = useState("");
  interface LoginFormEvent extends React.FormEvent<HTMLFormElement> {}

  async function handleSubmit(e: LoginFormEvent) {
    e.preventDefault();

    try {
      const info = { username: username, password: password };
      const response = await fetch(`${URL}/data/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(info),
      });
      if (response.ok) {
        console.log("successful");
        navigate("/home");
      } else {
        console.log(URL);
        console.log("unsuccessful");
        setLoginInfoAlert("Incorrect username or password");
      }
    } catch (e) {
      console.log("error!!");
    }
  }
  return (
    <>
      <Header></Header>

      <div className={styles.grid}>
        <div className={styles.wrapper}>
          <img className={styles.loginImg} src={loginImg}></img>
          <div className={styles.input}>
            <div className={styles.loginTitle}>Login</div>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
              <div className={styles.signupLinkWrapper}>
                Don't have an account yet?{" "}
                <Link className={styles.signupLink} to="/signup">
                  Sign up
                </Link>
              </div>
              {loginInfoAlert && (
                <span className={styles.loginInfoAlert}>{loginInfoAlert}</span>
              )}
              <label htmlFor="username" className={styles.label}>
                Username<span className={styles.asterisk}>*</span>
              </label>
              <input
                type="text"
                id="username"
                className={`${styles.username} ${styles.inputField}`}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              ></input>

              <div className={styles.passwordLabelRow}>
                <label htmlFor="Password" className={styles.label}>
                  Password<span className={styles.asterisk}>*</span>&nbsp;&nbsp;
                </label>
                <div className={styles.forgot}>
                  <Link
                    className={styles.resetPasswordLink}
                    to="/resetPassword"
                  >
                    forgot password?
                  </Link>
                </div>
              </div>

              <input
                type="password"
                id="password"
                className={`${styles.password} ${styles.inputField}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>

              <input
                type="submit"
                value="Login"
                className={`${styles.loginBtn} ${styles.inputField}`}
              ></input>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
