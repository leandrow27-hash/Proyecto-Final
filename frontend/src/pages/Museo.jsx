import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Card from "../components/Card";
import api from "../services/api";


export default function Museos() {
const [museos, setMuseos] = useState([]);
const [loading, setLoading] = useState(true);


useEffect(() => {
api.get("/museos").then(res => {
setMuseos(res.data);
setLoading(false);
});
}, []);


if (loading) return <Loader />;


return (
<div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
{museos.map(m => (
<Card key={m.id} title={m.nombre} image={m.imagen} onClick={() => window.open(m.urlReserva, "_blank")} />
))}
</div>
);
}