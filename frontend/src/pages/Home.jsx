import Hero from "../components/Hero";
import Card from "../components/Card";
import React from "react";


export default function Home() {
return (
<div className="page-container">
<h1>Bienvenido al Portal Turístico</h1>
<p>Explora destinos, alojamientos y más.</p>
</div>
);
}
export default function Home() {
  const destinos = [
    {
      title: "Bariloche",
      image: "https://images.unsplash.com/photo-1526403224955-180cf03e5a46",
      price: 120000
    },
    {
      title: "Salta",
      image: "https://images.unsplash.com/photo-1580136579312-94651fcb4fae",
      price: 95000
    }
  ];

  return (
    <div>
      <Hero />
      <section className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {destinos.map((d, i) => (
          <Card
            key={i}
            title={d.title}
            image={d.image}
            price={d.price}
          />
        ))}
      </section>
    </div>
  );
}
