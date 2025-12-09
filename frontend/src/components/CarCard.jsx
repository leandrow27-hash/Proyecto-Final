import React from 'react'
import { formatCurrency } from '../utils/formatters'


export default function CarCard({ car, onSelect }){
return (
<div className="card car-card">
<img src={car.imagen || '/logo192.png'} alt={`${car.marca} ${car.modelo}`} />
<div className="card-body">
<h4>{car.marca} {car.modelo}</h4>
<p className="muted">Clase: {car.clase}</p>
<div className="card-footer">
<span className="price">{formatCurrency(car.precioDia)}/día</span>
<button className="btn" onClick={()=>onSelect && onSelect(car)}>Alquilar</button>
</div>
</div>
</div>
)
}