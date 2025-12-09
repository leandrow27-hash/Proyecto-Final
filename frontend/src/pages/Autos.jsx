import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import api from "../services/api";
import React from "react";


export default function Autos() {
return (
<div className="page-container">
<h1>Alquiler de Autos</h1>
<p>Categorías: SUV, deportivos, camionetas y más.</p>
</div>
);
}
export default function Autos() {
  const [autos, setAutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/autos").then(res => {
      setAutos(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {autos.map(a => (
        <Card key={a.id} title={`${a.marca} ${a.modelo}`} image={a.imagen} price={a.precioDia} />
      ))}
    </div>
  );
}
