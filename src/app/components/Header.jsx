import React from 'react';

function Header() {
  // Aquí puedes reemplazar "nombreUsuario" con el nombre de usuario real
  const nombreUsuario = "Usuario";

  return (
    <header className="animate-slideDown transition-all duration-500 ease-in-out p-4 bg-gradient-to-r from-gray-800 to-indigo-900">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo o Nombre del Sitio (a la izquierda) */}
        <div className="text-3xl font-extrabold text-white cursor-pointer">
          <span>FillFast</span><span className="text-blue-500">Technology</span>
        </div>

        {/* Contenedor del Nombre de Usuario e Ícono de Perfil de Usuario (a la derecha) */}
        <div className="flex items-center space-x-2">
          <div className="text-white">{nombreUsuario}</div>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white hover:text-blue-500 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
      </div>
    </header>
  );
}

export default Header;