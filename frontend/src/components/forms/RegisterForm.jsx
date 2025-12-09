import React, { useState } from 'react'
import API from '../../services/api'


export default function RegisterForm(){
const [form, setForm] = useState({nombre:'',email:'',telefono:'',password:''})
const [err, setErr] = useState(null)
const [ok, setOk] = useState(null)
const handle = e=> setForm({...form,[e.target.name]: e.target.value})


const submit = async e=>{
e.preventDefault()
setErr(null); setOk(null)
if(form.password.length<6){ setErr('Contraseña mínima 6 caracteres'); return }
try{
await API.post('/auth/register', form)
setOk('Registro exitoso. Revisá tu email.')
}catch(e){ setErr(e.response?.data?.error || 'Error en el registro') }
}


return (
<form className="form" onSubmit={submit}>
{err && <div className="form-error">{err}</div>}
{ok && <div className="form-ok">{ok}</div>}
<input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handle} required />
<input name="email" type="email" placeholder="Email" value={form.email} onChange={handle} required />
<input name="telefono" type="tel" placeholder="Teléfono" value={form.telefono} onChange={handle} />
<input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handle} required minLength={6} />
<button className="btn primary">Crear cuenta</button>
</form>
)
}