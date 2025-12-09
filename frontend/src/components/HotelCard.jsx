import React from 'react'
import { formatCurrency } from '../utils/formatters'


export default function HotelCard({ hotel, onBook }){
return (
<div className="card hotel-card">
<img src={hotel.imagen || '/logo192.png'} alt={hotel.nombre} className="hotel-img" />
<div className="hotel-body">
<h4>{hotel.nombre} <span className="stars">{hotel.stars ? '★'.repeat(hotel.stars) : ''}</span></h4>
<p className="muted">{hotel.ubicacion}</p>
<div className="hotel-footer">
<span className="price">{formatCurrency(hotel.precioPorNoche)}</span>
<button className="btn" onClick={()=>onBook && onBook(hotel)}>Reservar</button>
</div>
</div>
</div>
)
}