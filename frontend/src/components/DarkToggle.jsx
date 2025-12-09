import React, { useEffect, useState } from 'react'
export default function DarkToggle(){
const [dark, setDark] = useState(()=> localStorage.getItem('dark')==='1')
useEffect(()=>{
document.documentElement.setAttribute('data-theme', dark? 'dark':'light')
localStorage.setItem('dark', dark? '1':'0')
}, [dark])
return (<button className="btn" onClick={()=>setDark(d=>!d)}>{dark? 'Light':'Dark'}</button>)
}