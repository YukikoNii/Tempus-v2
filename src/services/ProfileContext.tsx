import { createContext } from "react"

const ProfileContext = createContext({
    iconImgSrc: "",
    username: "",
    email: "",
    bgSrc: "",
    bgColor: "",
    soundName: "",
    soundSrc : "",
    changeIconImgSrc: (arg : string) => {},
    changeUsername: (arg : string) => {},
    changeEmail : (arg : string) => {},
    changeBgSrc : (arg : string) => {},
    changeBgColor : (arg : string) => {},
    changeSoundSrc : (arg : string) => {},
    changeSoundName : (arg : string) => {}
})

export default ProfileContext;
