import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import api from "../services/api";

export default function Paquetes() {
  const [paquetes, setPaquetes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/paquetes").then(res => {
      setPaquetes(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {paquetes.map(p => (
        <Card key={p.id} title={p.titulo} image={p.imagen} price={p.precio} />
      ))}
    </div>
  );
}
