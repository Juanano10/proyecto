import React from 'react';

function Header() {
  return (
    <header className="animate-slideDown transition-all duration-500 ease-in-out p-4 bg-gradient-to-r from-indigo-600 to-indigo-900">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo o Nombre del Sitio */}
        <div className="text-3xl font-extrabold text-white cursor-pointer">
          <span>FillFast</span><span className="text-indigo-300">Technology</span>
        </div>

        {/* Íconos de Funcionalidades a la Derecha */}
        <div className="flex space-x-4">
          {/* Ícono de Subir Video */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white hover:text-indigo-300 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>

          {/* Ícono de Apps */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white hover:text-indigo-300 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>

          {/* Más Íconos (Reemplaza estos con los íconos que necesites) */}
          {/* ... */}
        </div>
      </div>
    </header>
  );
}

export default Header;


