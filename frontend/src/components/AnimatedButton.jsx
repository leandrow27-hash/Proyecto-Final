import React from 'react'
export default function AnimatedButton({children, onClick}){
return (
<button className="animated-btn" onClick={onClick}>{children}</button>
)
}