import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import api from "../services/api";
import React from "react";


export default function Destinos() {
return (
<div className="page-container">
<h1>Destinos Turísticos</h1>
<p>Listado completo de destinos disponibles.</p>
</div>
);
}
export default function Destinos() {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/destinos").then(res => {
      setDestinos(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {destinos.map(d => (
        <Card key={d.id} title={d.nombre} image={d.imagen} price={d.precio} />
      ))}
    </div>
  );
}
