"use client"
import React from 'react';
import Link from "next/link";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Header() {
  const { data: session } = useSession();
  if (!session) {
    // Si no está autenticado, puedes mostrar un mensaje o redirigirlo a la página de inicio de sesión
    return (
      <div className="bg-indigo-600 min-h-screen flex flex-col">
        <Navbar />
        <div className="bg-white flex-grow flex mt-1 mr-2 mb-2 rounded-lg p-4">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Perfil de Usuario</h1>
            <p>Debes iniciar sesión para ver tu perfil.</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const { user } = session;
  return (
    <header className="bg-gradient-to-r from-gray-800 to-indigo-900 text-white p-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Logo o Nombre del Sitio (a la izquierda) */}
        <div className="text-3xl font-extrabold mb-2 sm:mb-0">
          <span>FillFast</span><span className="text-blue-500">Technology</span>
        </div>

        {/* Contenedor del Nombre de Usuario e Ícono de Perfil de Usuario (a la derecha) */}
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <div className="text-white mb-2 sm:mb-0 sm:mr-2">{user.name}</div>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 hover:text-blue-500 cursor-pointer"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </a>
        </div>
      </div>
    </header>
  );
}

export default Header;