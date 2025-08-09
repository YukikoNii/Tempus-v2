const loginImg = "/images/loginImg.svg";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import ActionButton from "../buttons/ActionButton";
import EditableField from "../buttons/EditableField";
import Alert from "../buttons/Alert";
import { loginApi } from "../services/api";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginInfoAlert, setLoginInfoAlert] = useState("");
  interface LoginFormEvent extends React.FormEvent<HTMLFormElement> {}

  async function handleSubmit(e: LoginFormEvent) {
    e.preventDefault();

    try {
      await loginApi.login(username, password);
      console.log("successful");
      navigate("/home");
    } catch (e) {
      console.log("unsuccessful");
      setLoginInfoAlert("Incorrect username or password"); 
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
              <Alert>{loginInfoAlert}</Alert>
              <EditableField data="Username" value={username} type="text" onChange={(v : string) => setUsername(v)}></EditableField>
              <EditableField data="Password" value={password} type="password" onChange={(v : string) => setPassword(v)}></EditableField>
              <div className={styles.forgot}>
                  <Link
                    className={styles.resetPasswordLink}
                    to="/resetPassword"
                  >
                    forgot password?
                  </Link>
              </div>
              <ActionButton name="Login"/>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
