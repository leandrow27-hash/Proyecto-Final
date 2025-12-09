import React, {useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'


export default function CheckoutSuccess(){
const [params] = useSearchParams()
const session_id = params.get('session_id')


useEffect(()=>{
if(session_id){
// opcional: llamar API para refrescar estado
fetch(`http://localhost:5000/webhooks/stripe_check?session_id=${session_id}`)
}
},[session_id])


return (
<div>
<h1>Pago exitoso</h1>
<p>Gracias por tu compra. Recibirás un email de confirmación.</p>
</div>
)
}