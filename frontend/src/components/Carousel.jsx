import React, { useState, useEffect } from 'react'


export default function Carousel({ items = [], renderItem, interval = 4000 }){
const [index, setIndex] = useState(0)
useEffect(()=>{
if(!items.length) return
const t = setInterval(()=> setIndex(i => (i+1)%items.length), interval)
return ()=> clearInterval(t)
}, [items, interval])
if(!items.length) return null
return (
<div className="carousel">
{items.map((it,i)=> (
<div key={i} className={`carousel-slide ${i===index? 'active':''}`}>{renderItem(it)}</div>
))}
<div className="carousel-dots">
{items.map((_,i)=> <button key={i} className={`dot ${i===index? 'active':''}`} onClick={()=>setIndex(i)} />)}
</div>
</div>
)
}