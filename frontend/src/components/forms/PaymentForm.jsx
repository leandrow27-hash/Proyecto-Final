import React, { useState } from 'react'
import API from '../../services/api'


export default function PaymentForm({ pedidoId }){
const [loading, setLoading] = useState(false)
const handle = async ()=>{
setLoading(true)
try{
const res = await API.post('/payments/create-session', { pedido_id: pedidoId })
const stripePk = res.data.stripe_pk
const sessionId = res.data.sessionId
const stripe = window.Stripe(stripePk)
await stripe.redirectToCheckout({ sessionId })
}catch(e){
alert('Error iniciando pago')
setLoading(false)
}
}
return (
<div>
<button className="btn primary" onClick={handle} disabled={loading}>{loading? 'Redirigiendo...':'Pagar con tarjeta'}</button>
</div>
)
}