import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";


export const AuthContext = createContext();


export default function AuthProvider({ children }) {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);


async function login(email, password) {
const res = await API.post("/auth/login", { email, password });
setUser(res.data.user);
localStorage.setItem("token", res.data.token);
}


async function logout() {
setUser(null);
localStorage.removeItem("token");
}


useEffect(() => {
const token = localStorage.getItem("token");
if (!token) return setLoading(false);


API.get("/auth/me", {
headers: { Authorization: `Bearer ${token}` },
})
.then((res) => setUser(res.data))
.finally(() => setLoading(false));
}, []);


return (
<AuthContext.Provider value={{ user, loading, login, logout }}>
{children}
</AuthContext.Provider>
);
}