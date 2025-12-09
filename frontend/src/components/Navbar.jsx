import { Link } from "react-router-dom";


export default function Navbar() {
return (
<nav className="w-full bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-lg">
<h1 className="text-xl font-bold">Turismo</h1>


<ul className="flex gap-6">
<li><Link to="/">Inicio</Link></li>
<li><Link to="/destinos">Destinos</Link></li>
<li><Link to="/alojamientos">Alojamientos</Link></li>
<li><Link to="/autos">Autos</Link></li>
<li><Link to="/paquetes">Paquetes</Link></li>
<li><Link to="/login">Login</Link></li>
</ul>
</nav>
);
}