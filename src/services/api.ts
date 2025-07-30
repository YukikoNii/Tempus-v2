import { EntryType } from "../types/EntryType";

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

