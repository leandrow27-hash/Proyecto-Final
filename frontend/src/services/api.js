const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'


export async function getDestinos(){
const res = await fetch(`${API_BASE}/destinos`)
if(!res.ok) throw new Error('Error al obtener destinos')
return res.json()
}


export async function iniciarCheckout(payload){
const res = await fetch('http://localhost:5000/api/carrito/checkout', {
method: 'POST',
headers: {'Content-Type':'application/json'},
body: JSON.stringify(payload)
})
if(!res.ok) throw new Error('Error al iniciar checkout')
return res.json()
}