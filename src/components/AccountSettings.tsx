import { ProfileImages } from "../assets/ProfileImages";
import styles from "./AccountSettings.module.css";
import ProfileImgModal from "./ProfileImgModal";
import DeleteAccountModal from "./DeleteAccountModal";
import { useState, useEffect } from "react";

interface AccountSettingsProp {
  currentUsername: string;
  currentEmail: string;
}

export const AccountSettings = ({
  currentUsername,
  currentEmail,
}: AccountSettingsProp) => {
  const [username, setUsername] = useState(currentUsername || "");
  const [email, setEmail] = useState(currentEmail || "");

  useEffect(() => {
    setUsername(currentUsername || "");
  }, [currentUsername]);

  useEffect(() => {
    setEmail(currentEmail || "");
  }, [currentEmail]);

  const [isUsernameDisabled, setIsUsernameDisabled] = useState(true);
  const [isEmailDisabled, setIsEmailDisabled] = useState(true);
  const [isPasswordDisabled, setIsPasswordDisabled] = useState(true);
  const [showProfileImgModal, setShowProfileImgModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [usernameAlert, setUsernameAlert] = useState("");
  const [showEmailAlert, setShowEmailAlert] = useState(false);

  const [profileImgSrc, setProfileImgSrc] = useState("");

  const updateProfileImage = (name: string, src: string) => {
    setProfileImgSrc(src);
    const saveProfileImageToDB = async () => {
      const res = await fetch("http://localhost:5050/data/accountSettings", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileImgName: name }),
      });
    };
    saveProfileImageToDB();
  };

  const updateUsername = () => {
    if (username === "") {
      setUsernameAlert("Username cannot be blank");
    } else if (username === currentUsername) {
      setUsernameAlert("");
      setIsUsernameDisabled(true);
    } else {
      const saveUsernameToDB = async () => {
        const res = await fetch(
          "http://localhost:5050/data/accountSettings/username",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username }),
          }
        );
        if (res.ok) {
          currentUsername = username;
          setUsernameAlert("");
          setIsUsernameDisabled(true);
        } else {
          setUsernameAlert("The username is already taken");
        }
      };
      saveUsernameToDB();
    }
  };

  const validateEmail = (email: string) => {
    const expression =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
    return email.match(expression);
  };

  const updateEmail = () => {
    if (!validateEmail(email)) {
      setShowEmailAlert(true);
    } else if (email === currentEmail) {
      setShowEmailAlert(false);
      setIsEmailDisabled(true);
    } else {
      const saveEmailToDB = async () => {
        const res = await fetch(
          "http://localhost:5050/data/accountSettings/email",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
          }
        );
        if (res.ok) {
          currentEmail = email;
          setShowEmailAlert(false);
          setIsEmailDisabled(true);
        } else {
          setShowEmailAlert(true);
        }
      };
      saveEmailToDB();
    }
  };

  useEffect(() => {
    const fetchBg = async () => {
      const res = await fetch("http://localhost:5050/data/accountSettings", {
        method: "GET",
        credentials: "include",
      });
      if (res) {
        const data = await res.json();
        const selectedImg = ProfileImages.find(
          (img) => img.name == data.profileImgName
        );
        if (selectedImg) {
          setProfileImgSrc(selectedImg.src);
        }
      }
    };
    fetchBg();
  }, []);

  const alertStyle = {
    border: "1px solid #c43d3d",
  };

  return (
    <>
      <div className={styles.body}>
        <span>Account</span>
        <div className={styles.account}>
          <div className={`${styles.con} ${styles.pro}`}>
            <span>Profile picture</span>
            <img src={profileImgSrc} className={styles.profilePic} />
            <input
              type="button"
              name="button"
              className={styles.proChoose}
              value="Choose"
              onClick={() => setShowProfileImgModal(true)}
            />
          </div>

          <div className={`${styles.con} ${styles.use}`}>
            <span>Username</span>
            <input
              type="text"
              name="username"
              value={username}
              className={styles.accTexts}
              disabled={isUsernameDisabled}
              onChange={(e) => setUsername(e.target.value)}
              style={usernameAlert ? alertStyle : {}}
            />
            {isUsernameDisabled && (
              <input
                type="button"
                value="Edit"
                className={styles.accBtns}
                onClick={() => setIsUsernameDisabled(false)}
              />
            )}
            {!isUsernameDisabled && (
              <div className={styles.btns}>
                <input
                  type="button"
                  value="Cancel"
                  className={styles.cancel}
                  onClick={() => {
                    setIsUsernameDisabled(true);
                    setUsernameAlert("");
                    setUsername(currentUsername);
                  }}
                />
                <input
                  type="button"
                  value="Save"
                  className={styles.save}
                  onClick={() => {
                    updateUsername();
                  }}
                />
              </div>
            )}

            <p className={styles.alerts}>{usernameAlert}</p>
          </div>

          <div className={`${styles.con} ${styles.ema}`}>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={email}
              className={styles.accTexts}
              disabled={isEmailDisabled}
              onChange={(e) => setEmail(e.target.value)}
              style={showEmailAlert ? alertStyle : {}}
            />
            {isEmailDisabled && (
              <input
                type="button"
                value="Edit"
                className={styles.accBtns}
                onClick={() => setIsEmailDisabled(false)}
              />
            )}
            {!isEmailDisabled && (
              <div className={styles.btns}>
                <input
                  type="button"
                  value="Cancel"
                  className={styles.cancel}
                  onClick={() => {
                    setIsEmailDisabled(true);
                    setShowEmailAlert(false);
                    setEmail(currentEmail);
                  }}
                />
                <input
                  type="button"
                  value="Save"
                  className={styles.save}
                  onClick={() => {
                    updateEmail();
                  }}
                />
              </div>
            )}
            {showEmailAlert && (
              <p className={styles.alerts}> That email is not valid.</p>
            )}{" "}
          </div>

          <div className={`${styles.con} ${styles.pas}`}>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value=""
              className={styles.accTexts}
              disabled={isPasswordDisabled}
            />
            {isPasswordDisabled && (
              <input
                type="button"
                value="Edit"
                className={styles.accBtns}
                onClick={() => setIsPasswordDisabled(false)}
              />
            )}
            {!isPasswordDisabled && (
              <div className={styles.btns}>
                <input
                  type="button"
                  value="Cancel"
                  className={styles.cancel}
                  onClick={() => setIsPasswordDisabled(true)}
                />
                <input type="button" value="Save" className={styles.save} />
              </div>
            )}
            {usernameAlert && (
              <p className={styles.alerts}>Your username is already taken.</p>
            )}
          </div>

          <div className={styles.del}>
            <span>Delete account</span>
            <input
              type="button"
              value="Delete your account"
              className={styles.delete}
              onClick={() => setShowDeleteAccountModal(true)}
            />
            <div>You cannot undo this action.</div>
          </div>
        </div>
      </div>

      {showProfileImgModal && (
        <ProfileImgModal
          onClose={() => setShowProfileImgModal(false)}
          onSelect={updateProfileImage}
        ></ProfileImgModal>
      )}

      {showDeleteAccountModal && (
        <DeleteAccountModal
          onClose={() => setShowDeleteAccountModal(false)}
        ></DeleteAccountModal>
      )}
    </>
  );
};
