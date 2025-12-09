import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";


export default function Reservas() {
const [reservas, setReservas] = useState([]);
const [loading, setLoading] = useState(true);


useEffect(() => {
api.get("/reservas").then(res => {
setReservas(res.data);
setLoading(false);
});
}, []);


if (loading) return <Loader />;


return (
<div className="p-6">
<h2 className="text-2xl font-bold mb-4">Mis Reservas</h2>
<ul className="flex flex-col gap-4">
{reservas.map(r => (
<li key={r.id} className="p-4 bg-white rounded shadow-md">
<p><strong>Producto:</strong> {r.producto}</p>
<p><strong>Fecha:</strong> {r.fechaReserva}</p>
<p><strong>Estado:</strong> {r.estado}</p>
</li>
))}
</ul>
</div>
);
}