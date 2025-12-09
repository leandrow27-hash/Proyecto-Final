import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'


export default function LoginForm(){
const { login } = useContext(AuthContext)
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(null)
const [loading, setLoading] = useState(false)


const submit = async (e)=>{
e.preventDefault()
setError(null)
if(!email || !password){ setError('Completa email y contraseña'); return }
setLoading(true)
try{
await login(email,password)
window.location.href='/'
}catch(err){
setError(err.response?.data?.error || 'Error en login')
}finally{setLoading(false)}
}


return (
<form className="form" onSubmit={submit}>
{error && <div className="form-error">{error}</div>}
<input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
<input type="password" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6} />
<button className="btn primary" disabled={loading}>{loading? 'Ingresando...':'Ingresar'}</button>
</form>
)
}