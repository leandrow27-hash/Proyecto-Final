import { useState } from "react";
e.preventDefault();
try {
await api.post("/auth/register", form);
setMensaje("Registro exitoso, ahora puedes iniciar sesión.");
} catch (err) {
setMensaje("Error en el registro");
}
};


return (
<div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
<h2 className="text-2xl font-bold mb-4">Registro</h2>
{mensaje && <p className="mb-3">{mensaje}</p>}
<form onSubmit={handleSubmit} className="flex flex-col gap-4">
<input
name="nombre"
type="text"
placeholder="Nombre completo"
className="border p-2 rounded"
value={form.nombre}
onChange={handleChange}
required
/>
<input
name="email"
type="email"
placeholder="Email"
className="border p-2 rounded"
value={form.email}
onChange={handleChange}
required
/>
<input
name="telefono"
type="tel"
placeholder="Teléfono"
className="border p-2 rounded"
value={form.telefono}
onChange={handleChange}
required
/>
<input
name="password"
type="password"
placeholder="Contraseña"
className="border p-2 rounded"
value={form.password}
onChange={handleChange}
required
/>
<button className="bg-green-600 text-white p-2 rounded">Registrarse</button>
</form>
</div>
);
}
