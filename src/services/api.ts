
const VITE_URL = import.meta.env.VITE_URL;

// Reusable HTTP client
const http = {
    get: async (endpoint : string) => {
        const res = await fetch(`${VITE_URL}${endpoint}`, {credentials: "include"});
        return res.json();
    },
    post: async (endpoint : string, body : object) => {
        const res = await fetch(`${VITE_URL}${endpoint}`, {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        });

        return res.json();
    }
}


export const todoApi = {
    add: ( 
        _id: string,
        title : string,
        description : string,
        date : string,
        time : string,
        priority: string,
        tags: Array<string>
        ) => http.post("data/todo/add", { _id: _id, title: title, description: description, dueDate: date, dueTime: time, priority: priority, tags: tags}),
    get: () => http.get("data/todo"),
    delete: (id : string) => http.post("data/todo/delete", {id}),
}

export const homeApi = {
    get: () => http.get("data/home"),
    updateBg: (name : string) => http.post("data/home", { bgName : name }),
    getMemo: () => http.get("data/home/memo"),
    saveMemo: (text : string) => http.post("data/home/memo", { memo: text })
}

export const calendarApi = {
    get: () => http.get("data/calendar")
}

export const settingsApi = {
    saveProfileImg: ( name : string ) => http.post("data/accountSettings", {profileImgName: name}),
    saveUsername: ( username : string ) => http.post("data/accountSettings/username", { username: username }),
    saveEmail: ( email : string ) => http.post("data/accountSettings/email", { email: email }),
    get: () => http.get("data/settings"),
    getAccountSettings: () => http.get("data/accountSettings"),
    saveSound: ( soundName: string) => http.post("data/notificationSettings", {
        soundName: soundName
    }),
    getSound: () => http.get("data/timer")
}

export const appHeaderApi = {
    get: () => http.get("data/appheader"),
    logout: () => http.post("data/logout", {}),
}

export const authApi = {
    signup: (username : string, email : string, password: string) => http.post("data/signup", {username : username, email : email, password : password}),
    login: (username : string, password: string) => http.post("data/login", {username : username, password : password}),
}

export const timeApi = {
    timer: (username : string, email : string, password: string) => http.post("data/signup", {username : username, email : email, password : password}),
}


export const TimeTrackingApi = {
    getProjects: () => http.get("data/projectDropdown")
}



