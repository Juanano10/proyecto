// Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-indigo-800 text-white p-4 mt-2">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-2">© 2023 Nombre de la Empresa. Todos los derechos reservados.</p>
        <p className="text-sm">Síguenos en: <a href="https://www.instagram.com/viernessss13/" target="_blank" rel="noreferrer" className="underline">Instagram</a></p>
        <p className="text-sm">Contáctanos: contacto@empresa.com</p>
      </div>
    </footer>
  );
}

export default Footer;
