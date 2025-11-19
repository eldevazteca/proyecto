import React from "react";
import { Link } from 'react-router-dom';

const ClientHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 flex flex-col items-center justify-start py-8">
      <nav className="w-full max-w-5xl bg-white/90 rounded-2xl shadow-lg px-6 py-3 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img className="h-10 w-10 rounded-full" src="/images/logo.jpg" alt="CETis 161" />
          <span className="font-bold text-xl text-blue-900">CETis 161</span>
        </div>
        <div className="flex gap-2">
          <Link to="/client/home" className="text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition">Inicio</Link>
          <Link to="/client/about" className="text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition">Sobre Nosotros</Link>
          <Link to="/client/apply" className="text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition">Solicitar Admisión</Link>
          <Link to="/client/status" className="text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition">Verificar Estado</Link>
        </div>
        <img className="h-8 w-8 rounded-full border-2 border-blue-300" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Usuario" />
      </nav>
      <header className="w-full max-w-5xl bg-white/90 rounded-2xl shadow-md px-8 py-6 mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">Bienvenido a CETis 161</h1>
        <p className="text-lg text-blue-700">Tu portal de ingreso, información y seguimiento.</p>
      </header>
      <main className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Solicitar Admisión</h2>
            <p className="text-gray-600 mb-4">Completa tu solicitud para ser estudiante en nuestra institución.</p>
            <Link to="/client/apply" className="text-blue-600 font-bold hover:underline">Ir a Solicitud &rarr;</Link>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Verificar Estado</h2>
            <p className="text-gray-600 mb-4">Consulta el estado de tu solicitud de admisión.</p>
            <Link to="/client/status" className="text-blue-600 font-bold hover:underline">Verificar &rarr;</Link>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Conócenos</h2>
            <p className="text-gray-600 mb-4">Descubre más sobre nuestra institución y nuestros valores.</p>
            <Link to="/client/about" className="text-blue-600 font-bold hover:underline">Saber más &rarr;</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientHome;