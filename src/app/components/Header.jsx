"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Navbar from './Navbar';
import Footer from './Footer';
import ReactLoading from 'react-loading';

function Header() {
  const { data: session } = useSession();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    // Simulando una carga de datos (puedes ajustar el tiempo según tus necesidades)
    const timeout = setTimeout(() => {
      setStatus('loaded');
    }, 5000); // 2000 milisegundos = 2 segundos

    // Limpia el timeout en caso de que el componente se desmonte antes de que se complete la carga
    return () => clearTimeout(timeout);
  }, []);

  if (!session) {
    // Si no está autenticado, se muestra el mensaje
    return (
      <div className="bg-slate-900 min-h-screen flex flex-col">
        <header className="bg-gradient-to-r from-gray-800 to-indigo-900 text-white p-4">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
            {/* Logo o Nombre del Sitio (a la izquierda) */}
            <div className="text-3xl font-extrabold mb-2 sm:mb-0">
              <span>FillFast</span>
              <span className="text-blue-500">Technology</span>
            </div>
          </div>
        </header>
        <div className="flex flex-grow">
          <Navbar />
          <div className="bg-white flex-grow flex items-center justify-center mt-1 mr-2 mb-2 rounded-lg p-4">
            <div className="container mx-auto p-4">
              <div className="flex items-center justify-center">
                {status === 'loading' && (
                  <ReactLoading type={'spin'} color={'#3182ce'} height={'25%'} width={'25%'} />
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
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