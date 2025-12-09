import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Card from "../components/Card";
import api from "../services/api";
import React from "react";


export default function Alojamientos() {
return (
<div className="page-container">
<h1>Opciones de Alojamiento</h1>
<p>Hoteles, cabañas y más.</p>
</div>
);
}
export default function Alojamientos() {
  const [hoteles, setHoteles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/alojamientos").then(res => {
      setHoteles(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {hoteles.map(h => (
        <Card key={h.id} title={h.nombre} image={h.imagen} price={h.precioPorNoche} />
      ))}
    </div>
  );
}
