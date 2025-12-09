import React, { useState } from 'react'
import API from '../../services/api'


export default function BookingForm({ productoId, onBooked }){
const [dateFrom, setDateFrom] = useState('')
const [dateTo, setDateTo] = useState('')
const [qty, setQty] = useState(1)
const [error, setError] = useState(null)
const submit = async e=>{
e.preventDefault()
setError(null)
if(!dateFrom || !dateTo){ setError('Seleccione fechas'); return }
try{
const res = await API.post('/api/orders', { items: [{ producto_id: productoId, cantidad: qty }] }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
onBooked && onBooked(res.data)
}catch(e){ setError(e.response?.data?.error || 'Error al reservar') }
}
return (
<form className="form" onSubmit={submit}>
{error && <div className="form-error">{error}</div>}
<label>Desde</label>
<input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} required />
<label>Hasta</label>
<input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} required />
<label>Cantidad</label>
<input type="number" min={1} value={qty} onChange={e=>setQty(e.target.value)} />
<button className="btn primary">Reservar</button>
</form>
)
}