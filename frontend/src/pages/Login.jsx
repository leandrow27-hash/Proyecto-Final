import { useState } from "react";
import api from "../services/api";


export default function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");


const handleLogin = async (e) => {
e.preventDefault();
try {
const res = await api.post("/auth/login", { email, password });
localStorage.setItem("token", res.data.token);
window.location.href = "/";
} catch (err) {
setError("Credenciales incorrectas");
}
};


return (
<div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
<h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
{error && <p className="text-red-600 mb-3">{error}</p>}
<form onSubmit={handleLogin} className="flex flex-col gap-4">
<input
type="email"
placeholder="Email"
className="border p-2 rounded"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
<input
type="password"
placeholder="Contraseña"
className="border p-2 rounded"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
<button className="bg-blue-600 text-white p-2 rounded">Ingresar</button>
</form>
<p className="mt-4 text-sm">
No tienes cuenta? <a href="/registro" className="text-blue-600">Regístrate</a>
</p>
</div>
);
}