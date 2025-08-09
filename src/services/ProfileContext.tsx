import { createContext } from "react"

const ProfileContext = createContext({
    iconImgSrc: "",
    username: "",
    email: "",
    bgSrc: "",
    bgColor: "",
    changeIconImgSrc: (arg : string) => {},
    changeUsername: (arg : string) => {},
    changeEmail : (arg : string) => {},
    changeBgSrc : (arg : string) => {},
    changeBgColor : (arg : string) => {}
})

export default ProfileContext;
