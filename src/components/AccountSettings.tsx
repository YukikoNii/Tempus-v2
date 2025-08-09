import styles from "./AccountSettings.module.css";
import ProfileImgModal from "./ProfileImgModal";
import DeleteAccountModal from "./DeleteAccountModal";
import { useState, useEffect, useContext } from "react";
import { settingsApi } from "../services/api";
import ProfileContext from "../services/ProfileContext";


export const AccountSettings = () => {
  const profileInfo = useContext(ProfileContext);
  const [tmpUsername, setTmpUsername] = useState(profileInfo.username);
  const [tmpEmail, setTmpEmail] = useState(profileInfo.email);


  const [isUsernameDisabled, setIsUsernameDisabled] = useState(true);
  const [isEmailDisabled, setIsEmailDisabled] = useState(true);
  const [isPasswordDisabled, setIsPasswordDisabled] = useState(true);
  const [showProfileImgModal, setShowProfileImgModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [usernameAlert, setUsernameAlert] = useState("");
  const [showEmailAlert, setShowEmailAlert] = useState(false);

  const updateProfileImage = (name: string, src: string) => {
    profileInfo.changeIconImgSrc(src);
    const saveProfileImageToDB = async () => {
      await settingsApi.saveProfileImg(name);
    };
    saveProfileImageToDB();
  };

  const updateUsername = () => {
    if (tmpUsername === "") {
      setUsernameAlert("Username cannot be blank");
    } else if (tmpUsername === profileInfo.username) {
      setUsernameAlert("");
      setIsUsernameDisabled(true);
    } else {
      const saveUsernameToDB = async () => {
        const res = await settingsApi.saveUsername(tmpUsername);
        if (res) { //REVIEW - 
          profileInfo.changeUsername(tmpUsername);
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
    if (!validateEmail(tmpEmail)) {
      setShowEmailAlert(true);
    } else if (tmpEmail === profileInfo.email) {
      setShowEmailAlert(false);
      setIsEmailDisabled(true);
    } else {
      const saveEmailToDB = async () => {
        const res = await settingsApi.saveEmail(tmpEmail);
        if (res) {
          profileInfo.changeEmail(tmpEmail);
          setShowEmailAlert(false);
          setIsEmailDisabled(true);
        } else {
          setShowEmailAlert(true);
        }
      };
      saveEmailToDB();
    }
  };


  const alertStyle = {
    border: "1px solid #c43d3d",
  };

  return (
    <>
      <div className={styles.body}>
        <span className={styles.heading}>Account</span>
        <div className={styles.account}>
          <div className={`${styles.section}`}>
            <span className={styles.sectionHeading}>Profile picture</span>
            <img src={profileInfo.iconImgSrc} className={styles.profilePic} />
            <input
              type="button"
              name="button"
              className={`${styles.edit} ${styles.input}`}
              value="Edit"
              onClick={() => setShowProfileImgModal(true)}
            />
          </div>

          <div className={`${styles.section}`}>
            <span className={styles.sectionHeading}>Username</span>
            <input
              type="text"
              name="username"
              value={tmpUsername}
              className={` ${styles.input} ${styles.textField}`}
              disabled={isUsernameDisabled}
              onChange={(e) => setTmpUsername(e.target.value)}
              style={usernameAlert ? alertStyle : {}}
            />
            {isUsernameDisabled && (
              <input
                type="button"
                value="Edit"
                className={`${styles.edit} ${styles.input}`}
                onClick={() => setIsUsernameDisabled(false)}
              />
            )}
            {!isUsernameDisabled && (
              <div className={styles.btns}>
                <input
                  type="button"
                  value="Cancel"
                  className={`${styles.cancel} ${styles.input}`}
                  onClick={() => {
                    setIsUsernameDisabled(true);
                    setUsernameAlert("");
                    setTmpUsername(profileInfo.username);
                  }}
                />
                <input
                  type="button"
                  value="Save"
                  className={`${styles.save} ${styles.input}`}
                  onClick={() => {
                    updateUsername();
                  }}
                />
              </div>
            )}

            <p className={styles.alert}>{usernameAlert}</p>
          </div>

          <div className={`${styles.section}`}>
            <span className={styles.sectionHeading}>Email</span>
            <input
              type="email"
              name="email"
              value={tmpEmail}
              className={` ${styles.input} ${styles.textField}`}
              disabled={isEmailDisabled}
              onChange={(e) => setTmpEmail(e.target.value)}
              style={showEmailAlert ? alertStyle : {}}
            />
            {isEmailDisabled && (
              <input
                type="button"
                value="Edit"
                className={`${styles.edit} ${styles.input}`}
                onClick={() => setIsEmailDisabled(false)}
              />
            )}
            {!isEmailDisabled && (
              <div className={styles.btns}>
                <input
                  type="button"
                  value="Cancel"
                  className={`${styles.cancel} ${styles.input}`}
                  onClick={() => {
                    setIsEmailDisabled(true);
                    setShowEmailAlert(false);
                    setTmpEmail(profileInfo.email);
                  }}
                />
                <input
                  type="button"
                  value="Save"
                  className={`${styles.save} ${styles.input}`}
                  onClick={() => {
                    updateEmail();
                  }}
                />
              </div>
            )}
            {showEmailAlert && (
              <p className={styles.alert}> That email is not valid.</p>
            )}
          </div>

          <div className={`${styles.section}`}>
            <span className={styles.sectionHeading}>Password</span>
            <input
              type="password"
              name="password"
              value=""
              className={`${styles.input} ${styles.textField}`}
              disabled={isPasswordDisabled}
            />
            {isPasswordDisabled && (
              <input
                type="button"
                value="Edit"
                className={`${styles.edit} ${styles.input}`}
                onClick={() => setIsPasswordDisabled(false)}
              />
            )}
            {!isPasswordDisabled && (
              <div className={styles.btns}>
                <input
                  type="button"
                  value="Cancel"
                  className={`${styles.cancel} ${styles.input}`}
                  onClick={() => setIsPasswordDisabled(true)}
                />
                <input type="button" value="Save" className={styles.save} />
              </div>
            )}
            {usernameAlert && (
              <p className={styles.alert}>Your username is already taken.</p>
            )}
          </div>

          <div className={`${styles.del} ${styles.section}`}>
            <span className={`${styles.delHeading} ${styles.sectionHeading}`}>
              Delete account
            </span>
            <input
              type="button"
              value="Delete your account"
              className={`${styles.delete} ${styles.input}`}
              onClick={() => setShowDeleteAccountModal(true)}
            />
            <div className={styles.delMessage}>
              You cannot undo this action.
            </div>
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
