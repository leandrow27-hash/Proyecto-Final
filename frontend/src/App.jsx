import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Destinos from "./pages/Destinos";
import Autos from "./pages/Autos";
import Alojamientos from "./pages/Alojamientos";
import Museo from "./pages/Museo";
import Reservas from "./pages/Reservas";
import Pagos from "./pages/Pagos";
import Perfil from "./pages/Perfil";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import AuthProvider from "./context/AuthContext";


export default function App() {
return (
<AuthProvider>
<BrowserRouter>
<Navbar />
<div className="content">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/destinos" element={<Destinos />} />
<Route path="/autos" element={<Autos />} />
<Route path="/alojamientos" element={<Alojamientos />} />
<Route path="/museo" element={<Museo />} />
<Route path="/reservas" element={<Reservas />} />
<Route path="/pagos" element={<Pagos />} />
<Route path="/perfil" element={<Perfil />} />
<Route path="/login" element={<Login />} />
<Route path="/registro" element={<Registro />} />
</Routes>
</div>
<Footer />
</BrowserRouter>
</AuthProvider>
);
}
<Route path="/reservas" element={<ProtectedRoute><Reservas/></ProtectedRoute>} />