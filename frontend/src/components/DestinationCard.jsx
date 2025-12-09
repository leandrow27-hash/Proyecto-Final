import React from 'react'
import { formatCurrency } from '../utils/formatters'


export default function DestinationCard({ item, onSelect }){
return (
<article className="card destination-card">
<div className="card-media" style={{backgroundImage:`url(${item.imagen || '/logo192.png'})`}} />
<div className="card-body">
<h3 className="card-title">{item.nombre}</h3>
<p className="card-desc">{item.descripcion}</p>
<div className="card-meta">
<span className="price">{formatCurrency(item.precio)}</span>
<button className="btn" onClick={()=>onSelect && onSelect(item)}>Ver</button>
</div>
</div>
</article>
)
}